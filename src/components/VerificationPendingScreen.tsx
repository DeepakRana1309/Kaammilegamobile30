import { motion } from 'motion/react';
import { Clock, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react';

interface VerificationPendingScreenProps {
  userName: string;
  onLogout: () => void;
  onApprove?: () => void;
}

export function VerificationPendingScreen({ userName, onLogout, onApprove }: VerificationPendingScreenProps) {
  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated Clock Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00D9FF] flex items-center justify-center mx-auto mb-6"
        >
          <Clock className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-white text-2xl mb-3">Verification Pending</h1>
        <p className="text-gray-400 mb-8 max-w-sm">
          Hi {userName}, your PAN verification is under review. Our admin team will verify your details within 24-48 hours.
        </p>

        {/* Status Timeline */}
        <div className="bg-[#141A2A] rounded-2xl p-6 mb-6 text-left">
          <h3 className="text-white mb-4">Verification Status</h3>
          
          <div className="space-y-4">
            {/* Step 1 - Complete */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white">PAN Details Submitted</p>
                <p className="text-gray-400 text-sm">Completed</p>
              </div>
            </div>

            {/* Step 2 - In Progress */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0 animate-pulse">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white">Admin Verification</p>
                <p className="text-[#007BFF] text-sm">In Progress...</p>
              </div>
            </div>

            {/* Step 3 - Pending */}
            <div className="flex items-start gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400">Account Activation</p>
                <p className="text-gray-500 text-sm">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-[#007BFF] text-sm leading-relaxed">
                You'll receive a notification once your account is verified. You can check back anytime or logout and login later.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Override Button (For Testing) */}
        {onApprove && (
          <button
            onClick={onApprove}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-medium hover:bg-green-600 transition-all flex items-center justify-center gap-2 mb-3"
          >
            <CheckCircle className="w-5 h-5" />
            Admin Approve (Testing)
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-[#141A2A] text-white py-4 rounded-xl font-medium hover:bg-[#1A2332] transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </motion.div>
    </div>
  );
}
