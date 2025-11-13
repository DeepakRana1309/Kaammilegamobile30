import { User, Briefcase, Shield } from 'lucide-react';

interface LoginTypeSelectorProps {
  onSelectType: (type: 'user' | 'company' | 'admin') => void;
}

export function LoginTypeSelector({ onSelectType }: LoginTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col items-center justify-center px-5">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-[#007BFF] to-[#0056b3] bg-clip-text text-transparent">
            Kaam Milega
          </h1>
          <p className="text-gray-400">Choose how you want to continue</p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          {/* User Login */}
          <button
            onClick={() => onSelectType('user')}
            className="w-full bg-[#141A2A] rounded-xl p-6 border border-[#1f2937] hover:border-[#007BFF] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white text-lg mb-1">Job Seeker</h3>
                <p className="text-gray-400 text-sm">Find jobs, services & hotels</p>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-[#007BFF] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Company Login */}
          <button
            onClick={() => onSelectType('company')}
            className="w-full bg-[#141A2A] rounded-xl p-6 border border-[#1f2937] hover:border-[#007BFF] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white text-lg mb-1">Company / Recruiter</h3>
                <p className="text-gray-400 text-sm">Post jobs & hire talent</p>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-[#007BFF] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Admin Login */}
          <button
            onClick={() => onSelectType('admin')}
            className="w-full bg-[#141A2A] rounded-xl p-6 border border-[#1f2937] hover:border-red-500 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white text-lg mb-1">Admin</h3>
                <p className="text-gray-400 text-sm">Platform management</p>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
