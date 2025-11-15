# 📦 Kaam Milega - Installation Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project setup

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Install Razorpay for payments
npm install razorpay

# Install React Router for navigation (if not already installed)
npm install react-router-dom

# Install date utilities
npm install date-fns

# Install form validation (optional)
npm install zod
npm install react-hook-form@7.55.0
```

### 2. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

### 3. Setup Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy content from `supabase-schema.sql`
4. Run the SQL query
5. Wait for success ✅

Detailed setup guide: See `SUPABASE_SETUP.md`

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 📁 Project Structure

```
kaam-milega/
├── src/
│   ├── components/         # React components
│   │   ├── company/       # Company dashboard components
│   │   └── ui/            # Shadcn UI components
│   ├── lib/               # Utilities and configs
│   │   └── supabaseClient.ts  # Supabase client & helpers
│   ├── styles/            # Global styles
│   └── App.tsx            # Main app component
├── supabase-schema.sql    # Database schema
├── SUPABASE_SETUP.md      # Supabase setup guide
├── .env.example           # Environment variables template
└── package.json           # Dependencies
```

## 🔐 Authentication Setup

### Phone OTP Authentication

The app uses phone OTP authentication via Supabase.

**For Development/Testing:**
1. Go to Supabase Dashboard → Authentication → Settings
2. Enable "Phone" provider
3. Use test phone numbers for development
4. Supabase provides test OTPs automatically

**For Production:**
1. Configure SMS provider (Twilio/MSG91)
2. Add credentials in Supabase Auth settings
3. Enable rate limiting and CAPTCHA

### Admin Access

These phone numbers automatically get admin role:
- `7527996150`
- `8847602134`
- `7986035551`

When any of these numbers signs in, they are automatically assigned admin role.

## 💳 Razorpay Setup

### 1. Create Razorpay Account
1. Sign up at https://razorpay.com
2. Get API keys from Dashboard → Settings → API Keys

### 2. Configure in App
Add keys to `.env.local`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_RAZORPAY_KEY_SECRET=xxxxx
```

### 3. Test Mode
Use Razorpay test mode for development:
- Test cards provided by Razorpay
- No real money transactions
- Full payment flow testing

### 4. Production
Switch to live keys when deploying:
1. Complete KYC on Razorpay
2. Get live API keys
3. Update environment variables
4. Test thoroughly before launch

## 🗄️ Database Tables

All tables are created automatically when you run `supabase-schema.sql`:

### Core Tables
- `profiles` - User authentication & info
- `companies` - Company details with PAN
- `user_profiles` - User skills & resume
- `jobs` - Job listings
- `services` - Service listings
- `job_applications` - Job applications
- `service_bookings` - Service bookings
- `interviews` - Interview scheduling
- `reviews` - Service reviews
- `admin_actions` - Admin moderation log
- `notifications` - User notifications
- `saved_items` - Bookmarks

### Row Level Security (RLS)
All tables have RLS enabled with proper policies for:
- Public read access for approved content
- User-specific read/write for own data
- Company access to their listings
- Admin full access

## 🔧 Usage Examples

### Authentication

```typescript
import { signInWithPhone, verifyOTP, getCurrentUser } from './lib/supabaseClient';

// Send OTP
const { data, error } = await signInWithPhone('+917527996150', 'John Doe', 'user');

// Verify OTP
const { data, error } = await verifyOTP('+917527996150', '123456');

// Get current user
const user = await getCurrentUser();
console.log(user.role); // 'user', 'company', or 'admin'
```

### Fetching Jobs

```typescript
import { getApprovedJobs } from './lib/supabaseClient';

// Get all approved jobs
const { data: jobs, error } = await getApprovedJobs();

// With filters
const { data: jobs, error } = await getApprovedJobs({
  location: 'Mumbai',
  jobType: 'Full-time',
  limit: 20
});
```

### Job Application

```typescript
import { applyForJob } from './lib/supabaseClient';

const { data, error } = await applyForJob(
  jobId,
  userId,
  'I am interested in this role...',
  'https://resume-url.com/resume.pdf',
  85 // match score
);
```

### Admin Moderation

```typescript
import { adminModerateContent } from './lib/supabaseClient';

// Approve a job
await adminModerateContent('job', jobId, 'approved', adminId);

// Decline with reason
await adminModerateContent('job', jobId, 'declined', adminId, 'Incomplete information');

// Flag content
await adminModerateContent('service', serviceId, 'flagged', adminId, 'Suspicious activity');
```

## 🐛 Troubleshooting

### Common Issues

**1. Supabase connection error**
```
Error: Invalid Supabase URL or anon key
```
Solution: Check `.env.local` has correct credentials

**2. RLS policy violation**
```
Error: new row violates row-level security policy
```
Solution: User might not have permission. Check if authenticated correctly.

**3. Phone OTP not working**
```
Error: SMS provider not configured
```
Solution: For development, use Supabase test OTPs. For production, configure SMS provider.

**4. Database table not found**
```
Error: relation "public.jobs" does not exist
```
Solution: Run `supabase-schema.sql` in SQL Editor

**5. Admin role not assigned**
```
User with phone 7527996150 not getting admin role
```
Solution: Check if trigger `assign_admin_role` is created properly

### Debug Mode

Enable debug mode in Supabase client:
```typescript
const supabase = createClient(url, key, {
  auth: {
    debug: true
  }
});
```

## 📊 Testing

### Test Users

Create test accounts:
- **Admin**: `7527996150` (auto admin)
- **Company**: `9999999991`
- **User**: `9999999992`

### Test Flow

1. **User Registration**
   - Sign up with phone OTP
   - Complete profile
   - Browse jobs/services

2. **Company Registration**
   - Sign up as company
   - Verify PAN
   - Post job listing
   - Wait for admin approval

3. **Admin Actions**
   - Login with admin number
   - Review pending jobs/services
   - Approve/Decline/Flag content

4. **Service Booking**
   - Book a service
   - Make payment (test mode)
   - Complete booking
   - Leave review

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables
Add these in deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_RAZORPAY_KEY_ID`

### Production Checklist
- ✅ Database migrations run
- ✅ RLS policies enabled
- ✅ SMS provider configured
- ✅ Razorpay KYC completed
- ✅ Environment variables set
- ✅ Error tracking setup (Sentry)
- ✅ Analytics configured
- ✅ Performance monitoring
- ✅ Backup strategy in place

## 📚 Resources

- **Supabase Docs**: https://supabase.com/docs
- **Razorpay Docs**: https://razorpay.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

## 🤝 Support

For issues and questions:
1. Check `SUPABASE_SETUP.md`
2. Review Supabase logs
3. Check browser console errors
4. Verify environment variables

## 📝 License

This project is proprietary software for Kaam Milega.

---

**Happy Coding! 🎉**
