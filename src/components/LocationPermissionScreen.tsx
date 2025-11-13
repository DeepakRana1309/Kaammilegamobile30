import { MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';

interface LocationPermissionScreenProps {
  onPermissionGranted: () => void;
}

export function LocationPermissionScreen({ onPermissionGranted }: LocationPermissionScreenProps) {
  const [requesting, setRequesting] = useState(false);

  const handleRequestPermission = () => {
    setRequesting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully got location
          localStorage.setItem('locationPermissionGranted', 'true');
          localStorage.setItem('userLat', position.coords.latitude.toString());
          localStorage.setItem('userLng', position.coords.longitude.toString());
          setTimeout(() => {
            onPermissionGranted();
          }, 500);
        },
        (error) => {
          // Permission denied or error
          console.log('Location permission denied:', error);
          // Still allow to proceed
          localStorage.setItem('locationPermissionGranted', 'denied');
          setTimeout(() => {
            onPermissionGranted();
          }, 500);
        }
      );
    } else {
      // Geolocation not supported
      localStorage.setItem('locationPermissionGranted', 'not-supported');
      setTimeout(() => {
        onPermissionGranted();
      }, 500);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('locationPermissionGranted', 'skipped');
    onPermissionGranted();
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mx-auto animate-pulse">
            <MapPin className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-0 right-1/4 animate-bounce">
            <Navigation className="w-8 h-8 text-[#007BFF]" />
          </div>
        </div>

        {/* Logo */}
        <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#007BFF] to-[#0056b3] bg-clip-text text-transparent">
          Kaam Milega
        </h1>
        
        {/* Title */}
        <h2 className="text-2xl mb-4 mt-8">Enable Location Access</h2>
        
        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          We need your location to show you nearby jobs, service providers, and hotels in your area. 
          This helps us provide you with the most relevant opportunities.
        </p>

        {/* Benefits */}
        <div className="bg-[#141A2A] rounded-xl p-5 mb-8 border border-[#1f2937] text-left">
          <h3 className="text-white mb-3 text-sm">What you'll get:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#007BFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#007BFF] text-xs">✓</span>
              </div>
              <p className="text-gray-300 text-sm">Jobs and services near you</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#007BFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#007BFF] text-xs">✓</span>
              </div>
              <p className="text-gray-300 text-sm">Accurate distance calculations</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#007BFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#007BFF] text-xs">✓</span>
              </div>
              <p className="text-gray-300 text-sm">Personalized recommendations</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={handleRequestPermission}
          disabled={requesting}
          className={`w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-4 rounded-xl mb-3 hover:shadow-lg transition-all ${
            requesting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {requesting ? 'Requesting Permission...' : 'Allow Location Access'}
        </button>

        <button
          onClick={handleSkip}
          className="w-full bg-transparent text-gray-400 py-3 rounded-xl hover:text-white transition-colors"
        >
          Skip for Now
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 mt-6">
          Your privacy is important to us. We only use your location to improve your experience.
        </p>
      </div>
    </div>
  );
}
