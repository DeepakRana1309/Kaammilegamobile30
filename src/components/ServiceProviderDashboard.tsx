import { useState } from 'react';
import { motion } from 'motion/react';
import { Power, MapPin, Clock, User, DollarSign, Calendar, Bell } from 'lucide-react';

interface ServiceProviderDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

const todayBookings = [
  { id: 1, customer: 'Rahul Sharma', service: 'Plumbing', time: '10:00 AM', location: 'Andheri West', amount: '₹500' },
  { id: 2, customer: 'Priya Patel', service: 'Plumbing', time: '2:00 PM', location: 'Bandra East', amount: '₹700' },
  { id: 3, customer: 'Amit Kumar', service: 'Plumbing', time: '5:00 PM', location: 'Juhu', amount: '₹600' },
];

export function ServiceProviderDashboard({ userName, onNavigate }: ServiceProviderDashboardProps) {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141A2A] to-[#0A0F1C] px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('profile')}
              className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center"
            >
              <User className="w-6 h-6 text-white" />
            </button>
            <div>
              <p className="text-gray-400 text-sm">Service Provider</p>
              <p className="text-white">{userName}</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('notifications')}
            className="w-10 h-10 rounded-full bg-[#141A2A] flex items-center justify-center relative hover:bg-[#1A2332] transition-all"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#007BFF] rounded-full"></span>
          </button>
        </div>

        {/* Online/Offline Toggle */}
        <motion.button
          onClick={() => setIsOnline(!isOnline)}
          className={`w-full rounded-2xl p-6 flex items-center justify-between transition-all ${
            isOnline
              ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-2 border-green-500'
              : 'bg-[#141A2A]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}>
              <Power className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white">You are {isOnline ? 'Online' : 'Offline'}</p>
              <p className="text-gray-400 text-sm">
                {isOnline ? 'Accepting new bookings' : 'Tap to go online'}
              </p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full p-1 transition-all ${
            isOnline ? 'bg-green-500' : 'bg-gray-600'
          }`}>
            <motion.div
              animate={{ x: isOnline ? 24 : 0 }}
              className="w-6 h-6 rounded-full bg-white"
            />
          </div>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#141A2A] rounded-2xl p-4 text-center"
          >
            <Calendar className="w-6 h-6 text-[#007BFF] mx-auto mb-2" />
            <p className="text-white text-xl">12</p>
            <p className="text-gray-400 text-sm">Today</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141A2A] rounded-2xl p-4 text-center"
          >
            <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-white text-xl">₹8.5k</p>
            <p className="text-gray-400 text-sm">Earnings</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141A2A] rounded-2xl p-4 text-center"
          >
            <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-white text-xl">3</p>
            <p className="text-gray-400 text-sm">Pending</p>
          </motion.div>
        </div>
      </div>

      {/* Today's Bookings */}
      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="text-white mb-3">Today's Bookings</h2>
        <div className="space-y-3 pb-4">
          {todayBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center">
                    <span className="text-white">{booking.customer[0]}</span>
                  </div>
                  <div>
                    <p className="text-white">{booking.customer}</p>
                    <p className="text-gray-400 text-sm">{booking.service}</p>
                  </div>
                </div>
                <span className="text-[#007BFF] bg-[#007BFF]/10 px-3 py-1 rounded-full text-sm">
                  {booking.amount}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {booking.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {booking.location}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-[#007BFF] hover:bg-[#0066CC] text-white py-2 rounded-xl transition-all">
                  Accept
                </button>
                <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-xl transition-all">
                  Decline
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
