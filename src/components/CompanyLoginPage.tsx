import { ArrowLeft, Mail, Lock, Eye, EyeOff, Building2 } from 'lucide-react';
import { useState } from 'react';

interface CompanyLoginPageProps {
  onBack: () => void;
  onLogin: () => void;
}

export function CompanyLoginPage({ onBack, onLogin }: CompanyLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      localStorage.setItem('userType', 'company');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('companyName', 'Tech Corp'); // Mock company name
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl">Company Login</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-20">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl mb-2">Company Portal</h2>
            <p className="text-gray-400">Login to manage your job postings</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Company Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="company@example.com"
                  className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full bg-[#141A2A] text-white pl-12 pr-12 py-3 rounded-xl border border-[#1f2937] focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-green-500 text-sm hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-700 text-white py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Login to Dashboard
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <h3 className="text-green-400 text-sm mb-2">Company Benefits:</h3>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Post unlimited job listings</li>
              <li>• Access qualified candidate pool</li>
              <li>• Track application analytics</li>
              <li>• Premium job visibility</li>
            </ul>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#1f2937]"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-[#1f2937]"></div>
          </div>

          {/* Sign Up */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              New company?{' '}
              <button className="text-green-500 hover:underline">
                Register Your Company
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
