import { Phone, MessageCircle, Navigation, MapPin, User, IndianRupee, Star, Clock, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LiveTrackingPageProps {
  bookingDetails: any;
  onWorkerArrived: () => void;
}

export function LiveTrackingPage({ bookingDetails, onWorkerArrived }: LiveTrackingPageProps) {
  const [eta, setEta] = useState(15);
  const [distance, setDistance] = useState(2.5);

  useEffect(() => {
    // Simulate movement - reduce ETA and distance over time
    const interval = setInterval(() => {
      setEta(prev => {
        const newEta = Math.max(0, prev - 1);
        if (newEta === 0) {
          onWorkerArrived();
        }
        return newEta;
      });
      setDistance(prev => Math.max(0, prev - 0.2));
    }, 3000); // Update every 3 seconds for demo

    return () => clearInterval(interval);
  }, [onWorkerArrived]);

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col">
      {/* Map Container */}
      <div className="relative h-[60vh] bg-[#141A2A]">
        {/* Google Maps Placeholder - In production, integrate Google Maps API */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
          {/* Simulated Map with markers */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Your Location (static) */}
              <div className="absolute" style={{ bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="relative">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#0A0F1C] px-3 py-1 rounded-lg text-xs">
                    Your Location
                  </div>
                </div>
              </div>

              {/* Worker Location (moving) */}
              <div className="absolute animate-pulse" style={{ top: '20%', left: '30%' }}>
                <div className="relative">
                  <div className="w-14 h-14 bg-[#007BFF] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-2xl">{bookingDetails.worker.avatar}</span>
                  </div>
                  {/* Direction Arrow */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Navigation className="w-4 h-4 text-[#007BFF]" style={{ transform: 'rotate(135deg)' }} />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#007BFF] px-3 py-1 rounded-lg text-xs">
                    {bookingDetails.worker.name}
                  </div>
                </div>
              </div>

              {/* Dotted line path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="30%"
                  y1="20%"
                  x2="50%"
                  y2="70%"
                  stroke="#007BFF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>

          {/* Live indicator */}
          <div className="absolute top-4 left-4 bg-red-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-sm">LIVE</span>
          </div>

          {/* ETA Card */}
          <div className="absolute top-4 right-4 bg-[#0A0F1C]/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#1f2937] shadow-lg">
            <div className="text-gray-400 text-xs mb-1">Arriving in</div>
            <div className="text-white text-2xl">{eta} min</div>
            <div className="text-gray-400 text-xs mt-1">{distance.toFixed(1)} km away</div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="flex-1 bg-[#0A0F1C] rounded-t-3xl -mt-6 relative z-10 px-5 py-6 space-y-6">
        {/* Drag Handle */}
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4"></div>

        {/* Worker Info Card */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-3xl">
              {bookingDetails.worker.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg mb-1">{bookingDetails.worker.name}</h3>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm">{bookingDetails.worker.rating}</span>
                <span className="text-gray-400 text-sm">• On the way</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl hover:bg-[#0056b3] transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call
            </button>
            <button className="flex-1 bg-[#0A0F1C] text-[#007BFF] py-3 rounded-xl border border-[#007BFF] hover:bg-[#007BFF]/10 transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] space-y-3">
          <h4 className="text-white mb-2">Service Details</h4>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Service</span>
            <span className="text-white">{bookingDetails.subServiceName}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Scheduled Time</span>
            <span className="text-white">{bookingDetails.time}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Location</span>
            <span className="text-white text-right line-clamp-1 ml-2">
              {bookingDetails.address.split(',')[0]}
            </span>
          </div>

          <div className="border-t border-[#1f2937] pt-3 flex items-center justify-between">
            <span className="text-gray-400">Payment Method</span>
            <span className="text-white capitalize">{bookingDetails.paymentMethod}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white">Total Amount</span>
            <span className="text-xl text-[#007BFF] flex items-center">
              <IndianRupee className="w-5 h-5" />
              {bookingDetails.total}
            </span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <h4 className="text-white mb-3">Service Status</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Booking Confirmed</p>
                <p className="text-gray-400 text-xs">Request accepted by worker</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Worker En Route</p>
                <p className="text-gray-400 text-xs">Arriving in {eta} minutes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">3</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">Service Completion</p>
                <p className="text-gray-500 text-xs">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-yellow-400 text-sm mb-1">Track in real-time</p>
              <p className="text-gray-400 text-xs">
                You can see the live location of {bookingDetails.worker.name} on the map above
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
