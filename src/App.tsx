import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { PANVerificationScreen } from './components/PANVerificationScreen';
import { InstantVerificationScreen } from './components/InstantVerificationScreen';
import { VerificationPendingScreen } from './components/VerificationPendingScreen';
import { HomeScreen } from './components/HomeScreen';
import { MapScreen } from './components/MapScreen';
import { JobListingScreen } from './components/JobListingScreen';
import { JobDetailScreen } from './components/JobDetailScreen';
import { PostJobScreen } from './components/PostJobScreen';
import { ServiceProviderDashboard } from './components/ServiceProviderDashboard';
import { ProfileScreen } from './components/ProfileScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SidebarMenu } from './components/SidebarMenu';
import { PaymentMethodsScreen } from './components/PaymentMethodsScreen';
import { MyApplicationsScreen } from './components/MyApplicationsScreen';
import { HelpSupportScreen } from './components/HelpSupportScreen';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { ServicesPage } from './components/ServicesPage';
import { CompanyProfileSetup, CompanyProfile } from './components/CompanyProfileSetup';
import { CompanyDashboard } from './components/CompanyDashboard';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'job-seeker' | 'company' | 'service-provider' | 'customer' | null;

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  postedDate: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  distance: string;
  price: string;
  lat: number;
  lng: number;
  isOnline: boolean;
}

type ScreenType = 
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'role-selection'
  | 'pan-verification'
  | 'instant-verification'
  | 'company-profile-setup'
  | 'home'
  | 'company-dashboard'
  | 'map'
  | 'job-listing'
  | 'job-detail'
  | 'post-job'
  | 'service-dashboard'
  | 'profile'
  | 'notifications'
  | 'edit-profile'
  | 'settings'
  | 'payment-methods'
  | 'my-applications'
  | 'help-support'
  | 'admin-dashboard'
  | 'services';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    // Splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentScreen('auth');
  };

  const handleAuthComplete = (name: string, adminFlag?: boolean) => {
    setUserName(name);
    setIsAuthenticated(true);
    if (adminFlag) {
      setIsAdmin(true);
    }
    setCurrentScreen('role-selection');
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsAuthenticated(true);
    setUserName('Admin');
    setCurrentScreen('admin-dashboard');
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    // After role selection, require PAN verification
    setCurrentScreen('pan-verification');
  };

  const handlePANSubmit = () => {
    // After PAN submission, show instant verification
    setCurrentScreen('instant-verification');
  };

  const handleInstantVerification = (approved: boolean) => {
    if (approved) {
      setIsVerified(true);
      if (userRole === 'service-provider') {
        setCurrentScreen('service-dashboard');
      } else if (userRole === 'company') {
        setCurrentScreen('company-profile-setup');
      } else {
        setCurrentScreen('home');
      }
    } else {
      // If rejected, go back to PAN verification
      setCurrentScreen('pan-verification');
    }
  };

  const handleAdminApprove = () => {
    // Simulate admin approval
    setIsVerified(true);
    if (userRole === 'service-provider') {
      setCurrentScreen('service-dashboard');
    } else if (userRole === 'company') {
      // Companies need to set up their profile first
      setCurrentScreen('company-profile-setup');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleCompanyProfileComplete = (profileData: CompanyProfile) => {
    setCompanyProfile(profileData);
    setCurrentScreen('company-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsVerified(false);
    setUserRole(null);
    setUserName('');
    setIsAdmin(false);
    setCompanyProfile(null);
    setCurrentScreen('auth');
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'sidebar') {
      setIsSidebarOpen(true);
    } else {
      setCurrentScreen(screen as ScreenType);
    }
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setCurrentScreen('job-detail');
  };

  const handleBack = () => {
    if (currentScreen === 'job-detail' || currentScreen === 'map' || currentScreen === 'services') {
      if (userRole === 'company') {
        setCurrentScreen('company-dashboard');
      } else {
        setCurrentScreen('home');
      }
    } else if (currentScreen === 'post-job') {
      if (userRole === 'company') {
        setCurrentScreen('company-dashboard');
      } else {
        setCurrentScreen('home');
      }
    } else if (currentScreen === 'profile') {
      if (userRole === 'service-provider') {
        setCurrentScreen('service-dashboard');
      } else if (userRole === 'company') {
        setCurrentScreen('company-dashboard');
      } else {
        setCurrentScreen('home');
      }
    } else if (currentScreen === 'notifications') {
      if (userRole === 'service-provider') {
        setCurrentScreen('service-dashboard');
      } else if (userRole === 'company') {
        setCurrentScreen('company-dashboard');
      } else {
        setCurrentScreen('home');
      }
    } else if (currentScreen === 'edit-profile' || currentScreen === 'settings' || currentScreen === 'payment-methods' || currentScreen === 'my-applications' || currentScreen === 'help-support') {
      setCurrentScreen('profile');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0A0F1C]">
      <Toaster position="top-center" />
      {/* Mobile Container */}
      <div className="mx-auto max-w-[390px] h-full relative">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}
        {currentScreen === 'auth' && (
          <AuthScreen 
            onComplete={handleAuthComplete}
            onAdminLogin={handleAdminLogin}
          />
        )}
        {currentScreen === 'role-selection' && (
          <RoleSelectionScreen onRoleSelect={handleRoleSelect} />
        )}
        {currentScreen === 'pan-verification' && (
          <PANVerificationScreen 
            userName={userName}
            onSubmit={handlePANSubmit}
            onBack={() => setCurrentScreen('role-selection')}
          />
        )}
        {currentScreen === 'instant-verification' && (
          <InstantVerificationScreen 
            userName={userName}
            onVerificationComplete={handleInstantVerification}
          />
        )}
        {currentScreen === 'verification-pending' && (
          <VerificationPendingScreen 
            userName={userName}
            onLogout={handleLogout}
            onApprove={handleAdminApprove}
          />
        )}
        {currentScreen === 'company-profile-setup' && (
          <CompanyProfileSetup
            userName={userName}
            onComplete={handleCompanyProfileComplete}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen
            userRole={userRole}
            userName={userName}
            onNavigate={handleNavigate}
            onJobSelect={handleJobSelect}
          />
        )}
        {currentScreen === 'company-dashboard' && companyProfile && (
          <CompanyDashboard
            userName={userName}
            companyName={companyProfile.companyName}
            onNavigate={handleNavigate}
            onJobSelect={handleJobSelect}
          />
        )}
        {currentScreen === 'map' && (
          <MapScreen onBack={handleBack} />
        )}
        {currentScreen === 'job-listing' && (
          <JobListingScreen onJobSelect={handleJobSelect} onBack={handleBack} />
        )}
        {currentScreen === 'job-detail' && selectedJob && (
          <JobDetailScreen job={selectedJob} onBack={handleBack} userRole={userRole} />
        )}
        {currentScreen === 'post-job' && (
          <PostJobScreen onBack={handleBack} />
        )}
        {currentScreen === 'service-dashboard' && (
          <ServiceProviderDashboard
            userName={userName}
            onNavigate={handleNavigate}
          />
        )}
        {currentScreen === 'services' && (
          <ServicesPage
            onProfileClick={() => setCurrentScreen('profile')}
            onWalletClick={() => alert('Wallet - Coming Soon!')}
            onBack={handleBack}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen
            userName={userName}
            userRole={userRole}
            onBack={handleBack}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'notifications' && (
          <NotificationsScreen onBack={handleBack} />
        )}
        {currentScreen === 'edit-profile' && (
          <EditProfileScreen 
            userName={userName}
            onBack={handleBack}
          />
        )}
        {currentScreen === 'settings' && (
          <SettingsScreen onBack={handleBack} />
        )}
        {currentScreen === 'payment-methods' && (
          <PaymentMethodsScreen onBack={handleBack} />
        )}
        {currentScreen === 'my-applications' && (
          <MyApplicationsScreen onBack={handleBack} />
        )}
        {currentScreen === 'help-support' && (
          <HelpSupportScreen onBack={handleBack} />
        )}
        {currentScreen === 'admin-dashboard' && (
          <AdminDashboardScreen onLogout={handleLogout} />
        )}

        {/* Sidebar Menu */}
        <SidebarMenu 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onProfileClick={() => {
            setIsSidebarOpen(false);
            setCurrentScreen('profile');
          }}
          onWalletClick={() => {
            setIsSidebarOpen(false);
            alert('Wallet - Coming Soon!');
          }}
        />
      </div>
    </div>
  );
}

export default App;