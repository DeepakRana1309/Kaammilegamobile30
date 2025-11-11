import { ArrowLeft, Lock, Eye, EyeOff, Shield, Bell, Smartphone, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AccountPrivacyPageProps {
  onBack: () => void;
}

export function AccountPrivacyPage({ onBack }: AccountPrivacyPageProps) {
  const [settings, setSettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    twoFactorAuth: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">Account & Privacy</h1>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Privacy Settings */}
        <div>
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#007BFF]" />
            Privacy Settings
          </h2>
          <div className="bg-[#141A2A] rounded-xl border border-[#1f2937] divide-y divide-[#1f2937]">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white mb-1">Profile Visibility</p>
                <p className="text-gray-400 text-xs">Make your profile visible to employers</p>
              </div>
              <button
                onClick={() => toggleSetting('profileVisible')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.profileVisible ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.profileVisible ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white mb-1">Show Email</p>
                <p className="text-gray-400 text-xs">Display email on your profile</p>
              </div>
              <button
                onClick={() => toggleSetting('showEmail')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showEmail ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.showEmail ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white mb-1">Show Phone Number</p>
                <p className="text-gray-400 text-xs">Display phone on your profile</p>
              </div>
              <button
                onClick={() => toggleSetting('showPhone')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showPhone ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.showPhone ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#007BFF]" />
            Security
          </h2>
          <div className="space-y-3">
            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] flex items-center justify-between">
              <div>
                <p className="text-white mb-1">Two-Factor Authentication</p>
                <p className="text-gray-400 text-xs">Add an extra layer of security</p>
              </div>
              <button
                onClick={() => toggleSetting('twoFactorAuth')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.twoFactorAuth ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <button className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] flex items-center justify-between hover:border-[#007BFF] transition-all">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#007BFF]" />
                <div className="text-left">
                  <p className="text-white">Change Password</p>
                  <p className="text-gray-400 text-xs">Last changed 30 days ago</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] flex items-center justify-between hover:border-[#007BFF] transition-all">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#007BFF]" />
                <div className="text-left">
                  <p className="text-white">Trusted Devices</p>
                  <p className="text-gray-400 text-xs">Manage logged in devices</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-lg mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#007BFF]" />
            Notifications
          </h2>
          <div className="bg-[#141A2A] rounded-xl border border-[#1f2937] divide-y divide-[#1f2937]">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white mb-1">Push Notifications</p>
                <p className="text-gray-400 text-xs">Receive app notifications</p>
              </div>
              <button
                onClick={() => toggleSetting('pushNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white mb-1">Email Notifications</p>
                <p className="text-gray-400 text-xs">Receive email updates</p>
              </div>
              <button
                onClick={() => toggleSetting('emailNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white mb-1">SMS Notifications</p>
                <p className="text-gray-400 text-xs">Receive text messages</p>
              </div>
              <button
                onClick={() => toggleSetting('smsNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.smsNotifications ? 'bg-[#007BFF]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-lg mb-3 text-red-500 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h2>
          <button className="w-full bg-red-500/10 rounded-xl p-4 border border-red-500/20 hover:border-red-500 transition-all">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-red-500">Delete Account</p>
                <p className="text-gray-400 text-xs">Permanently delete your account and data</p>
              </div>
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
