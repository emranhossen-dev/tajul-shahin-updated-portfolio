import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY || '';

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Emran Hossen <dev@emran.work>';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dev@emran.work';
