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
import { Briefcase, Wrench, Hotel, HelpCircle } from 'lucide-react';

type ViewType = 'main' | 'jobDetails' | 'apply' | 'profile' | 'wallet' | 'chat' | 'faq' | 'contact' | 'feedback' | 'getting-started' | 'account-privacy' | 'report-issue' | 'email-support';

export default function App() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'services' | 'hotels' | 'help'>('jobs');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Render current view
  const renderView = () => {
    if (currentView === 'profile') {
      return <ProfilePage onBack={handleBackToMain} />;
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
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-[#0A0F1C] rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col">
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

        {/* Bottom Navigation - Only show on main view */}
        {currentView === 'main' && (
          <div className="bg-[#141A2A] border-t border-[#1f2937] px-4 py-3 flex justify-around items-center">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'jobs' ? 'text-[#007BFF]' : 'text-gray-400'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span className="text-xs">Jobs</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'services' ? 'text-[#007BFF]' : 'text-gray-400'
              }`}
            >
              <Wrench className="w-5 h-5" />
              <span className="text-xs">Services</span>
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'hotels' ? 'text-[#007BFF]' : 'text-gray-400'
              }`}
            >
              <Hotel className="w-5 h-5" />
              <span className="text-xs">Hotels</span>
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'help' ? 'text-[#007BFF]' : 'text-gray-400'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs">Help</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}