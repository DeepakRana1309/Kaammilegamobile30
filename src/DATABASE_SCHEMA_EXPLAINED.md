# 🗄️ Kaam Milega - Database Schema Explanation

## Overview
Kaam Milega uses **Supabase (PostgreSQL)** as its database with Row Level Security (RLS) for data protection. The schema supports multi-role authentication, admin approval workflows, and payment integration.

---

## 🎯 Key Features

### 1. **Multi-Role System**
- 👤 **User**: Can browse jobs, apply, book services
- 🏢 **Company**: Can post jobs, view applications, manage candidates
- 👑 **Admin**: Can approve/decline/flag/ban all content

### 2. **Admin Approval Workflow**
All job and service listings require admin approval before becoming public:
```
Created → Pending → Admin Review → Approved/Declined/Flagged/Banned
```

### 3. **Auto-Admin Assignment**
These phone numbers automatically get admin role:
- `7527996150`
- `8847602134`
- `7986035551`

---

## 📊 Table Relationships

```
auth.users (Supabase Auth)
    ↓
profiles (id references auth.users.id)
    ↓
    ├── companies (user_id references profiles.id)
    │       ↓
    │   jobs (company_id references companies.id)
    │       ↓
    │   job_applications (job_id references jobs.id)
    │       ↓
    │   interviews (application_id references job_applications.id)
    │
    ├── user_profiles (user_id references profiles.id)
    │
    └── services (provider_id references profiles.id)
            ↓
        service_bookings (service_id references services.id)
            ↓
        reviews (booking_id references service_bookings.id)
```

---

## 📋 Table Descriptions

### 1. **profiles** (Core user table)
Extends Supabase auth with custom fields.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | References auth.users(id) |
| `phone` | VARCHAR(15) | Unique phone number |
| `full_name` | VARCHAR(255) | User's full name |
| `role` | VARCHAR(20) | 'user', 'company', or 'admin' |
| `email` | VARCHAR(255) | Optional email |
| `avatar_url` | TEXT | Profile picture URL |
| `location` | VARCHAR(255) | User location |
| `is_active` | BOOLEAN | Account status |
| `created_at` | TIMESTAMP | Registration time |
| `updated_at` | TIMESTAMP | Last update |

**Key Points:**
- One profile per auth user
- Phone is unique and required
- Admin role auto-assigned via trigger for specific numbers
- RLS: Public read, users can update own profile

---

### 2. **companies** (Company-specific data)
For users with role='company'

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References profiles(id) |
| `company_name` | VARCHAR(255) | Company name |
| `pan_number` | VARCHAR(10) | Unique PAN for verification |
| `pan_verified` | BOOLEAN | PAN verification status |
| `gst_number` | VARCHAR(15) | GST number (optional) |
| `industry` | VARCHAR(100) | Industry type |
| `description` | TEXT | Company description |
| `logo_url` | TEXT | Company logo |
| `address` | TEXT | Full address |
| `is_verified` | BOOLEAN | Admin verified |
| `verification_date` | TIMESTAMP | When verified |

**Key Points:**
- One company per user (if role='company')
- PAN verification for authenticity
- Admin verifies companies manually
- RLS: Public read if verified, companies update own

---

### 3. **user_profiles** (User-specific data)
For users with role='user'

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References profiles(id) |
| `skills` | TEXT[] | Array of skills |
| `experience` | VARCHAR(50) | Work experience |
| `education` | TEXT | Education details |
| `resume_url` | TEXT | Resume file URL |
| `portfolio_url` | TEXT | Portfolio link |
| `bio` | TEXT | User bio |
| `languages` | TEXT[] | Known languages |
| `expected_salary` | VARCHAR(50) | Salary expectation |
| `availability` | VARCHAR(50) | Immediate/Notice period |

**Key Points:**
- Extended profile for job seekers
- Skills stored as PostgreSQL array
- Resume stored in Supabase Storage
- RLS: Public read, users update own

---

### 4. **jobs** (Job listings)
Job postings by companies

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `company_id` | UUID | References companies(id) |
| `title` | VARCHAR(255) | Job title |
| `description` | TEXT | Job description |
| `requirements` | TEXT[] | Requirements array |
| `skills_required` | TEXT[] | Skills needed |
| `job_type` | VARCHAR(50) | Full-time/Part-time/Contract |
| `location` | VARCHAR(255) | Job location |
| `is_remote` | BOOLEAN | Remote work option |
| `salary_min` | DECIMAL(10,2) | Minimum salary |
| `salary_max` | DECIMAL(10,2) | Maximum salary |
| `status` | VARCHAR(20) | pending/approved/declined/flagged/banned |
| `approved_by` | UUID | Admin who approved |
| `approval_date` | TIMESTAMP | When approved |
| `decline_reason` | TEXT | Why declined |
| `views` | INTEGER | View count |
| `applications_count` | INTEGER | Total applications |
| `is_active` | BOOLEAN | Active status |

**Key Points:**
- **Status must be 'approved' to be public**
- Admin approval required before visibility
- Auto-counts applications via trigger
- Views tracked separately
- RLS: Public if approved, company can edit own

**Status Flow:**
```
pending → approved (visible to all)
        → declined (not visible)
        → flagged (hidden, under review)
        → banned (permanently hidden)
```

---

### 5. **services** (Service listings)
Service provider listings

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `provider_id` | UUID | References profiles(id) |
| `title` | VARCHAR(255) | Service title |
| `description` | TEXT | Service description |
| `category` | VARCHAR(100) | Plumber/Electrician/etc |
| `price_type` | VARCHAR(20) | fixed/hourly/negotiable |
| `price` | DECIMAL(10,2) | Service price |
| `location` | VARCHAR(255) | Service area |
| `service_radius` | INTEGER | Coverage in km |
| `images` | TEXT[] | Service images array |
| `experience_years` | INTEGER | Years of experience |
| `status` | VARCHAR(20) | pending/approved/declined/flagged/banned |
| `rating` | DECIMAL(3,2) | Average rating (0-5) |
| `total_reviews` | INTEGER | Review count |
| `is_active` | BOOLEAN | Active status |

**Key Points:**
- **Requires admin approval** like jobs
- Rating auto-calculated from reviews
- Multiple images supported
- Service radius for location filtering
- RLS: Public if approved, provider edits own

---

### 6. **job_applications** (Applications to jobs)
When users apply for jobs

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `job_id` | UUID | References jobs(id) |
| `user_id` | UUID | References profiles(id) |
| `cover_letter` | TEXT | Cover letter |
| `resume_url` | TEXT | Resume link |
| `status` | VARCHAR(20) | applied/reviewed/shortlisted/interview/rejected/accepted |
| `match_score` | INTEGER | AI match score (0-100) |
| `reviewed_by` | UUID | Company reviewer |
| `reviewed_at` | TIMESTAMP | Review time |
| `notes` | TEXT | Company notes |

**Key Points:**
- One application per user per job (UNIQUE constraint)
- Match score can be AI-calculated
- Status tracks application lifecycle
- RLS: Users see own, companies see theirs

**Application Flow:**
```
applied → reviewed → shortlisted → interview → accepted
                                            → rejected
```

---

### 7. **interviews** (Interview scheduling)
Scheduled interviews for candidates

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `application_id` | UUID | References job_applications(id) |
| `company_id` | UUID | References companies(id) |
| `scheduled_date` | DATE | Interview date |
| `scheduled_time` | TIME | Interview time |
| `interview_type` | VARCHAR(50) | In-person/Phone/Video |
| `location` | TEXT | Location (if in-person) |
| `meeting_link` | TEXT | Video call link |
| `duration_minutes` | INTEGER | Interview duration |
| `status` | VARCHAR(20) | scheduled/completed/cancelled |
| `interviewer_notes` | TEXT | Company notes |

**Key Points:**
- Links to application
- Supports multiple interview types
- Meeting link for video interviews
- RLS: Candidate and company can view

---

### 8. **service_bookings** (Service bookings with payment)
When users book services

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `service_id` | UUID | References services(id) |
| `customer_id` | UUID | References profiles(id) |
| `booking_date` | DATE | Service date |
| `booking_time` | TIME | Service time |
| `location` | TEXT | Service location |
| `customer_phone` | VARCHAR(15) | Contact number |
| `status` | VARCHAR(20) | pending/confirmed/in_progress/completed/cancelled |
| `payment_status` | VARCHAR(20) | pending/paid/refunded/failed |
| `payment_method` | VARCHAR(50) | UPI/Card/Cash |
| `razorpay_order_id` | VARCHAR(100) | Razorpay order ID |
| `razorpay_payment_id` | VARCHAR(100) | Razorpay payment ID |
| `amount` | DECIMAL(10,2) | Booking amount |

**Key Points:**
- **Razorpay integration** for payments
- Tracks booking and payment status separately
- RLS: Customer and provider can view

**Booking Flow:**
```
pending → confirmed → in_progress → completed
                                  → cancelled
```

**Payment Flow:**
```
pending → paid → (service completed)
              → refunded (if cancelled)
        → failed (retry payment)
```

---

### 9. **reviews** (Service reviews)
Reviews for completed services

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `booking_id` | UUID | References service_bookings(id) |
| `service_id` | UUID | References services(id) |
| `reviewer_id` | UUID | References profiles(id) |
| `rating` | INTEGER | 1-5 stars |
| `review_text` | TEXT | Review content |
| `images` | TEXT[] | Review images |
| `is_verified` | BOOLEAN | Admin verified |
| `status` | VARCHAR(20) | approved/flagged/banned |

**Key Points:**
- One review per booking (UNIQUE constraint)
- Rating must be 1-5
- Auto-updates service rating via trigger
- Can include images
- RLS: Public if approved

**Review Trigger:**
When review added/updated → service rating recalculated

---

### 10. **admin_actions** (Admin audit log)
Logs all admin moderation actions

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `admin_id` | UUID | References profiles(id) |
| `action_type` | VARCHAR(50) | approve/decline/flag/ban |
| `target_type` | VARCHAR(50) | job/service/review/user |
| `target_id` | UUID | ID of moderated content |
| `reason` | TEXT | Reason for action |
| `metadata` | JSONB | Additional data |
| `created_at` | TIMESTAMP | Action time |

**Key Points:**
- Immutable audit trail
- Tracks all admin actions
- JSONB for flexible metadata
- RLS: Only admins can view

---

### 11. **notifications** (User notifications)
App notifications for users

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References profiles(id) |
| `title` | VARCHAR(255) | Notification title |
| `message` | TEXT | Notification message |
| `type` | VARCHAR(50) | application/booking/approval |
| `reference_type` | VARCHAR(50) | job/service/booking |
| `reference_id` | UUID | Referenced item ID |
| `is_read` | BOOLEAN | Read status |
| `created_at` | TIMESTAMP | Created time |

**Key Points:**
- Real-time notifications
- Can link to specific items
- Mark as read functionality
- RLS: Users see own only

---

### 12. **saved_items** (Bookmarks)
User bookmarks for jobs/services

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | References profiles(id) |
| `item_type` | VARCHAR(20) | 'job' or 'service' |
| `item_id` | UUID | ID of saved item |
| `created_at` | TIMESTAMP | Saved time |

**Key Points:**
- Users can bookmark jobs or services
- UNIQUE constraint prevents duplicates
- RLS: Users manage own bookmarks

---

## 🔒 Row Level Security (RLS)

### Security Model

**Public Content:**
- ✅ Approved jobs viewable by all
- ✅ Approved services viewable by all
- ✅ Approved reviews viewable by all
- ✅ Company profiles (if verified)
- ✅ User profiles

**Private Content:**
- 🔒 Applications (user + company only)
- 🔒 Interviews (candidate + company only)
- 🔒 Bookings (customer + provider only)
- 🔒 Notifications (user only)
- 🔒 Saved items (user only)

**Admin Access:**
- 👑 Admins can view ALL content
- 👑 Admins can moderate (approve/decline/flag/ban)
- 👑 Admin actions are logged

### Sample RLS Policies

**Jobs - Public Read if Approved:**
```sql
CREATE POLICY "Approved jobs viewable by everyone"
ON jobs FOR SELECT
USING (
  status = 'approved' OR 
  company_id IN (SELECT id FROM companies WHERE user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
```

**Applications - User & Company Access:**
```sql
CREATE POLICY "Users can view their own applications"
ON job_applications FOR SELECT
USING (
  user_id = auth.uid() OR
  job_id IN (SELECT id FROM jobs WHERE company_id IN 
    (SELECT id FROM companies WHERE user_id = auth.uid())
  )
);
```

---

## ⚡ Database Functions & Triggers

### Auto Triggers

**1. Admin Role Assignment:**
```sql
-- Auto-assign admin role for specific phones
CREATE TRIGGER assign_admin_role
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION check_admin_phone();
```

**2. Update Ratings:**
```sql
-- Auto-update service rating when review added
CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_service_rating();
```

**3. Update Counts:**
```sql
-- Auto-update job applications count
CREATE TRIGGER update_applications_count
  AFTER INSERT ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_applications_count();
```

**4. Update Timestamps:**
```sql
-- Auto-update updated_at on all tables
CREATE TRIGGER update_[table]_updated_at
  BEFORE UPDATE ON [table]
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Callable Functions

**Increment Views:**
```sql
SELECT increment_job_views('job-uuid-here');
SELECT increment_service_views('service-uuid-here');
```

---

## 📈 Indexes for Performance

**Search Optimization:**
```sql
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_rating ON services(rating DESC);
```

**Relationship Optimization:**
```sql
CREATE INDEX idx_jobs_company ON jobs(company_id);
CREATE INDEX idx_applications_job ON job_applications(job_id);
CREATE INDEX idx_applications_user ON job_applications(user_id);
```

---

## 🎯 Common Workflows

### User Registration Flow
```
1. User signs up with phone OTP
2. OTP verified → auth.users created
3. Profile created in profiles table
4. If role='user' → create user_profile
5. If role='company' → create company record
6. User can now use app
```

### Job Posting Flow
```
1. Company posts job → status='pending'
2. Admin reviews job
3. Admin approves → status='approved', visible to all
   OR Admin declines → status='declined', not visible
   OR Admin flags → status='flagged', under review
4. Users can apply if approved
5. Company reviews applications
6. Company shortlists candidates
7. Company schedules interviews
```

### Service Booking Flow
```
1. User finds service
2. User books service → status='pending', payment='pending'
3. Razorpay payment → payment='paid'
4. Provider confirms → status='confirmed'
5. Service completed → status='completed'
6. User leaves review → rating updated
```

### Admin Moderation Flow
```
1. Content created → status='pending'
2. Admin views pending queue
3. Admin takes action:
   - Approve → visible to public
   - Decline → not visible, reason given
   - Flag → hidden, needs more review
   - Ban → permanently hidden
4. Action logged in admin_actions
5. Notification sent to content creator
```

---

## 🛠️ Maintenance

### Backup Strategy
- Supabase provides automatic backups
- Manual backups via SQL dump
- Point-in-time recovery available

### Data Retention
- Active data kept indefinitely
- Deleted users: soft delete (is_active=false)
- Old applications: archive after 1 year
- Audit logs: retain forever

### Performance Monitoring
- Monitor via Supabase Dashboard
- Check slow queries
- Optimize indexes if needed
- Scale database as needed

---

## 📚 Additional Resources

- **Supabase Docs**: https://supabase.com/docs/guides/database
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security

---

**Database Schema Version**: 1.0  
**Last Updated**: November 2024  
**Schema File**: `supabase-schema.sql`
