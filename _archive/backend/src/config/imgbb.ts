import dotenv from 'dotenv';

dotenv.config();

const IMGBB_API_KEY = process.env.IMGBB_API_KEY || '2378a037ba7373b59817b5ac4d744773';

export interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string | number;
    height: string | number;
    size: number;
    time: string | number;
    expiration: string | number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

/**
 * Upload image buffer to ImgBB and return the direct CDN image URL
 */
export async function uploadToImgBB(fileBuffer: Buffer, fileName?: string): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY || IMGBB_API_KEY;

  const formData = new FormData();
  formData.append('image', fileBuffer.toString('base64'));
  if (fileName) {
    formData.append('name', fileName.replace(/\.[^/.]+$/, ''));
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ImgBB upload failed (${response.status}): ${errorText}`);
  }

  const result = (await response.json()) as ImgBBResponse;

  if (!result.success || (!result.data?.display_url && !result.data?.url)) {
    throw new Error('ImgBB upload response did not indicate success.');
  }

  return result.data.display_url || result.data.url;
}
