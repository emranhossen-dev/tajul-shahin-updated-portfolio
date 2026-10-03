import { Router, Response } from 'express';
import multer from 'multer';
import { uploadToImgBB } from '../config/imgbb.js';
import { uploadToR2 } from '../config/r2.js';
import { verifyAdmin, AuthenticatedRequest } from '../middleware/auth.js';

export const uploadRouter = Router();

// Configure Multer for memory storage (max 15MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
});

// Protect upload routes with Admin auth
uploadRouter.use(verifyAdmin);

// POST /api/upload/image - Upload image to ImgBB
uploadRouter.post('/image', upload.single('image'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Please select an image file to upload.' });
      return;
    }

    const { buffer, originalname, mimetype } = req.file;

    // Validate MIME type
    if (!mimetype.startsWith('image/')) {
      res.status(400).json({ success: false, message: 'Only image files (PNG, JPG, WEBP, GIF, SVG) are allowed.' });
      return;
    }

    const displayUrl = await uploadToImgBB(buffer, originalname);

    res.json({
      success: true,
      message: 'Image uploaded successfully to ImgBB.',
      url: displayUrl,
      fileName: originalname,
    });
  } catch (error: any) {
    console.error('ImgBB upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image to ImgBB.',
    });
  }
});

// POST /api/upload/resume - Upload Resume PDF to Cloudflare R2
uploadRouter.post('/resume', upload.single('resume'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'Please select a resume PDF file to upload.' });
      return;
    }

    const { buffer, mimetype } = req.file;

    if (mimetype !== 'application/pdf') {
      res.status(400).json({ success: false, message: 'Only PDF documents are allowed for resumes.' });
      return;
    }

    const fileName = 'Resume_of_Emran_Hossen.pdf';
    const publicUrl = await uploadToR2(buffer, fileName, 'application/pdf');

    res.json({
      success: true,
      message: 'Resume PDF uploaded successfully to Cloudflare R2.',
      url: publicUrl,
      fileName,
    });
  } catch (error: any) {
    console.error('Cloudflare R2 resume upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload resume to Cloudflare R2.',
    });
  }
});
