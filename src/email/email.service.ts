import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      console.warn('RESEND_API_KEY not found. Email sending will be disabled.');
    } else {
      this.resend = new Resend(apiKey);
    }
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    if (!this.resend) {
      console.warn('Resend not initialized. Skipping email send.');
      return;
    }

    const from = this.configService.get<string>('RESEND_FROM_EMAIL', 'onboarding@resend.dev');
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:8080');

    try {
      await this.resend.emails.send({
        from,
        to: email,
        subject: 'Welcome to Bayie!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Bayie</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Welcome to Bayie!</h1>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p>Hi ${firstName},</p>
              <p>Thank you for signing up for Bayie! We're excited to have you on board.</p>
              <p>Bayie helps you trace every request in your distributed systems with sub-millisecond precision. Get complete visibility into your infrastructure and debug production issues faster than ever.</p>
              <div style="margin: 30px 0;">
                <a href="${frontendUrl}" 
                   style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Get Started
                </a>
              </div>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Best regards,<br>The Bayie Team</p>
            </div>
          </body>
          </html>
        `,
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send welcome email to ${email}:`, error);
      // Don't throw error - email failure shouldn't break signup
    }
  }
}

