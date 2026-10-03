import { Router, Response } from 'express';
import { query } from '../config/db.js';
import { verifyAdmin, AuthenticatedRequest } from '../middleware/auth.js';
import { resend, SENDER_EMAIL } from '../config/resend.js';

export const adminRouter = Router();

// Protect all admin routes with JWT middleware
adminRouter.use(verifyAdmin);

// ==========================================
// 1. Dashboard Metrics / Stats
// ==========================================
adminRouter.get('/stats', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [messagesCountRes, unreadCountRes, projectsCountRes] = await Promise.all([
      query('SELECT COUNT(*) FROM messages'),
      query('SELECT COUNT(*) FROM messages WHERE is_read = false'),
      query('SELECT COUNT(*) FROM projects'),
    ]);

    const statsData = {
      totalMessages: parseInt(messagesCountRes.rows[0].count, 10) || 0,
      unreadMessages: parseInt(unreadCountRes.rows[0].count, 10) || 0,
      totalProjects: parseInt(projectsCountRes.rows[0].count, 10) || 0,
    };

    res.json({
      success: true,
      data: statsData,
      stats: statsData,
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats.' });
  }
});

// ==========================================
// 2. Messages Management
// ==========================================
// GET /api/admin/messages
adminRouter.get('/messages', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { is_read, limit = 50, page = 1 } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let sql = 'SELECT * FROM messages';
    let countSql = 'SELECT COUNT(*) FROM messages';
    const params: any[] = [];
    const countParams: any[] = [];

    if (is_read !== undefined) {
      sql += ' WHERE is_read = $1';
      countSql += ' WHERE is_read = $1';
      params.push(is_read === 'true');
      countParams.push(is_read === 'true');
    }

    const countRes = await query(countSql, countParams);
    const total = parseInt(countRes.rows[0].count, 10) || 0;

    sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limitNum, offset);

    const result = await query(sql, params);

    const totalPages = Math.ceil(total / limitNum) || 1;

    res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      data: result.rows,
      messages: result.rows,
    });
  } catch (error: any) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
});

// PATCH /api/admin/messages/:id/read - Mark message read/unread
adminRouter.patch('/messages/:id/read', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { is_read = true } = req.body;

    const result = await query(
      'UPDATE messages SET is_read = $1 WHERE id = $2 RETURNING *',
      [is_read, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Message not found.' });
      return;
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update message status.' });
  }
});

// POST /api/admin/messages/:id/reply - Send reply email and record it
adminRouter.post('/messages/:id/reply', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || !replyText.trim()) {
      res.status(400).json({ success: false, message: 'Reply text is required.' });
      return;
    }

    // Fetch message
    const msgRes = await query('SELECT * FROM messages WHERE id = $1', [id]);
    if (msgRes.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Message not found.' });
      return;
    }
    const message = msgRes.rows[0];

    // Send email via Resend
    if (!resend) {
      res.status(500).json({ success: false, message: 'Resend API key is not configured.' });
      return;
    }

    const { error: sendError } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: message.email,
      subject: `Re: ${message.subject || 'Your inquiry on emran.work'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 18px 24px; border-radius: 8px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">Emran Hossen</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Full Stack Developer | emran.work</p>
          </div>
          
          <div style="padding: 24px 0; font-size: 15px; line-height: 1.7;">
            <p>Hi <strong>${message.name}</strong>,</p>
            <div style="white-space: pre-wrap; padding: 12px 0;">${replyText.trim()}</div>
            <p style="margin-top: 24px;">Best regards,<br/><strong>Emran Hossen</strong><br/><span style="color: #6366f1;">dev@emran.work</span></p>
          </div>

          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 3px solid #cbd5e1; border-radius: 4px; font-size: 13px; color: #64748b;">
            <p style="margin: 0 0 6px;"><strong>In response to your message:</strong></p>
            <p style="margin: 0; font-style: italic;">"${message.message}"</p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      res.status(500).json({ success: false, message: 'Failed to send reply email.', error: sendError });
      return;
    }

    // Update message record
    const updateRes = await query(
      `UPDATE messages 
       SET replied = true, reply_text = $1, replied_at = NOW(), is_read = true 
       WHERE id = $2 
       RETURNING *`,
      [replyText.trim(), id]
    );

    res.json({
      success: true,
      message: 'Reply sent successfully.',
      data: updateRes.rows[0],
    });
  } catch (error: any) {
    console.error('Reply error:', error);
    res.status(500).json({ success: false, message: 'Internal server error while sending reply.' });
  }
});

// DELETE /api/admin/messages/:id - Delete message
adminRouter.delete('/messages/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM messages WHERE id = $1', [id]);
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
});

// ==========================================
// 3. Projects Management (CRUD)
// ==========================================
// GET /api/admin/projects - Get all projects for admin
adminRouter.get('/projects', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      projects: result.rows,
    });
  } catch (error: any) {
    console.error('Admin fetch projects error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch projects.' });
  }
});

// POST /api/admin/projects - Create new project
adminRouter.post('/projects', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const name = req.body.name || req.body.title;
    const type = req.body.type || 'Full-Stack Web App';
    const image_url = req.body.image_url;
    const description = req.body.description;
    const live_link = req.body.live_link || req.body.live_url;
    const github_link = req.body.github_link || req.body.github_url || '';
    const stack = req.body.stack || req.body.tags || [];
    const is_github_private = req.body.is_github_private || false;
    const is_wip = req.body.is_wip || false;
    const challenges = req.body.challenges || '';
    const improvements = req.body.improvements || '';
    const display_order = req.body.display_order ?? req.body.order_index ?? 0;
    const slug = req.body.slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'project');

    if (!name || !image_url || !description || !live_link) {
      res.status(400).json({
        success: false,
        message: 'Name, image_url, description, and live_link are required.',
      });
      return;
    }

    const stackArray = Array.isArray(stack) ? stack : [];

    const result = await query(
      `INSERT INTO projects 
       (name, slug, type, image_url, description, stack, live_link, github_link, is_github_private, is_wip, challenges, improvements, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [name, slug, type, image_url, description, stackArray, live_link, github_link, is_github_private, is_wip, challenges, improvements, display_order]
    );

    res.status(201).json({ success: true, message: 'Project created successfully.', data: result.rows[0], project: result.rows[0] });
  } catch (error: any) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
});

// PUT /api/admin/projects/:id - Update project
adminRouter.put('/projects/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const name = req.body.name || req.body.title;
    const type = req.body.type;
    const image_url = req.body.image_url;
    const description = req.body.description;
    const live_link = req.body.live_link || req.body.live_url;
    const github_link = req.body.github_link || req.body.github_url;
    const stack = req.body.stack || req.body.tags;
    const is_github_private = req.body.is_github_private;
    const is_wip = req.body.is_wip;
    const challenges = req.body.challenges;
    const improvements = req.body.improvements;
    const display_order = req.body.display_order ?? req.body.order_index;
    const slug = req.body.slug;

    const result = await query(
      `UPDATE projects
       SET name = COALESCE($1, name),
           slug = COALESCE($2, slug),
           type = COALESCE($3, type),
           image_url = COALESCE($4, image_url),
           description = COALESCE($5, description),
           stack = COALESCE($6, stack),
           live_link = COALESCE($7, live_link),
           github_link = COALESCE($8, github_link),
           is_github_private = COALESCE($9, is_github_private),
           is_wip = COALESCE($10, is_wip),
           challenges = COALESCE($11, challenges),
           improvements = COALESCE($12, improvements),
           display_order = COALESCE($13, display_order),
           updated_at = NOW()
       WHERE id = $14
       RETURNING *`,
      [name, slug, type, image_url, description, stack, live_link, github_link, is_github_private, is_wip, challenges, improvements, display_order, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    res.json({ success: true, message: 'Project updated successfully.', data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
});

// DELETE /api/admin/projects/:id - Delete project
adminRouter.delete('/projects/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
});
