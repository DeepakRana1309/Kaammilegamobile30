import { useState } from 'react';
import { JobsPage } from './components/JobsPage';
import { ServicesPage } from './components/ServicesPage';
import { HotelStaysPage } from './components/HotelStaysPage';
import { HelpPage } from './components/HelpPage';
import { JobDetailsPage } from './components/JobDetailsPage';
import { ApplyNowPage } from './components/ApplyNowPage';
import { ProfilePage } from './components/ProfilePage';
import { WalletPage } from './components/WalletPage';
import { SidebarMenu } from './components/SidebarMenu';
import { ChatWithUsPage } from './components/ChatWithUsPage';
import { FAQPage } from './components/FAQPage';
import { ContactUsPage } from './components/ContactUsPage';
import { GiveFeedbackPage } from './components/GiveFeedbackPage';
import { GettingStartedPage } from './components/GettingStartedPage';
import { AccountPrivacyPage } from './components/AccountPrivacyPage';
import { ReportIssuePage } from './components/ReportIssuePage';
import { EmailSupportPage } from './components/EmailSupportPage';
import { PremiumPlansPage } from './components/PremiumPlansPage';
import { PremiumPaymentPage } from './components/PremiumPaymentPage';
import { PremiumPaymentsManagePage } from './components/PremiumPaymentsManagePage';
import { LocationPermissionScreen } from './components/LocationPermissionScreen';
import { LoginTypeSelector } from './components/LoginTypeSelector';
import { UserLoginPage } from './components/UserLoginPage';
import { CompanyLoginPage } from './components/CompanyLoginPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { Briefcase, Wrench, Hotel, HelpCircle } from 'lucide-react';

type ViewType = 'main' | 'jobDetails' | 'apply' | 'profile' | 'wallet' | 
  'chat' | 'faq' | 'contact' | 'feedback' | 'getting-started' | 
  'account-privacy' | 'report-issue' | 'email-support' | 'premium' | 'premium-payment' | 'premium-manage';

type AuthState = 'location' | 'loginType' | 'userLogin' | 'companyLogin' | 'adminLogin' | 'authenticated';
type UserRole = 'user' | 'company' | 'admin' | null;

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('location');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [companyName, setCompanyName] = useState('');
  const [activeTab, setActiveTab] = useState<'jobs' | 'services' | 'hotels' | 'help'>('jobs');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPremiumPlan, setSelectedPremiumPlan] = useState<{ name: string; price: string } | null>(null);

  // Authentication handlers
  const handleLocationPermissionGranted = () => {
    setAuthState('loginType');
  };

  const handleLoginTypeSelect = (type: 'user' | 'company' | 'admin') => {
    if (type === 'user') {
      setAuthState('userLogin');
    } else if (type === 'company') {
      setAuthState('companyLogin');
    } else {
      setAuthState('adminLogin');
    }
  };

  const handleUserLogin = () => {
    setUserRole('user');
    setAuthState('authenticated');
  };

  const handleCompanyLogin = (name: string) => {
    setUserRole('company');
    setCompanyName(name);
    setAuthState('authenticated');
  };

  const handleAdminLogin = () => {
    setUserRole('admin');
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCompanyName('');
    setAuthState('loginType');
    setCurrentView('main');
  };

  const handleBackToLoginType = () => {
    setAuthState('loginType');
  };

  // Navigation handlers
  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setCurrentView('jobDetails');
  };

  const handleApplyClick = () => {
    setCurrentView('apply');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedJob(null);
  };

  const handleBackToJobDetails = () => {
    setCurrentView('jobDetails');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
    setSidebarOpen(false);
  };

  const handleWalletClick = () => {
    setCurrentView('wallet');
    setSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleHelpNavigate = (page: string) => {
    setCurrentView(page as ViewType);
  };

  const handlePremiumClick = () => {
    setCurrentView('premium');
  };

  const handlePremiumPlanSelect = (planId: 'A' | 'B' | 'C', planDetails: { name: string; price: string }) => {
    setSelectedPremiumPlan(planDetails);
    setCurrentView('premium-payment');
  };

  const handlePaymentSuccess = () => {
    // Payment successful, redirect to main dashboard
    setCurrentView('main');
    setSelectedPremiumPlan(null);
    // You can also show a success toast/notification here
    console.log('Premium subscription activated!');
  };

  const handlePremiumManageClick = () => {
    setCurrentView('premium-manage');
  };

  // Render authentication screens
  if (authState === 'location') {
    return <LocationPermissionScreen onPermissionGranted={handleLocationPermissionGranted} />;
  }

  if (authState === 'loginType') {
    return <LoginTypeSelector onSelectType={handleLoginTypeSelect} />;
  }

  if (authState === 'userLogin') {
    return <UserLoginPage onLogin={handleUserLogin} onBack={handleBackToLoginType} />;
  }

  if (authState === 'companyLogin') {
    return <CompanyLoginPage onLogin={handleCompanyLogin} onBack={handleBackToLoginType} />;
  }

  if (authState === 'adminLogin') {
    return <AdminLoginPage onLogin={handleAdminLogin} onBack={handleBackToLoginType} />;
  }

  // Render dashboards based on user role
  if (authState === 'authenticated') {
    if (userRole === 'admin') {
      return (
        <div className="h-screen w-screen bg-[#0A0F1C] overflow-hidden">
          <AdminDashboard onLogout={handleLogout} />
        </div>
      );
    }

    if (userRole === 'company') {
      return (
        <div className="h-screen w-screen bg-[#0A0F1C] overflow-hidden">
          <CompanyDashboard onLogout={handleLogout} companyName={companyName} />
        </div>
      );
    }

    // User role - render main app
    const renderView = () => {
      if (currentView === 'profile') {
        return <ProfilePage onBack={handleBackToMain} onPremiumManageClick={handlePremiumManageClick} />;
      }
      
      if (currentView === 'wallet') {
        return <WalletPage onBack={handleBackToMain} />;
      }

      if (currentView === 'chat') {
        return <ChatWithUsPage onBack={handleBackToMain} />;
      }

      if (currentView === 'faq') {
        return <FAQPage onBack={handleBackToMain} />;
      }

      if (currentView === 'contact') {
        return <ContactUsPage onBack={handleBackToMain} />;
      }

      if (currentView === 'feedback') {
        return <GiveFeedbackPage onBack={handleBackToMain} />;
      }

      if (currentView === 'getting-started') {
        return <GettingStartedPage onBack={handleBackToMain} />;
      }

      if (currentView === 'account-privacy') {
        return <AccountPrivacyPage onBack={handleBackToMain} />;
      }

      if (currentView === 'report-issue') {
        return <ReportIssuePage onBack={handleBackToMain} />;
      }

      if (currentView === 'email-support') {
        return <EmailSupportPage onBack={handleBackToMain} />;
      }
      
      if (currentView === 'premium') {
        return <PremiumPlansPage onBack={handleBackToMain} onSelectPlan={handlePremiumPlanSelect} />;
      }
      
      if (currentView === 'premium-payment' && selectedPremiumPlan) {
        return (
          <PremiumPaymentPage 
            onBack={() => setCurrentView('premium')} 
            onPaymentSuccess={handlePaymentSuccess}
            planDetails={selectedPremiumPlan} 
          />
        );
      }
      
      if (currentView === 'premium-manage') {
        return <PremiumPaymentsManagePage onBack={handleBackToMain} onUpgrade={handlePremiumClick} />;
      }
      
      if (currentView === 'apply' && selectedJob) {
        return (
          <ApplyNowPage 
            job={selectedJob} 
            onBack={handleBackToJobDetails} 
          />
        );
      }
      
      if (currentView === 'jobDetails' && selectedJob) {
        return (
          <JobDetailsPage 
            job={selectedJob} 
            onBack={handleBackToMain}
            onApplyClick={handleApplyClick}
          />
        );
      }
      
      // Main view with tabs
      return (
        <>
          {activeTab === 'jobs' && (
            <JobsPage 
              onJobClick={handleJobClick} 
              onProfileClick={handleProfileClick}
              onPremiumClick={handlePremiumClick}
            />
          )}
          {activeTab === 'services' && (
            <ServicesPage 
              onProfileClick={handleProfileClick} 
              onWalletClick={handleWalletClick} 
            />
          )}
          {activeTab === 'hotels' && (
            <HotelStaysPage 
              onProfileClick={handleProfileClick} 
              onWalletClick={handleWalletClick}
              onMenuClick={handleMenuClick}
            />
          )}
          {activeTab === 'help' && <HelpPage onNavigate={handleHelpNavigate} />}
        </>
      );
    };

    return (
      <div className="h-screen w-screen bg-[#0A0F1C] overflow-hidden">
        <div className="h-full w-full bg-[#0A0F1C] overflow-hidden relative flex flex-col">
          {/* Sidebar Menu */}
          <SidebarMenu
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onProfileClick={handleProfileClick}
            onWalletClick={handleWalletClick}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {renderView()}
          </div>

          {/* Bottom Navigation - Only show on main view - Mobile Optimized */}
          {currentView === 'main' && (
            <div className="bg-gradient-to-t from-[#141A2A] via-[#141A2A]/95 to-transparent backdrop-blur-xl border-t border-[#1f2937] px-4 py-3 pb-5 flex justify-around items-center safe-area-bottom">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all active:scale-95 ${
                  activeTab === 'jobs' ? 'text-[#007BFF]' : 'text-gray-400'
                }`}
              >
                <Briefcase className={`w-6 h-6 ${activeTab === 'jobs' ? 'fill-current' : ''}`} style={activeTab === 'jobs' ? { filter: 'drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))' } : {}} />
                <span className="text-xs">Jobs</span>
                {activeTab === 'jobs' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#007BFF] to-transparent rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all active:scale-95 ${
                  activeTab === 'services' ? 'text-[#007BFF]' : 'text-gray-400'
                }`}
              >
                <Wrench className={`w-6 h-6 ${activeTab === 'services' ? 'fill-current' : ''}`} style={activeTab === 'services' ? { filter: 'drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))' } : {}} />
                <span className="text-xs">Services</span>
                {activeTab === 'services' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#007BFF] to-transparent rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('hotels')}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all active:scale-95 ${
                  activeTab === 'hotels' ? 'text-[#007BFF]' : 'text-gray-400'
                }`}
              >
                <Hotel className={`w-6 h-6 ${activeTab === 'hotels' ? 'fill-current' : ''}`} style={activeTab === 'hotels' ? { filter: 'drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))' } : {}} />
                <span className="text-xs">Hotels</span>
                {activeTab === 'hotels' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#007BFF] to-transparent rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all active:scale-95 ${
                  activeTab === 'help' ? 'text-[#007BFF]' : 'text-gray-400'
                }`}
              >
                <HelpCircle className={`w-6 h-6 ${activeTab === 'help' ? 'fill-current' : ''}`} style={activeTab === 'help' ? { filter: 'drop-shadow(0 0 8px rgba(0, 123, 255, 0.6))' } : {}} />
                <span className="text-xs">Help</span>
                {activeTab === 'help' && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#007BFF] to-transparent rounded-full"></span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}