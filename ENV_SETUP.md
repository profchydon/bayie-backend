# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://bayie:bayie_password@localhost:5432/bayie_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Email (Resend)
RESEND_API_KEY="re_your_api_key_here"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# App
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:8080"
```

## Email Configuration with Resend

### Getting Started with Resend

1. Sign up for a free account at [resend.com](https://resend.com)
2. Navigate to the API Keys section in your dashboard
3. Create a new API key
4. Copy the API key and set it as `RESEND_API_KEY` in your `.env` file

### Setting Up Your Domain (Production)

For production, you'll want to use your own domain:

1. Go to Resend Dashboard > Domains
2. Add your domain (e.g., `bayie.com`)
3. Add the DNS records Resend provides to your domain's DNS settings
4. Wait for verification (usually takes a few minutes)
5. Once verified, update `RESEND_FROM_EMAIL` to use your domain:
   ```env
   RESEND_FROM_EMAIL="noreply@yourdomain.com"
   ```

### Development/Testing

For development and testing, you can use Resend's default domain:
```env
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

**Note:** Emails sent from `onboarding@resend.dev` will only work for email addresses you've added to your Resend account's test recipients list.

### Resend Benefits

- **Simple API**: No SMTP configuration needed
- **Great deliverability**: Built for modern email delivery
- **Free tier**: 3,000 emails/month free
- **Easy domain setup**: Simple DNS configuration
- **Analytics**: Built-in email tracking and analytics

## Security Notes

- Never commit `.env` file to version control
- Use strong, random values for `JWT_SECRET` in production
- Keep your `RESEND_API_KEY` secure and rotate it regularly
- Use environment-specific API keys for different environments

