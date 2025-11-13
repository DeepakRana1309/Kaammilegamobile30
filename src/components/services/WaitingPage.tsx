import { useEffect, useState } from 'react';
import { Clock, User, MapPin, Calendar, IndianRupee, X } from 'lucide-react';

interface WaitingPageProps {
  bookingDetails: any;
  onAccepted: () => void;
  onCancel: () => void;
}

export function WaitingPage({ bookingDetails, onAccepted, onCancel }: WaitingPageProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Simulate worker accepting after 5 seconds (for demo)
    const acceptTimeout = setTimeout(() => {
      onAccepted();
    }, 5000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(acceptTimeout);
    };
  }, [onAccepted]);

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col items-center justify-center px-5 relative">
      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="absolute top-6 right-6 p-2 bg-[#141A2A] rounded-lg border border-[#1f2937] hover:border-red-500 transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Animated Circle */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center relative">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full bg-[#007BFF] opacity-20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-[#007BFF] opacity-30 animate-pulse"></div>
          
          {/* Clock Icon */}
          <Clock className="w-16 h-16 text-white relative z-10" />
        </div>
      </div>

      {/* Glowing Text Animation */}
      <div className="relative mb-8 overflow-hidden">
        <h2 className="text-2xl text-center mb-2 relative">
          <span className="inline-block">
            Waiting for acceptance{dots}
          </span>
        </h2>
        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>

      <p className="text-gray-400 text-center mb-8">
        We've sent your request to {bookingDetails.worker.name}
      </p>

      {/* Booking Summary Card */}
      <div className="w-full max-w-sm bg-[#141A2A] rounded-xl p-5 border border-[#1f2937] space-y-4">
        <h3 className="text-white mb-3">Booking Summary</h3>
        
        <div className="flex items-start gap-3 pb-3 border-b border-[#1f2937]">
          <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-xl">
            {bookingDetails.worker.avatar}
          </div>
          <div className="flex-1">
            <p className="text-white">{bookingDetails.worker.name}</p>
            <p className="text-gray-400 text-sm">{bookingDetails.serviceName}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 text-[#007BFF]" />
            <span>{bookingDetails.date} at {bookingDetails.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-[#007BFF]" />
            <span className="line-clamp-1">{bookingDetails.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <IndianRupee className="w-4 h-4 text-[#007BFF]" />
            <span>₹{bookingDetails.total}</span>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        <span className="text-gray-400 text-sm">Request Pending</span>
      </div>

      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="mt-6 px-6 py-2 bg-[#141A2A] text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500/10 transition-all"
      >
        Cancel Request
      </button>

      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
