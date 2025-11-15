# 🚀 Kaam Milega - Supabase Setup Guide

## 📋 Prerequisites
- Supabase account (https://supabase.com)
- Project created on Supabase

## 🔧 Step-by-Step Setup

### 1️⃣ Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Enter project details:
   - **Name**: Kaam Milega
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users (e.g., Mumbai)
4. Wait for project to be ready (~2 minutes)

### 2️⃣ Enable Phone Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Phone** authentication
3. Choose SMS provider (Twilio recommended for India):
   - For testing: Use Supabase's built-in test OTP
   - For production: Configure Twilio/MSG91
4. Save settings

### 3️⃣ Run Database Schema
1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Copy entire content from `supabase-schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. Wait for success message ✅

### 4️⃣ Configure Storage (For Images)
1. Go to **Storage** section
2. Create new bucket: `avatars`
   - Public: ✅ Yes
   - File size limit: 5MB
3. Create new bucket: `company-logos`
   - Public: ✅ Yes
   - File size limit: 5MB
4. Create new bucket: `resumes`
   - Public: ❌ No
   - File size limit: 10MB
5. Create new bucket: `service-images`
   - Public: ✅ Yes
   - File size limit: 5MB
6. Create new bucket: `review-images`
   - Public: ✅ Yes
   - File size limit: 5MB

### 5️⃣ Get Your API Keys
1. Go to **Settings** → **API**
2. Copy the following:
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Save these securely (you'll need them in your app)

### 6️⃣ Environment Variables
Create a `.env.local` file in your project root:

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Razorpay (for payments)
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 🔐 Authentication Flow

### Phone OTP Login (Primary Method)
```javascript
// 1. Send OTP
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+917527996150',
  options: {
    data: {
      full_name: 'User Name',
      role: 'user' // or 'company'
    }
  }
})

// 2. Verify OTP
const { data, error } = await supabase.auth.verifyOtp({
  phone: '+917527996150',
  token: '123456',
  type: 'sms'
})

// 3. Create profile (if new user)
const { error } = await supabase
  .from('profiles')
  .insert({
    id: user.id,
    phone: '+917527996150',
    full_name: 'User Name',
    role: 'user'
  })
```

### Admin Phone Numbers (Auto-assigned)
These phone numbers automatically get admin role:
- `7527996150`
- `8847602134`
- `7986035551`

## 📊 Database Tables Overview

### Core Tables
| Table | Purpose |
|-------|---------|
| `profiles` | User authentication & basic info |
| `companies` | Company-specific data with PAN |
| `user_profiles` | User-specific data (skills, resume) |
| `jobs` | Job listings (requires admin approval) |
| `services` | Service listings (requires admin approval) |
| `job_applications` | Job applications with match scores |
| `interviews` | Interview scheduling |
| `service_bookings` | Service bookings with payment |
| `reviews` | Service reviews & ratings |
| `admin_actions` | Admin approval audit log |
| `notifications` | User notifications |
| `saved_items` | Bookmarked jobs/services |

## 🔒 Row Level Security (RLS)

All tables have RLS enabled with policies:
- ✅ **Public read** for approved content
- ✅ **User read/write** for own data
- ✅ **Company access** to their listings & applications
- ✅ **Admin full access** for moderation

## 🎯 Key Features

### 1. Multi-Role System
- **Users**: Can apply for jobs, book services
- **Companies**: Can post jobs, view applications
- **Admins**: Can approve/decline/flag/ban everything

### 2. Admin Approval Workflow
```
Job/Service Created → Status: "pending"
                         ↓
            Admin Reviews Listing
                ↙        ↓        ↘
          Approve    Decline    Flag/Ban
             ↓          ↓          ↓
        Published   Not shown   Hidden
```

### 3. Payment Integration (Razorpay)
- Service bookings require payment
- UPI, Cards, Wallets supported
- Payment status tracked in `service_bookings`

### 4. Real-time Notifications
- Job application status updates
- Service booking confirmations
- Admin approval notifications

## 📱 Common Queries

### Get Approved Jobs
```javascript
const { data: jobs } = await supabase
  .from('jobs')
  .select(`
    *,
    companies (
      company_name,
      logo_url
    )
  `)
  .eq('status', 'approved')
  .eq('is_active', true)
  .order('created_at', { ascending: false })
```

### Get User Applications
```javascript
const { data: applications } = await supabase
  .from('job_applications')
  .select(`
    *,
    jobs (
      title,
      company_id,
      companies (
        company_name
      )
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

### Submit Job Application
```javascript
const { data, error } = await supabase
  .from('job_applications')
  .insert({
    job_id: jobId,
    user_id: userId,
    cover_letter: 'I am interested...',
    resume_url: resumeUrl,
    match_score: 85
  })
```

### Admin Approve Job
```javascript
const { error } = await supabase
  .from('jobs')
  .update({
    status: 'approved',
    approved_by: adminId,
    approval_date: new Date().toISOString()
  })
  .eq('id', jobId)

// Log admin action
await supabase
  .from('admin_actions')
  .insert({
    admin_id: adminId,
    action_type: 'approve',
    target_type: 'job',
    target_id: jobId
  })
```

### Book Service with Payment
```javascript
const { data: booking, error } = await supabase
  .from('service_bookings')
  .insert({
    service_id: serviceId,
    customer_id: userId,
    booking_date: date,
    booking_time: time,
    location: location,
    customer_phone: phone,
    amount: amount,
    payment_status: 'pending',
    razorpay_order_id: orderId
  })
  .select()
  .single()
```

## 🔧 Useful Functions

### Increment Job Views
```javascript
await supabase.rpc('increment_job_views', { job_uuid: jobId })
```

### Get User Role
```javascript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', userId)
  .single()
```

### Check if User is Admin
```javascript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', userId)
  .single()

const isAdmin = profile?.role === 'admin'
```

## 🚨 Security Best Practices

1. **Never expose service_role key** in frontend
2. **Always use anon key** for client-side
3. **Validate user input** before database operations
4. **Use RLS policies** for access control
5. **Store sensitive data** (PAN, payment) encrypted
6. **Regular backups** via Supabase dashboard

## 📞 Testing with Phone Numbers

### Test OTP (Development)
In Supabase dashboard → Authentication → Settings:
- Enable "Disable email confirmations"
- Use test phone numbers provided by Supabase

### Production SMS
Configure SMS provider:
1. Twilio (International + India)
2. MSG91 (India-specific, cheaper)
3. AWS SNS

## 🔄 Database Migrations

When making schema changes:
1. Go to SQL Editor
2. Create new migration
3. Run SQL
4. Test thoroughly
5. Deploy to production

## 📊 Monitoring

1. **Database Stats**: Supabase Dashboard → Database
2. **Auth Users**: Authentication → Users
3. **API Usage**: Settings → Usage
4. **Logs**: Logs Explorer for debugging

## 🎉 You're Ready!

Your database is now set up with:
- ✅ Multi-role authentication
- ✅ Admin approval system
- ✅ Payment integration structure
- ✅ Real-time capabilities
- ✅ Secure RLS policies

Next steps:
1. Integrate Supabase in your React app
2. Implement authentication flow
3. Build CRUD operations
4. Add real-time subscriptions
5. Configure Razorpay payments

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues
