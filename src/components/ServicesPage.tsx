import { useState } from 'react';
import { ServicesMainPage } from './services/ServicesMainPage';
import { SubServicesPage } from './services/SubServicesPage';
import { WorkerListPage } from './services/WorkerListPage';
import { BookingPage } from './services/BookingPage';
import { WaitingPage } from './services/WaitingPage';
import { JobAcceptedPage } from './services/JobAcceptedPage';
import { LiveTrackingPage } from './services/LiveTrackingPage';
import { OTPVerificationPage } from './services/OTPVerificationPage';
import { ServiceCompletionPage } from './services/ServiceCompletionPage';
import { PaymentPromptPage } from './services/PaymentPromptPage';
import { RatingPage } from './services/RatingPage';

interface ServicesPageProps {
  onProfileClick: () => void;
  onWalletClick: () => void;
}

type ServiceView = 
  | 'main' 
  | 'subServices' 
  | 'workers' 
  | 'booking' 
  | 'waiting' 
  | 'accepted'
  | 'tracking' 
  | 'otp' 
  | 'serviceInProgress'
  | 'payment'
  | 'rating'
  | 'completed';

export function ServicesPage({ onProfileClick, onWalletClick }: ServicesPageProps) {
  const [currentView, setCurrentView] = useState<ServiceView>('main');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedSubServices, setSelectedSubServices] = useState<any[]>([]);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleServiceSelect = (serviceName: string, subServices: any[]) => {
    setSelectedService(serviceName);
    setSelectedSubServices(subServices);
    setCurrentView('subServices');
  };

  const handleSubServiceSelect = (subService: any) => {
    setSelectedSubService(subService);
    setCurrentView('workers');
  };

  const handleWorkerSelect = (worker: any) => {
    setSelectedWorker(worker);
    setCurrentView('booking');
  };

  const handleConfirmBooking = (details: any) => {
    setBookingDetails(details);
    setCurrentView('waiting');
  };

  const handleBookingAccepted = () => {
    setCurrentView('accepted');
  };

  const handlePaymentMethodChange = (method: string) => {
    setBookingDetails({
      ...bookingDetails,
      paymentMethod: method
    });
  };

  const handleContinueToTracking = () => {
    setCurrentView('tracking');
  };

  const handleWorkerArrived = () => {
    setCurrentView('otp');
  };

  const handleOTPVerified = () => {
    setCurrentView('serviceInProgress');
  };

  const handleServiceMarkedComplete = () => {
    setCurrentView('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentView('rating');
  };

  const handleRatingComplete = () => {
    setCurrentView('completed');
    // Show success message and reset after a delay
    setTimeout(() => {
      handleReset();
    }, 3000);
  };

  const handleCancel = () => {
    handleReset();
  };

  const handleReset = () => {
    setCurrentView('main');
    setSelectedService('');
    setSelectedSubServices([]);
    setSelectedSubService(null);
    setSelectedWorker(null);
    setBookingDetails(null);
  };

  // Render different views
  if (currentView === 'main') {
    return <ServicesMainPage onServiceSelect={handleServiceSelect} />;
  }

  if (currentView === 'subServices') {
    return (
      <SubServicesPage
        serviceName={selectedService}
        subServices={selectedSubServices}
        onBack={() => setCurrentView('main')}
        onSubServiceSelect={handleSubServiceSelect}
      />
    );
  }

  if (currentView === 'workers') {
    return (
      <WorkerListPage
        serviceName={selectedService}
        subServiceName={selectedSubService.name}
        onBack={() => setCurrentView('subServices')}
        onWorkerSelect={handleWorkerSelect}
      />
    );
  }

  if (currentView === 'booking') {
    return (
      <BookingPage
        worker={selectedWorker}
        serviceName={selectedService}
        subServiceName={selectedSubService.name}
        onBack={() => setCurrentView('workers')}
        onConfirmBooking={handleConfirmBooking}
      />
    );
  }

  if (currentView === 'waiting') {
    return (
      <WaitingPage
        bookingDetails={bookingDetails}
        onAccepted={handleBookingAccepted}
        onCancel={handleCancel}
      />
    );
  }

  if (currentView === 'accepted') {
    return (
      <JobAcceptedPage
        bookingDetails={bookingDetails}
        onPaymentMethodChange={handlePaymentMethodChange}
        onContinue={handleContinueToTracking}
      />
    );
  }

  if (currentView === 'tracking') {
    return (
      <LiveTrackingPage
        bookingDetails={bookingDetails}
        onWorkerArrived={handleWorkerArrived}
      />
    );
  }

  if (currentView === 'otp') {
    return (
      <OTPVerificationPage
        bookingDetails={bookingDetails}
        onVerified={handleOTPVerified}
      />
    );
  }

  if (currentView === 'serviceInProgress') {
    return (
      <ServiceCompletionPage
        bookingDetails={bookingDetails}
        onMarkComplete={handleServiceMarkedComplete}
      />
    );
  }

  if (currentView === 'payment') {
    return (
      <PaymentPromptPage
        bookingDetails={bookingDetails}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  if (currentView === 'rating') {
    return (
      <RatingPage
        bookingDetails={bookingDetails}
        onRatingComplete={handleRatingComplete}
      />
    );
  }

  if (currentView === 'completed') {
    return (
      <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col items-center justify-center px-5">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
          <span className="text-5xl relative z-10">✅</span>
        </div>
        <h2 className="text-2xl mb-2">Thank You!</h2>
        <p className="text-gray-400 text-center mb-2">
          Your review has been submitted successfully
        </p>
        <p className="text-gray-500 text-sm">Redirecting to home...</p>
      </div>
    );
  }

  return null;
}
