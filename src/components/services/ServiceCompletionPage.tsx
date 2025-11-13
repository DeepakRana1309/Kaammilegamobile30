import { CheckCircle, Clock, User, IndianRupee, Star } from 'lucide-react';
import { useState } from 'react';

interface ServiceCompletionPageProps {
  bookingDetails: any;
  onMarkComplete: () => void;
}

export function ServiceCompletionPage({ bookingDetails, onMarkComplete }: ServiceCompletionPageProps) {
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkComplete = () => {
    setIsMarking(true);
    setTimeout(() => {
      onMarkComplete();
    }, 1500);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col items-center justify-center px-5">
      {/* Worker Avatar */}
      <div className="w-24 h-24 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-5xl mb-6">
        {bookingDetails.worker.avatar}
      </div>

      <h2 className="text-2xl mb-2">Service in Progress</h2>
      <p className="text-gray-400 text-center mb-8">
        {bookingDetails.worker.name} is working on your {bookingDetails.subServiceName}
      </p>

      {/* Service Details Card */}
      <div className="w-full max-w-sm bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Service</span>
          <span className="text-white text-sm">{bookingDetails.subServiceName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Started At</span>
          <span className="text-white text-sm">{bookingDetails.time}</span>
        </div>
        <div className="border-t border-[#1f2937] pt-3 flex items-center justify-between">
          <span className="text-gray-400 text-sm">Amount to Pay</span>
          <span className="text-xl text-[#007BFF] flex items-center">
            <IndianRupee className="w-4 h-4" />
            {bookingDetails.total}
          </span>
        </div>
      </div>

      {/* Timer */}
      <div className="w-full max-w-sm bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-[#007BFF]/30 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-[#007BFF]" />
          <span className="text-gray-400 text-sm">Time Elapsed</span>
        </div>
        <p className="text-4xl text-white mb-1">00:45</p>
        <p className="text-gray-400 text-xs">Service ongoing...</p>
      </div>

      {/* Worker Action Button - Simulating Worker's View */}
      <div className="w-full max-w-sm bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">👨‍🔧</span>
          <div>
            <p className="text-yellow-400 text-sm mb-1">Worker Action Required</p>
            <p className="text-gray-400 text-xs">
              Once {bookingDetails.worker.name} completes the service, they will mark it as complete.
            </p>
          </div>
        </div>
      </div>

      {/* Simulate Worker Button (In production, this would be in worker's app) */}
      <div className="w-full max-w-sm">
        <button
          onClick={handleMarkComplete}
          disabled={isMarking}
          className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
            isMarking
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-green-700 hover:shadow-xl'
          }`}
        >
          {isMarking ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white">Marking Complete...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white">Mark Service as Complete</span>
            </>
          )}
        </button>
        <p className="text-gray-500 text-xs text-center mt-2">
          (This button simulates worker completing the service)
        </p>
      </div>

      {/* Info */}
      <div className="w-full max-w-sm mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="text-blue-400 text-sm mb-1">Payment Process</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Once the worker marks the service as complete, you'll be prompted to make the payment and rate your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
