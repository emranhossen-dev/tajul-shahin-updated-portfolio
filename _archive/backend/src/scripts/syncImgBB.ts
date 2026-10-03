import fs from 'fs';
import path from 'path';
import { pool, query } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const IMGBB_API_KEY = process.env.IMGBB_API_KEY || '2378a037ba7373b59817b5ac4d744773';
const PUBLIC_DIR = 'C:/Projects/My Portfolio/dev-emran/public';

const projectImageMapping: Record<string, string> = {
  'ardhi-mart': 'project_ardhimart_store.webp',
  'luminous-centre': 'project_luminous.webp',
  'yazmart': 'project_yazmart.webp',
  'symphony-softech': 'project_symphony.webp',
  'ironlocker': 'project_ironlocker.webp',
  'module-maker': 'project_modulemaker.webp',
};

async function uploadToImgBB(filePath: string, name: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);
  const formData = new FormData();
  formData.append('image', fileBuffer.toString('base64'));
  formData.append('name', name);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const data = (await res.json()) as any;
  if (!res.ok || !data.success) {
    throw new Error(`ImgBB upload failed: ${JSON.stringify(data)}`);
  }

  return data.data.display_url || data.data.url;
}

async function run() {
  console.log('🚀 Uploading project images to ImgBB and updating Neon Database...');

  for (const [slug, fileName] of Object.entries(projectImageMapping)) {
    const fullPath = path.join(PUBLIC_DIR, fileName);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ File not found: ${fullPath}`);
      continue;
    }

    try {
      console.log(`Uploading ${fileName} for slug "${slug}"...`);
      const imgUrl = await uploadToImgBB(fullPath, slug);
      console.log(`✅ Uploaded! New URL: ${imgUrl}`);

      const updateRes = await query(
        'UPDATE projects SET image_url = $1 WHERE slug = $2 RETURNING id, name, image_url',
        [imgUrl, slug]
      );

      if (updateRes.rows.length > 0) {
        console.log(`Updated DB project "${updateRes.rows[0].name}" with ImgBB URL.`);
      } else {
        console.warn(`No project found with slug "${slug}".`);
      }
    } catch (err: any) {
      console.error(`❌ Error processing ${slug}:`, err.message);
    }
  }

  console.log('🎉 Done syncing images to ImgBB and updating Neon DB!');
  await pool.end();
}

run().catch((e) => {
  console.error(e);
  pool.end();
});
