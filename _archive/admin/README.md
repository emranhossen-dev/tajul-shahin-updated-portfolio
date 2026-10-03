# Portfolio-Admin Panel

Modern, state-of-the-art admin dashboard built with React 19, Vite, and Tailwind CSS.

## 🚀 Features

- **Inquiries / Messages Inbox**:
  - Live filter by status (`all`, `unread`, `replied`)
  - Full message inspection
  - Direct 1-click email replies powered by Resend
  - Status toggle and message deletion
- **Projects Showcase CMS**:
  - Add, edit, reorder, and delete projects
  - **ImgBB Integration**: Directly pick an image file to upload to ImgBB and auto-populate CDN preview
  - Featured projects toggle
- **Resume & Document Management**:
  - **Cloudflare R2 Storage**: Upload new PDF resume directly to your Cloudflare R2 bucket
  - Copy public resume link and live embedded preview
- **Live Infrastructure Health Status**:
  - Real-time connection indicators for Supabase PostgreSQL, ImgBB, and Cloudflare R2

---

## 🛠️ Environment Configuration

Create a `.env` file in `Portfolio-Admin`:

```env
VITE_API_URL=https://ap1.emran.work/api
```

When deploying the backend, set `VITE_API_URL` to your production backend URL (e.g. `https://api.yourdomain.com/api`).

---

## 🏃‍♂️ Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Dashboard will run on `http://localhost:5173`.

---

## 🌐 Deploying to Cloudflare Pages

1. Push this folder (`Portfolio-Admin`) to your GitHub repository (e.g. `portfolio-admin`).
2. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository and configure:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**:
     - `VITE_API_URL`: Your backend API URL (e.g. `https://api.yourdomain.com/api`)
4. Click **Save and Deploy**!
