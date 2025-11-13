import { ArrowLeft, Mail, Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface AdminLoginPageProps {
  onBack: () => void;
  onLogin: () => void;
}

export function AdminLoginPage({ onBack, onLogin }: AdminLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin credentials validation
    if (formData.email === 'admin@kaammilega.com' && formData.password === 'Admin@2024') {
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('adminName', 'Super Admin');
      setError('');
      onLogin();
    } else {
      setError('Invalid admin credentials');
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
        <h1 className="text-xl">Admin Login</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-20">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl mb-2">Admin Portal</h2>
            <p className="text-gray-400">Restricted Access Only</p>
          </div>

          {/* Security Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 text-sm mb-1">Authorized Personnel Only</h3>
                <p className="text-gray-400 text-xs">
                  Unauthorized access attempts are logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@kaammilega.com"
                  className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-red-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter admin password"
                  className="w-full bg-[#141A2A] text-white pl-12 pr-12 py-3 rounded-xl border border-[#1f2937] focus:border-red-500 focus:outline-none transition-colors"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Access Admin Dashboard
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 bg-[#141A2A] border border-[#1f2937] rounded-xl p-4">
            <h3 className="text-white text-sm mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-xs text-gray-400 font-mono">
              <p>Email: admin@kaammilega.com</p>
              <p>Password: Admin@2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
