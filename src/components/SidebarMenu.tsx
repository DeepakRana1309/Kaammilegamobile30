import { X, User, Wallet, Settings, LogOut, ChevronRight } from 'lucide-react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileClick: () => void;
  onWalletClick: () => void;
}

export function SidebarMenu({ isOpen, onClose, onProfileClick, onWalletClick }: SidebarMenuProps) {
  const menuItems = [
    { icon: User, label: 'My Profile', onClick: onProfileClick },
    { icon: Wallet, label: 'My Wallet', onClick: onWalletClick },
    { icon: Settings, label: 'Settings', onClick: () => alert('Settings coming soon!') },
    { icon: LogOut, label: 'Logout', onClick: () => alert('Logged out!'), danger: true }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#141A2A] z-50 animate-in slide-in-from-left">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#1f2937]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">Rahul Sharma</h3>
                <p className="text-gray-400 text-sm">rahul@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    if (!item.danger) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.danger
                      ? 'hover:bg-red-500/10 text-red-500'
                      : 'hover:bg-[#0A0F1C] text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#1f2937]">
            <p className="text-xs text-gray-500 text-center">
              Kaam Milega v1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
