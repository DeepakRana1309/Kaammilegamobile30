import { motion } from 'motion/react';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, Briefcase, Wrench } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'success',
    icon: CheckCircle,
    title: 'Application Accepted',
    message: 'Your job application for Frontend Developer at Tech Solutions Inc has been accepted',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    icon: Briefcase,
    title: 'New Job Match',
    message: '5 new jobs match your profile. Check them out!',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    icon: AlertCircle,
    title: 'Profile Incomplete',
    message: 'Complete your profile to get better job recommendations',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'info',
    icon: Wrench,
    title: 'Service Request',
    message: 'Your plumber service request has been confirmed',
    time: '2 days ago',
    read: true,
  },
];

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
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
        <h1 className="text-white">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          const iconColor = notification.type === 'success' 
            ? 'text-green-400 bg-green-400/10' 
            : notification.type === 'warning'
            ? 'text-yellow-400 bg-yellow-400/10'
            : 'text-[#007BFF] bg-[#007BFF]/10';

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#141A2A] rounded-2xl p-4 mb-3 ${
                !notification.read ? 'border-2 border-[#007BFF]/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                  <p className="text-gray-500 text-xs">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mark All as Read Button */}
      <div className="px-4 py-4 bg-[#141A2A]">
        <button className="w-full py-3 text-[#007BFF] border border-[#007BFF] rounded-xl hover:bg-[#007BFF]/10 transition-all">
          Mark All as Read
        </button>
      </div>
    </div>
  );
}
