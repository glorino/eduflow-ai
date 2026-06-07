import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"EduFlow AI" <${process.env.SMTP_USER}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}

export function buildEmailTemplate(
  title: string,
  content: string,
  footer?: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; color: #333; line-height: 1.6; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        .btn { display: inline-block; padding: 12px 24px; background: #1e40af; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .alert { padding: 15px; border-radius: 6px; margin: 15px 0; }
        .alert-warning { background: #fef3cd; border: 1px solid #ffc107; color: #856404; }
        .alert-danger { background: #f8d7da; border: 1px solid #dc3545; color: #721c24; }
        .alert-success { background: #d4edda; border: 1px solid #28a745; color: #155724; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>EduFlow AI</h1>
          <p>Smart School Management</p>
        </div>
        <div class="content">
          <h2>${title}</h2>
          ${content}
        </div>
        <div class="footer">
          ${footer || '<p>&copy; 2026 EduFlow AI. All rights reserved.</p>'}
        </div>
      </div>
    </body>
    </html>
  `;
}
