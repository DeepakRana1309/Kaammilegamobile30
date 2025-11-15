import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types for database tables
export interface Profile {
  id: string;
  phone: string;
  full_name: string;
  role: 'user' | 'company' | 'admin';
  email?: string;
  avatar_url?: string;
  location?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  company_name: string;
  pan_number: string;
  pan_verified: boolean;
  gst_number?: string;
  company_type?: string;
  industry?: string;
  company_size?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  is_verified: boolean;
  verification_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  requirements?: string[];
  skills_required?: string[];
  experience_required?: string;
  job_type: string;
  location: string;
  is_remote: boolean;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  positions_available: number;
  status: 'pending' | 'approved' | 'declined' | 'flagged' | 'banned';
  approved_by?: string;
  approval_date?: string;
  decline_reason?: string;
  views: number;
  applications_count: number;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  category: string;
  sub_category?: string;
  price_type: 'fixed' | 'hourly' | 'negotiable';
  price?: number;
  location: string;
  service_radius?: number;
  availability?: string[];
  images?: string[];
  certifications?: string[];
  experience_years?: number;
  status: 'pending' | 'approved' | 'declined' | 'flagged' | 'banned';
  approved_by?: string;
  approval_date?: string;
  decline_reason?: string;
  views: number;
  bookings_count: number;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  cover_letter?: string;
  resume_url?: string;
  status: 'applied' | 'reviewed' | 'shortlisted' | 'interview' | 'rejected' | 'accepted';
  match_score?: number;
  reviewed_by?: string;
  reviewed_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceBooking {
  id: string;
  service_id: string;
  customer_id: string;
  booking_date: string;
  booking_time?: string;
  location: string;
  customer_phone: string;
  description?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  payment_method?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount: number;
  confirmed_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
}

// Helper functions

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<Profile | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
};

/**
 * Check if user is admin
 */
export const isAdmin = async (): Promise<boolean> => {
  const profile = await getCurrentUser();
  return profile?.role === 'admin';
};

/**
 * Check if user is company
 */
export const isCompany = async (): Promise<boolean> => {
  const profile = await getCurrentUser();
  return profile?.role === 'company';
};

/**
 * Sign in with phone OTP
 */
export const signInWithPhone = async (phone: string, fullName?: string, role: 'user' | 'company' = 'user') => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });

  return { data, error };
};

/**
 * Verify OTP
 */
export const verifyOTP = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  });

  if (data.user && !error) {
    // Check if profile exists, create if not
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', data.user.id)
      .single();

    if (!existingProfile) {
      // Create profile
      await supabase.from('profiles').insert({
        id: data.user.id,
        phone: phone,
        full_name: data.user.user_metadata.full_name || 'User',
        role: data.user.user_metadata.role || 'user'
      });
    }
  }

  return { data, error };
};

/**
 * Sign out
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Get approved jobs with company details
 */
export const getApprovedJobs = async (filters?: {
  location?: string;
  jobType?: string;
  limit?: number;
}) => {
  let query = supabase
    .from('jobs')
    .select(`
      *,
      companies (
        company_name,
        logo_url,
        city,
        state
      )
    `)
    .eq('status', 'approved')
    .eq('is_active', true);

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  if (filters?.jobType) {
    query = query.eq('job_type', filters.jobType);
  }

  query = query
    .order('created_at', { ascending: false })
    .limit(filters?.limit || 50);

  const { data, error } = await query;
  return { data, error };
};

/**
 * Get approved services with provider details
 */
export const getApprovedServices = async (filters?: {
  category?: string;
  location?: string;
  limit?: number;
}) => {
  let query = supabase
    .from('services')
    .select(`
      *,
      profiles (
        full_name,
        avatar_url,
        location
      )
    `)
    .eq('status', 'approved')
    .eq('is_active', true);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  query = query
    .order('rating', { ascending: false })
    .limit(filters?.limit || 50);

  const { data, error } = await query;
  return { data, error };
};

/**
 * Apply for a job
 */
export const applyForJob = async (
  jobId: string,
  userId: string,
  coverLetter?: string,
  resumeUrl?: string,
  matchScore?: number
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert({
      job_id: jobId,
      user_id: userId,
      cover_letter: coverLetter,
      resume_url: resumeUrl,
      match_score: matchScore,
      status: 'applied'
    })
    .select()
    .single();

  return { data, error };
};

/**
 * Book a service
 */
export const bookService = async (booking: Partial<ServiceBooking>) => {
  const { data, error } = await supabase
    .from('service_bookings')
    .insert(booking)
    .select()
    .single();

  return { data, error };
};

/**
 * Increment job views
 */
export const incrementJobViews = async (jobId: string) => {
  const { error } = await supabase.rpc('increment_job_views', {
    job_uuid: jobId
  });
  return { error };
};

/**
 * Increment service views
 */
export const incrementServiceViews = async (serviceId: string) => {
  const { error } = await supabase.rpc('increment_service_views', {
    service_uuid: serviceId
  });
  return { error };
};

/**
 * Get user's job applications
 */
export const getUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select(`
      *,
      jobs (
        title,
        location,
        job_type,
        companies (
          company_name,
          logo_url
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Get company's job listings
 */
export const getCompanyJobs = async (companyId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Get applications for a job
 */
export const getJobApplications = async (jobId: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select(`
      *,
      profiles (
        full_name,
        email,
        location,
        avatar_url
      ),
      user_profiles (
        skills,
        experience,
        resume_url
      )
    `)
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Update application status (for companies)
 */
export const updateApplicationStatus = async (
  applicationId: string,
  status: JobApplication['status'],
  reviewedBy?: string,
  notes?: string
) => {
  const { data, error } = await supabase
    .from('job_applications')
    .update({
      status,
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
      notes
    })
    .eq('id', applicationId)
    .select()
    .single();

  return { data, error };
};

/**
 * Admin: Approve/Decline/Flag content
 */
export const adminModerateContent = async (
  contentType: 'job' | 'service' | 'review',
  contentId: string,
  action: 'approved' | 'declined' | 'flagged' | 'banned',
  adminId: string,
  reason?: string
) => {
  const tableName = contentType === 'job' ? 'jobs' : contentType === 'service' ? 'services' : 'reviews';

  // Update content status
  const { data, error } = await supabase
    .from(tableName)
    .update({
      status: action,
      approved_by: action === 'approved' ? adminId : undefined,
      approval_date: action === 'approved' ? new Date().toISOString() : undefined,
      decline_reason: action === 'declined' ? reason : undefined
    })
    .eq('id', contentId)
    .select()
    .single();

  // Log admin action
  if (!error) {
    await supabase.from('admin_actions').insert({
      admin_id: adminId,
      action_type: action,
      target_type: contentType,
      target_id: contentId,
      reason
    });
  }

  return { data, error };
};

/**
 * Get pending content for admin review
 */
export const getPendingContent = async (contentType: 'job' | 'service') => {
  const tableName = contentType === 'job' ? 'jobs' : 'services';
  
  const { data, error } = await supabase
    .from(tableName)
    .select(`
      *,
      ${contentType === 'job' ? 'companies (company_name, logo_url)' : 'profiles (full_name, avatar_url)'}
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  return { data, error };
};

/**
 * Create notification
 */
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: string,
  referenceType?: string,
  referenceId?: string
) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title,
      message,
      type,
      reference_type: referenceType,
      reference_id: referenceId
    })
    .select()
    .single();

  return { data, error };
};

/**
 * Get user notifications
 */
export const getUserNotifications = async (userId: string, unreadOnly: boolean = false) => {
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId);

  if (unreadOnly) {
    query = query.eq('is_read', false);
  }

  query = query.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await query;
  return { data, error };
};

/**
 * Mark notification as read
 */
export const markNotificationRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  return { error };
};

/**
 * Save/Unsave item (bookmark)
 */
export const toggleSaveItem = async (
  userId: string,
  itemType: 'job' | 'service',
  itemId: string
) => {
  // Check if already saved
  const { data: existing } = await supabase
    .from('saved_items')
    .select('id')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .single();

  if (existing) {
    // Remove bookmark
    const { error } = await supabase
      .from('saved_items')
      .delete()
      .eq('id', existing.id);
    return { saved: false, error };
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('saved_items')
      .insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId
      });
    return { saved: true, error };
  }
};

/**
 * Get user's saved items
 */
export const getSavedItems = async (userId: string, itemType?: 'job' | 'service') => {
  let query = supabase
    .from('saved_items')
    .select('*')
    .eq('user_id', userId);

  if (itemType) {
    query = query.eq('item_type', itemType);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  return { data, error };
};

export default supabase;
