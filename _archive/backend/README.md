# Portfolio-Backend API

High-performance REST API powering Emran Hossen's Developer Portfolio and Admin Panel.

## 🚀 Architecture & Tech Stack

- **Runtime**: Node.js + Express (TypeScript)
- **Database**: Supabase PostgreSQL
- **Image Hosting**: ImgBB API (Direct project thumbnail uploads & CDN delivery)
- **Object Storage**: Cloudflare R2 (S3-compatible zero-egress storage for PDF resume)
- **Email Service**: Resend API (`dev@emran.work`)
- **Authentication**: JWT & bcryptjs password hashing

---

## 🛠️ Environment Variables Setup

Create a `.env` file in the root of `Portfolio-Backend`:

```env
PORT=5000
NODE_ENV=development

# Supabase PostgreSQL
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# JWT Secret for Admin Auth
JWT_SECRET=your-secure-jwt-secret-at-least-32-chars

# Resend Email Service
RESEND_API_KEY=re_your_resend_api_key
CONTACT_NOTIFICATION_EMAIL=dev@emran.work

# ImgBB Image CDN Host
IMGBB_API_KEY=your_free_imgbb_api_key

# Cloudflare R2 Object Storage (For PDF Resume)
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your-portfolio-r2-bucket
R2_PUBLIC_DOMAIN=https://pub-yourbucket.r2.dev
```

---

## 📦 Database Initialization & Seeding

1. Open your Supabase Dashboard SQL editor and execute `src/scripts/schema.sql`.
2. Run database seed to create default admin (`dev@emran.work` / `Admin@12345`) and default showcase projects:

```bash
npm run seed
```

---

## 🏃‍♂️ Running Locally

```bash
# Start development server with auto-reload
npm run dev

# Or build and start production
npm run build
npm start
```

API will be running at `http://localhost:5000`.

---

## 📡 API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact message from frontend portfolio & sends notification email via Resend
- `GET /api/projects` - Get published projects list

### Authentication
- `POST /api/auth/login` - Admin login with email and password
- `GET /api/auth/verify` - Verify JWT token validity

### Admin Endpoints (Requires `Authorization: Bearer <token>`)
- `GET /api/admin/stats` - Total messages, unread count, project count
- `GET /api/admin/messages` - Paginated messages with status filter (`unread`, `read`, `replied`)
- `PATCH /api/admin/messages/:id/status` - Mark message read/unread
- `POST /api/admin/messages/:id/reply` - Send direct email reply via Resend
- `DELETE /api/admin/messages/:id` - Delete message
- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/upload/image` - Upload image directly to ImgBB
- `POST /api/upload/resume` - Upload PDF resume directly to Cloudflare R2
