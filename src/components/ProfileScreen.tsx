import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  CreditCard
} from 'lucide-react';
import { UserRole } from '../App';

interface ProfileScreenProps {
  userName: string;
  userRole: UserRole;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const roleLabels = {
  'job-seeker': 'Job Seeker',
  'company': 'Company',
  'service-provider': 'Service Provider',
  'customer': 'Customer',
};

export function ProfileScreen({ userName, userRole, onBack, onNavigate, onLogout }: ProfileScreenProps) {
  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141A2A] rounded-2xl p-6 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00D9FF] mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-3xl">{userName[0]}</span>
          </div>
          <h2 className="text-white text-xl mb-1">{userName}</h2>
          <p className="text-gray-400 mb-3">{userRole && roleLabels[userRole]}</p>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white">4.8</span>
            <span className="text-gray-400 text-sm">(124 reviews)</span>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('edit-profile')}
          className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div className="text-left">
              <p className="text-white">Edit Profile</p>
              <p className="text-gray-400 text-sm">Update your information</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigate('payment-methods')}
          className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div className="text-left">
              <p className="text-white">Payment Methods</p>
              <p className="text-gray-400 text-sm">Manage your payments</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onNavigate('my-applications')}
          className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div className="text-left">
              <p className="text-white">My Applications</p>
              <p className="text-gray-400 text-sm">View your job applications</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => onNavigate('settings')}
          className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div className="text-left">
              <p className="text-white">Settings</p>
              <p className="text-gray-400 text-sm">App preferences</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => onNavigate('help-support')}
          className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div className="text-left">
              <p className="text-white">Help & Support</p>
              <p className="text-gray-400 text-sm">Get assistance</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onLogout}
          className="w-full bg-red-500/10 rounded-2xl p-4 flex items-center justify-between hover:bg-red-500/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-left">
              <p className="text-red-400">Logout</p>
              <p className="text-gray-400 text-sm">Sign out of your account</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <div className="h-4"></div>
      </div>

      {/* App Version */}
      <div className="px-4 py-4 text-center">
        <p className="text-gray-500 text-sm">Kaam Milega v1.0.0</p>
      </div>
    </div>
  );
}
