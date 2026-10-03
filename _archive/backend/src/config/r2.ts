import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const accountId = process.env.R2_ACCOUNT_ID || '';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '';

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'emran-portfolio-bucket';
export const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || '';

export const r2Client = (accountId && accessKeyId && secretAccessKey)
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  : null;

/**
 * Upload buffer to Cloudflare R2 bucket
 */
export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  if (!r2Client) {
    throw new Error('Cloudflare R2 credentials are not configured in environment variables.');
  }

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Return public URL
  if (R2_PUBLIC_DOMAIN) {
    const cleanDomain = R2_PUBLIC_DOMAIN.replace(/\/$/, '');
    return `${cleanDomain}/${fileName}`;
  }

  return `https://${R2_BUCKET_NAME}.r2.cloudflarestorage.com/${fileName}`;
}

/**
 * Delete object from Cloudflare R2
 */
export async function deleteFromR2(fileName: string): Promise<void> {
  if (!r2Client) return;

  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
  });

  await r2Client.send(command);
}
