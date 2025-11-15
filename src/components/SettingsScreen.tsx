import { motion } from 'motion/react';
import { ArrowLeft, Bell, Lock, Globe, Moon, Volume2, Shield, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

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
        <h1 className="text-white">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Preferences */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm mb-3 px-2">PREFERENCES</h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141A2A] rounded-2xl overflow-hidden"
          >
            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-white">Notifications</span>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-600 rounded-full peer-checked:bg-[#007BFF] transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </button>

            <div className="h-px bg-[#0A0F1C]"></div>

            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-white">Sound</span>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-600 rounded-full peer-checked:bg-[#007BFF] transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </button>

            <div className="h-px bg-[#0A0F1C]"></div>

            <button className="w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-white">Dark Mode</span>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-600 rounded-full peer-checked:bg-[#007BFF] transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </button>
          </motion.div>
        </div>

        {/* Security */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm mb-3 px-2">SECURITY & PRIVACY</h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141A2A] rounded-2xl overflow-hidden"
          >
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-white">Change Password</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="h-px bg-[#0A0F1C]"></div>

            <button className="w-full p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-white">Privacy Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </motion.div>
        </div>

        {/* Other */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3 px-2">OTHER</h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141A2A] rounded-2xl overflow-hidden"
          >
            <button className="w-full p-4 flex items-center justify-between hover:bg-[#1A2332] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#007BFF]" />
                </div>
                <div className="text-left">
                  <p className="text-white">Language</p>
                  <p className="text-gray-400 text-sm">English</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
