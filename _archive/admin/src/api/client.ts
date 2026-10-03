import type { AdminStats, Message, Project } from '../types';

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:5000/api' : 'https://ap1.emran.work/api');

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        this.setToken(null);
      }
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // Auth via Secret Calculator
  async calculatorLogin(code: string): Promise<{ token: string; user: { id: string; email: string; name: string } }> {
    const data = await this.request<{ success: boolean; token: string; user: any }>('/auth/calculator', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    this.setToken(data.token);
    return data;
  }

  // Standard Auth
  async login(email: string, password: string): Promise<{ token: string; user: { id: string; email: string; name: string } }> {
    const data = await this.request<{ success: boolean; token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async verify(): Promise<boolean> {
    if (!this.token) return false;
    try {
      await this.request('/auth/verify');
      return true;
    } catch {
      this.setToken(null);
      return false;
    }
  }

  logout() {
    this.setToken(null);
  }

  // Stats
  async getStats(): Promise<AdminStats> {
    const res = await this.request<{ success: boolean; stats?: AdminStats; data?: AdminStats }>('/admin/stats');
    return (res.stats || res.data || { totalMessages: 0, unreadMessages: 0, totalProjects: 0, totalViews: 0 }) as AdminStats;
  }

  // Messages
  async getMessages(params?: { page?: number; limit?: number; status?: string }): Promise<{ messages: Message[]; total: number; page: number; totalPages: number }> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.status && params.status !== 'all') query.append('status', params.status);

    const res = await this.request<any>(
      `/admin/messages?${query.toString()}`
    );
    return {
      messages: res.messages || res.data || [],
      total: res.total || 0,
      page: res.page || 1,
      totalPages: res.totalPages || 1,
    };
  }

  async updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<void> {
    await this.request(`/admin/messages/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async replyToMessage(id: string, replyMessage: string): Promise<void> {
    await this.request(`/admin/messages/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ replyMessage }),
    });
  }

  async deleteMessage(id: string): Promise<void> {
    await this.request(`/admin/messages/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const res = await this.request<{ success: boolean; projects?: Project[]; data?: Project[] }>('/admin/projects');
    return res.projects || res.data || [];
  }

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const res = await this.request<{ success: boolean; project?: Project; data?: Project }>('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    return (res.project || res.data)!;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const res = await this.request<{ success: boolean; project?: Project; data?: Project }>(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
    return (res.project || res.data)!;
  }

  async deleteProject(id: string): Promise<void> {
    await this.request(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload Image to ImgBB via Backend (with automatic direct ImgBB fallback)
  async uploadImage(file: File): Promise<string> {
    // 1. First attempt: Upload via Backend API
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await this.request<{ success: boolean; url: string; display_url: string }>('/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (res && (res.url || res.display_url)) {
        return res.url || res.display_url;
      }
    } catch (err: any) {
      console.warn('Backend upload failed, attempting direct ImgBB upload...', err);
    }

    // 2. Fallback: Direct upload to ImgBB CDN API
    const directFormData = new FormData();
    directFormData.append('image', file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY || '2378a037ba7373b59817b5ac4d744773';

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: directFormData,
    });

    const data = await response.json();

    if (data && data.success && (data.data?.display_url || data.data?.url)) {
      return data.data.display_url || data.data.url;
    }

    throw new Error(data?.error?.message || 'Failed to upload image to ImgBB.');
  }

  // Upload Resume PDF to Cloudflare R2 via Backend
  async uploadResume(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('resume', file);

    const res = await this.request<{ success: boolean; url: string }>('/upload/resume', {
      method: 'POST',
      body: formData,
    });
    return res.url;
  }
}

export const api = new ApiClient();
