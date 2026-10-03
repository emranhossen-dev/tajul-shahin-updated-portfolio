import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { query } from '../config/db.js';
import { resend, ADMIN_EMAIL, SENDER_EMAIL } from '../config/resend.js';

export const contactRouter = Router();

// Strict Contact Rate Limiter (max 5 submissions per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact submissions from this IP. Please wait 15 minutes before sending another message.',
  },
});

contactRouter.post('/', contactLimiter, async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
      return;
    }

    // 1. Insert message into Neon PostgreSQL messages table
    const result = await query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [name.trim(), email.trim().toLowerCase(), subject?.trim() || 'Portfolio Contact Inquiry', message.trim()]
    );
    const data = result.rows[0];


    // 2. Send instant email notification to Admin via Resend (asynchronous)
    if (resend) {
      // 2a. Admin Notification
      resend.emails
        .send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          replyTo: email.trim(),
          subject: `🔔 New Portfolio Contact from ${name}: ${subject || 'General Inquiry'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 16px 20px; border-radius: 8px; color: #ffffff;">
                <h2 style="margin: 0; font-size: 20px;">New Message from Portfolio Website</h2>
              </div>
              <div style="padding: 20px 0; border-bottom: 1px solid #e2e8f0;">
                <p style="margin: 8px 0; color: #475569;"><strong>Sender Name:</strong> ${name}</p>
                <p style="margin: 8px 0; color: #475569;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
                <p style="margin: 8px 0; color: #475569;"><strong>Subject:</strong> ${subject || 'N/A'}</p>
              </div>
              <div style="padding: 20px 0;">
                <h4 style="margin: 0 0 10px; color: #1e293b;">Message Content:</h4>
                <div style="padding: 16px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px;">
                Sent from your portfolio contact form at emran.work
              </p>
            </div>
          `,
        })
        .catch((err) => {
          console.error('Failed to dispatch contact notification email to admin:', err);
        });

      // 2b. Auto-responder to Sender
      resend.emails
        .send({
          from: SENDER_EMAIL,
          to: email.trim(),
          subject: `✨ Thanks for reaching out, ${name}! [Message Received]`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
              <div style="background: linear-gradient(135deg, #0c152c, #1e1b4b); padding: 24px 20px; border-radius: 10px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Message Received!</h1>
                <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Emran Hossen — Software Engineer & Full Stack Developer</p>
              </div>
              <div style="padding: 24px 8px; line-height: 1.7; font-size: 15px; color: #334155;">
                <p style="margin: 0 0 16px;">Hi <strong>${name}</strong>,</p>
                <p style="margin: 0 0 16px;">
                  Thank you for reaching out via my portfolio website. I have received your message regarding <strong>"${subject || 'General Inquiry'}"</strong>.
                </p>
                <p style="margin: 0 0 16px;">
                  I value your time and interest in collaborating. I will review your message carefully and get back to you within <strong>a few hours</strong>.
                </p>
                <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border-left: 3px solid #6366f1; border-radius: 6px; font-size: 13.5px; color: #475569;">
                  <strong style="color: #1e293b; display: block; margin-bottom: 6px;">Your submitted inquiry:</strong>
                  <span style="white-space: pre-wrap;">${message}</span>
                </div>
                <p style="margin: 24px 0 0; color: #64748b; font-size: 14px;">
                  In the meantime, feel free to explore my latest projects or connect with me on GitHub &amp; LinkedIn.
                </p>
              </div>
              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 8px; font-size: 13px; color: #64748b;">
                <p style="margin: 0 0 4px; font-weight: 600; color: #0f172a;">Emran Hossen</p>
                <p style="margin: 0 0 8px; color: #6366f1;">Software Engineer &amp; Full Stack Developer</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                  Website: <a href="https://emran.work" style="color: #6366f1; text-decoration: none;">emran.work</a> | 
                  GitHub: <a href="https://github.com/emranhossen-dev" style="color: #6366f1; text-decoration: none;">github.com/emranhossen-dev</a>
                </p>
              </div>
            </div>
          `,
        })
        .catch((err) => {
          console.error('Failed to dispatch auto-reply confirmation email to sender:', err);
        });
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. Emran will get back to you shortly.',
      data: {
        id: data?.id,
        created_at: data?.created_at,
      },
    });
  } catch (error: any) {
    console.error('Contact route error:', error);
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your message.',
    });
  }
});
