import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { query } from '../config/db.js';
import { verifyAdmin, AuthenticatedRequest } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

export const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_emran_portfolio_jwt_key_2026_secure';

// Auth Rate Limiter (max 10 authentication/PIN attempts per 15 minutes per IP)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

// POST /api/auth/login - Admin Login
authRouter.post('/login', authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    // 1. Look up user in Neon admin_users table
    const result = await query('SELECT * FROM admin_users WHERE email = $1', [email.trim().toLowerCase()]);

    if (result.rows.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const user = result.rows[0];

    // 2. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    // 3. Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Auth login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
});

// POST /api/auth/calculator - Secret Calculator pass (Result: 139921)
authRouter.post('/calculator', authLimiter, async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const secretPin = process.env.ADMIN_SECRET_PIN || '139921';
    if (String(code).trim() === secretPin) {
      const token = jwt.sign(
        {
          id: 'admin-master',
          email: 'dev@emran.work',
          name: 'Emran Hossen',
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.json({
        success: true,
        message: 'Access Granted. Welcome Emran!',
        token,
        user: {
          id: 'admin-master',
          email: 'dev@emran.work',
          name: 'Emran Hossen',
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid result.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


// GET /api/auth/me - Verify current admin session
authRouter.get('/me', verifyAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthenticated.' });
      return;
    }

    const result = await query('SELECT id, email, name, created_at FROM admin_users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    res.json({
      success: true,
      user: user || req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to verify session.' });
  }
});
