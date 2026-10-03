import { NextRequest, NextResponse } from 'next/server';
import { addMessage } from '@/lib/storage';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tajulshahin96@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Tajul Shahin <onboarding@resend.dev>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Save to storage (Neon DB + local file fallback)
    const saved = await addMessage({
      name,
      email,
      phone,
      service,
      budget,
      message,
      subject,
    });

    // Try sending email alert via Resend (async, non-blocking)
    if (resend) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          replyTo: email,
          subject: `🚀 New Strategy Call Booking: ${name} [${service || 'Digital Marketing'}]`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 20px; border-radius: 8px; color: #ffffff;">
                <h2 style="margin: 0; font-size: 20px;">New Client Inquiry — Tajul Shahin</h2>
                <p style="margin: 6px 0 0; opacity: 0.9; font-size: 13px;">High-value lead received through portfolio website</p>
              </div>
              <div style="padding: 20px 0; border-bottom: 1px solid #e2e8f0; line-height: 1.6;">
                <p style="margin: 6px 0;"><strong>Client Name:</strong> ${name}</p>
                <p style="margin: 6px 0;"><strong>Client Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
                <p style="margin: 6px 0;"><strong>WhatsApp / Phone:</strong> ${phone || 'Not provided'}</p>
                <p style="margin: 6px 0;"><strong>Interested Service:</strong> ${service || 'General'}</p>
                <p style="margin: 6px 0;"><strong>Ad Budget:</strong> ${budget || 'Flexible'}</p>
              </div>
              <div style="padding: 20px 0;">
                <h4 style="margin: 0 0 10px; color: #0f172a;">Message / Growth Goals:</h4>
                <div style="padding: 16px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              ${
                phone
                  ? `<div style="text-align: center; margin-top: 20px;">
                      <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #10b981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">Chat With Lead on WhatsApp</a>
                    </div>`
                  : ''
              }
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn('Resend email dispatch error:', emailErr);
      }
    }

    // Build direct WhatsApp link for the user
    const waText = encodeURIComponent(
      `Hello Tajul! My name is ${name}. I just submitted an inquiry on your website regarding "${service || 'Growth Marketing'}". Ad budget: ${budget || 'To discuss'}. Let's connect!`
    );
    const whatsappRedirect = `https://wa.me/8801629105607?text=${waText}`;

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your growth strategy inquiry has been received. Tajul Shahin will review your goals and reach out promptly.`,
      whatsappRedirect,
      leadId: saved.id,
    });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing inquiry.' },
      { status: 500 }
    );
  }
}
