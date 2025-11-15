import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Lock, ArrowRight, Briefcase, Mail } from 'lucide-react';

interface AuthScreenProps {
  onComplete: (name: string, isAdmin?: boolean) => void;
  onAdminLogin?: () => void;
}

const ADMIN_NUMBERS = ['7527996150', '8847602134', '7986035551'];

export function AuthScreen({ onComplete, onAdminLogin }: AuthScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'name' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      // Check if admin number
      if (ADMIN_NUMBERS.includes(phone)) {
        setStep('otp');
      } else {
        setStep('otp');
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(digit => digit !== '')) {
      // Check if admin number
      if (ADMIN_NUMBERS.includes(phone)) {
        // Direct admin login
        if (onAdminLogin) {
          onAdminLogin();
        }
      } else {
        setStep('name');
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Simple email validation
      if (email.includes('@')) {
        onComplete(email.split('@')[0]);
      }
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#0A0F1C] to-[#141A2A] flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-4 rounded-2xl bg-[#007BFF] mb-4"
        >
          <Briefcase className="w-12 h-12 text-white" strokeWidth={2} />
        </motion.div>
        <h1 className="text-white text-2xl mb-2">
          {step === 'phone' && 'Welcome to Kaam Milega'}
          {step === 'otp' && 'Verify OTP'}
          {step === 'name' && 'Complete Your Profile'}
          {step === 'email' && 'Login with Email'}
        </h1>
        <p className="text-gray-400">
          {step === 'phone' && 'Enter your phone number to continue'}
          {step === 'otp' && `Code sent to +91 ${phone}`}
          {step === 'name' && 'Tell us your name'}
          {step === 'email' && 'Enter your email and password'}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        {step === 'phone' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handlePhoneSubmit}
            className="space-y-6"
          >
            <div className="bg-[#141A2A] rounded-2xl p-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#007BFF]" />
              <span className="text-white">+91</span>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
                maxLength={10}
              />
            </div>
            <button
              type="submit"
              disabled={phone.length !== 10}
              className="w-full bg-[#007BFF] hover:bg-[#0066CC] disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#007BFF]/20"
            >
              <span>Send OTP</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Email Login Button */}
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full bg-[#141A2A] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-[#1A2332] border border-gray-700"
            >
              <Mail className="w-5 h-5 text-[#007BFF]" />
              <span>Login with Email</span>
            </button>
          </motion.form>
        )}

        {step === 'email' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleEmailSubmit}
            className="space-y-4"
          >
            <div className="bg-[#141A2A] rounded-2xl p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#007BFF]" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
            <div className="bg-[#141A2A] rounded-2xl p-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#007BFF]" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={!email || !password}
              className="w-full bg-[#007BFF] hover:bg-[#0066CC] disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#007BFF]/20"
            >
              <span>Login</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-gray-400 hover:text-white transition-colors"
            >
              Back to Phone Login
            </button>
          </motion.form>
        )}

        {step === 'otp' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleOtpSubmit}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 justify-center">
              <Lock className="w-5 h-5 text-[#007BFF]" />
              <span className="text-white">Enter 6-digit OTP</span>
            </div>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 bg-[#141A2A] text-white text-center rounded-xl outline-none focus:ring-2 focus:ring-[#007BFF] transition-all"
                  maxLength={1}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={otp.some(digit => digit === '')}
              className="w-full bg-[#007BFF] hover:bg-[#0066CC] disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#007BFF]/20"
            >
              <span>Verify OTP</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-gray-400 hover:text-white transition-colors"
            >
              Change Phone Number
            </button>
          </motion.form>
        )}

        {step === 'name' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleNameSubmit}
            className="space-y-6"
          >
            <div className="bg-[#141A2A] rounded-2xl p-4">
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-[#007BFF] hover:bg-[#0066CC] disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#007BFF]/20"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.form>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-gray-500 text-sm">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
