-- ============================================
-- KAAM MILEGA - SUPABASE DATABASE SCHEMA
-- ============================================
-- Multi-role authentication system with admin approval workflow
-- Roles: user, company, admin
-- Admin phone numbers: 7527996150, 8847602134, 7986035551

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (Extended user data)
-- ============================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'company', 'admin')),
    email VARCHAR(255),
    avatar_url TEXT,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-assign admin role for specific phone numbers
CREATE OR REPLACE FUNCTION public.check_admin_phone()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.phone IN ('7527996150', '8847602134', '7986035551') THEN
        NEW.role := 'admin';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_admin_role
    BEFORE INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.check_admin_phone();

-- ============================================
-- COMPANIES TABLE (Company-specific data)
-- ============================================
CREATE TABLE public.companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    pan_number VARCHAR(10) UNIQUE NOT NULL,
    pan_verified BOOLEAN DEFAULT false,
    gst_number VARCHAR(15),
    company_type VARCHAR(100),
    industry VARCHAR(100),
    company_size VARCHAR(50),
    website VARCHAR(255),
    description TEXT,
    logo_url TEXT,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER PROFILES TABLE (User-specific data)
-- ============================================
CREATE TABLE public.user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    skills TEXT[], -- Array of skills
    experience VARCHAR(50),
    education TEXT,
    resume_url TEXT,
    portfolio_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    languages TEXT[], -- Array of languages
    preferred_location VARCHAR(255),
    expected_salary VARCHAR(50),
    availability VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- JOBS TABLE (Job listings with admin approval)
-- ============================================
CREATE TABLE public.jobs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    skills_required TEXT[],
    experience_required VARCHAR(50),
    job_type VARCHAR(50) NOT NULL, -- Full-time, Part-time, Contract, Internship
    location VARCHAR(255) NOT NULL,
    is_remote BOOLEAN DEFAULT false,
    salary_min DECIMAL(10, 2),
    salary_max DECIMAL(10, 2),
    salary_currency VARCHAR(10) DEFAULT 'INR',
    positions_available INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'flagged', 'banned')),
    approved_by UUID REFERENCES public.profiles(id),
    approval_date TIMESTAMP WITH TIME ZONE,
    decline_reason TEXT,
    views INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_company ON public.jobs(company_id);
CREATE INDEX idx_jobs_location ON public.jobs(location);

-- ============================================
-- SERVICES TABLE (Service listings with admin approval)
-- ============================================
CREATE TABLE public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- Plumber, Electrician, Carpenter, etc.
    sub_category VARCHAR(100),
    price_type VARCHAR(20) CHECK (price_type IN ('fixed', 'hourly', 'negotiable')),
    price DECIMAL(10, 2),
    location VARCHAR(255) NOT NULL,
    service_radius INTEGER, -- in kilometers
    availability TEXT[],
    images TEXT[], -- Array of image URLs
    certifications TEXT[],
    experience_years INTEGER,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'flagged', 'banned')),
    approved_by UUID REFERENCES public.profiles(id),
    approval_date TIMESTAMP WITH TIME ZONE,
    decline_reason TEXT,
    views INTEGER DEFAULT 0,
    bookings_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_services_status ON public.services(status);
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_services_provider ON public.services(provider_id);

-- ============================================
-- JOB APPLICATIONS TABLE
-- ============================================
CREATE TABLE public.job_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    cover_letter TEXT,
    resume_url TEXT,
    status VARCHAR(20) DEFAULT 'applied' CHECK (status IN ('applied', 'reviewed', 'shortlisted', 'interview', 'rejected', 'accepted')),
    match_score INTEGER, -- AI-calculated match score (0-100)
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT, -- Company notes about candidate
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, user_id) -- Prevent duplicate applications
);

-- Index for faster queries
CREATE INDEX idx_applications_job ON public.job_applications(job_id);
CREATE INDEX idx_applications_user ON public.job_applications(user_id);
CREATE INDEX idx_applications_status ON public.job_applications(status);

-- ============================================
-- INTERVIEWS TABLE
-- ============================================
CREATE TABLE public.interviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    application_id UUID REFERENCES public.job_applications(id) ON DELETE CASCADE NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    interview_type VARCHAR(50) NOT NULL, -- In-person, Phone, Video Call
    location TEXT,
    meeting_link TEXT,
    duration_minutes INTEGER DEFAULT 60,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    interviewer_notes TEXT,
    candidate_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SERVICE BOOKINGS TABLE
-- ============================================
CREATE TABLE public.service_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME,
    location TEXT NOT NULL,
    customer_phone VARCHAR(15) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(50), -- UPI, Card, Cash, etc.
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_bookings_service ON public.service_bookings(service_id);
CREATE INDEX idx_bookings_customer ON public.service_bookings(customer_id);
CREATE INDEX idx_bookings_status ON public.service_bookings(status);

-- ============================================
-- REVIEWS TABLE (For services)
-- ============================================
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES public.service_bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    images TEXT[], -- Array of image URLs
    is_verified BOOLEAN DEFAULT false, -- Verified by admin
    status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged', 'banned')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update service rating when new review is added
CREATE OR REPLACE FUNCTION update_service_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.services
    SET 
        rating = (
            SELECT AVG(rating)::DECIMAL(3,2)
            FROM public.reviews
            WHERE service_id = NEW.service_id AND status = 'approved'
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE service_id = NEW.service_id AND status = 'approved'
        )
    WHERE id = NEW.service_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_on_review
    AFTER INSERT OR UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_service_rating();

-- ============================================
-- ADMIN ACTIONS TABLE (Audit log)
-- ============================================
CREATE TABLE public.admin_actions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- approve, decline, flag, ban, unflag, unban
    target_type VARCHAR(50) NOT NULL, -- job, service, review, user
    target_id UUID NOT NULL,
    reason TEXT,
    metadata JSONB, -- Additional data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for audit queries
CREATE INDEX idx_admin_actions_admin ON public.admin_actions(admin_id);
CREATE INDEX idx_admin_actions_target ON public.admin_actions(target_type, target_id);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- application, booking, approval, message, etc.
    reference_type VARCHAR(50), -- job, service, booking, etc.
    reference_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read);

-- ============================================
-- SAVED ITEMS TABLE (Bookmarks)
-- ============================================
CREATE TABLE public.saved_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('job', 'service')),
    item_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read all, update only their own
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- COMPANIES: Public read for verified, companies can manage their own
CREATE POLICY "Verified companies are viewable by everyone"
    ON public.companies FOR SELECT
    USING (is_verified = true OR user_id = auth.uid());

CREATE POLICY "Companies can insert their own data"
    ON public.companies FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Companies can update their own data"
    ON public.companies FOR UPDATE
    USING (user_id = auth.uid());

-- USER PROFILES: Users can read all, update only their own
CREATE POLICY "User profiles are viewable by everyone"
    ON public.user_profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (user_id = auth.uid());

-- JOBS: Public can read approved, companies can manage their own
CREATE POLICY "Approved jobs are viewable by everyone"
    ON public.jobs FOR SELECT
    USING (
        status = 'approved' OR 
        company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Companies can insert jobs"
    ON public.jobs FOR INSERT
    WITH CHECK (
        company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid())
    );

CREATE POLICY "Companies can update their own jobs"
    ON public.jobs FOR UPDATE
    USING (
        company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- SERVICES: Public can read approved, providers can manage their own
CREATE POLICY "Approved services are viewable by everyone"
    ON public.services FOR SELECT
    USING (
        status = 'approved' OR 
        provider_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Users can insert services"
    ON public.services FOR INSERT
    WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can update their own services"
    ON public.services FOR UPDATE
    USING (
        provider_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- JOB APPLICATIONS: Users can view their own, companies can view applications to their jobs
CREATE POLICY "Users can view their own applications"
    ON public.job_applications FOR SELECT
    USING (
        user_id = auth.uid() OR
        job_id IN (SELECT id FROM public.jobs WHERE company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()))
    );

CREATE POLICY "Users can submit applications"
    ON public.job_applications FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Companies can update applications to their jobs"
    ON public.job_applications FOR UPDATE
    USING (
        job_id IN (SELECT id FROM public.jobs WHERE company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()))
    );

-- INTERVIEWS: Visible to candidate and company
CREATE POLICY "Interviews viewable by involved parties"
    ON public.interviews FOR SELECT
    USING (
        company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()) OR
        application_id IN (SELECT id FROM public.job_applications WHERE user_id = auth.uid())
    );

CREATE POLICY "Companies can manage interviews"
    ON public.interviews FOR ALL
    USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- SERVICE BOOKINGS: Visible to customer and provider
CREATE POLICY "Bookings viewable by involved parties"
    ON public.service_bookings FOR SELECT
    USING (
        customer_id = auth.uid() OR
        service_id IN (SELECT id FROM public.services WHERE provider_id = auth.uid())
    );

CREATE POLICY "Customers can create bookings"
    ON public.service_bookings FOR INSERT
    WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Involved parties can update bookings"
    ON public.service_bookings FOR UPDATE
    USING (
        customer_id = auth.uid() OR
        service_id IN (SELECT id FROM public.services WHERE provider_id = auth.uid())
    );

-- REVIEWS: Public can read approved reviews
CREATE POLICY "Approved reviews are viewable by everyone"
    ON public.reviews FOR SELECT
    USING (status = 'approved');

CREATE POLICY "Customers can submit reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (reviewer_id = auth.uid());

-- ADMIN ACTIONS: Only admins can view/create
CREATE POLICY "Admins can view all actions"
    ON public.admin_actions FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can create actions"
    ON public.admin_actions FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- NOTIFICATIONS: Users can view their own
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
    ON public.notifications FOR UPDATE
    USING (user_id = auth.uid());

-- SAVED ITEMS: Users can manage their own
CREATE POLICY "Users can view own saved items"
    ON public.saved_items FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage saved items"
    ON public.saved_items FOR ALL
    USING (user_id = auth.uid());

-- ============================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- ============================================

-- Increment job views
CREATE OR REPLACE FUNCTION increment_job_views(job_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.jobs
    SET views = views + 1
    WHERE id = job_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment service views
CREATE OR REPLACE FUNCTION increment_service_views(service_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.services
    SET views = views + 1
    WHERE id = service_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update job applications count
CREATE OR REPLACE FUNCTION update_job_applications_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.jobs
    SET applications_count = (
        SELECT COUNT(*) FROM public.job_applications WHERE job_id = NEW.job_id
    )
    WHERE id = NEW.job_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_count
    AFTER INSERT ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_job_applications_count();

-- Update service bookings count
CREATE OR REPLACE FUNCTION update_service_bookings_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.services
    SET bookings_count = (
        SELECT COUNT(*) FROM public.service_bookings WHERE service_id = NEW.service_id
    )
    WHERE id = NEW.service_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_count
    AFTER INSERT ON public.service_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_service_bookings_count();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample admin (will be automatically assigned admin role)
-- Note: You need to create this user in Supabase Auth first
-- INSERT INTO public.profiles (id, phone, full_name, role, email)
-- VALUES (
--     'your-auth-user-id-here',
--     '7527996150',
--     'Admin User',
--     'admin',
--     'admin@kaam-milega.com'
-- );

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_profiles_phone ON public.profiles(phone);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_companies_pan ON public.companies(pan_number);
CREATE INDEX idx_jobs_created ON public.jobs(created_at DESC);
CREATE INDEX idx_services_created ON public.services(created_at DESC);
CREATE INDEX idx_services_rating ON public.services(rating DESC);

-- ============================================
-- END OF SCHEMA
-- ============================================
