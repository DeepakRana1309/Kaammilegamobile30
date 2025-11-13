import { Shield, CheckCircle, User, MapPin, IndianRupee, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface OTPVerificationPageProps {
  bookingDetails: any;
  onVerified: () => void;
}

export function OTPVerificationPage({ bookingDetails, onVerified }: OTPVerificationPageProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOTP] = useState('1234'); // In production, this comes from backend
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-verify when all 4 digits entered
    if (index === 3 && value) {
      const enteredOtp = newOtp.join('');
      verifyOTP(enteredOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOTP = (enteredOtp: string) => {
    setIsVerifying(true);
    
    setTimeout(() => {
      if (enteredOtp === generatedOTP) {
        onVerified();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
        setIsVerifying(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col items-center justify-center px-5">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
        <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
      </div>

      <h2 className="text-2xl mb-2">Worker Has Arrived!</h2>
      <p className="text-gray-400 text-center mb-8">
        Please verify the worker with the OTP
      </p>

      {/* Worker Info */}
      <div className="w-full max-w-sm bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-2xl">
            {bookingDetails.worker.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-1">{bookingDetails.worker.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white">{bookingDetails.worker.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Display for User - MAIN EMPHASIS */}
      <div className="w-full max-w-sm bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-6 mb-4 text-center border-4 border-blue-400 shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="w-6 h-6 text-white" />
          <p className="text-white">Your Verification OTP</p>
        </div>
        <p className="text-5xl text-white tracking-widest mb-3">{generatedOTP}</p>
        <div className="bg-white/20 rounded-lg p-3 mb-2">
          <p className="text-white text-sm">📢 Give this code to {bookingDetails.worker.name}</p>
        </div>
        <p className="text-blue-100 text-xs">Do not share over phone or message</p>
      </div>

      {/* Important Instructions */}
      <div className="w-full max-w-sm bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="text-yellow-400 mb-2">Important Instructions</p>
            <ul className="text-gray-300 text-xs space-y-1.5 list-disc list-inside">
              <li>YOU will tell the OTP to the worker</li>
              <li>Worker will enter the OTP in their app</li>
              <li>Only share when worker is at your location</li>
              <li>Never share OTP over phone/message</li>
            </ul>
          </div>
        </div>
      </div>

      {/* OTP Input - For Demo (simulating worker's entry) */}
      <div className="w-full max-w-sm mb-6">
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] mb-3">
          <p className="text-gray-400 text-sm text-center mb-3">
            Worker will enter OTP in their device:
          </p>
          <div className="flex gap-3 justify-center mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className={`w-14 h-14 bg-[#0A0F1C] text-white text-2xl text-center rounded-xl border-2 transition-all ${
                  error
                    ? 'border-red-500'
                    : digit
                    ? 'border-[#007BFF]'
                    : 'border-[#1f2937]'
                } focus:border-[#007BFF] focus:outline-none ${
                  isVerifying ? 'opacity-50' : ''
                }`}
              />
            ))}
          </div>
          <p className="text-gray-500 text-xs text-center">(Demo: Enter {generatedOTP} to verify)</p>
          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}
          {isVerifying && (
            <p className="text-[#007BFF] text-sm text-center mt-2">Verifying...</p>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="w-full max-w-sm space-y-3">
        <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937] flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#007BFF] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-xs">Service Location</p>
            <p className="text-white text-sm truncate">{bookingDetails.address.split(',')[0]}</p>
          </div>
        </div>

        <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937] flex items-center gap-3">
          <IndianRupee className="w-5 h-5 text-[#007BFF] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-gray-400 text-xs">Payment ({bookingDetails.paymentMethod})</p>
            <p className="text-white text-sm">₹{bookingDetails.total}</p>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="w-full max-w-sm mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 text-sm mb-1">Security Tip</p>
            <p className="text-gray-400 text-xs">
              Only share the OTP with the verified worker at your location. Never share it over phone or message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}