import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Briefcase, 
  Wrench, 
  Hotel, 
  CheckCircle, 
  XCircle, 
  Flag,
  Ban,
  TrendingUp,
  DollarSign,
  Eye,
  LogOut
} from 'lucide-react';

interface AdminDashboardScreenProps {
  onLogout: () => void;
}

interface PendingItem {
  id: string;
  type: 'job' | 'service' | 'hotel' | 'user';
  title: string;
  submittedBy: string;
  date: string;
  details: string;
}

const mockPendingItems: PendingItem[] = [
  { id: '1', type: 'job', title: 'Senior Developer', submittedBy: 'Tech Corp', date: '2 hours ago', details: 'Full-time, ₹15-20 LPA' },
  { id: '2', type: 'user', title: 'Rahul Sharma - PAN Verification', submittedBy: 'rahul@example.com', date: '5 hours ago', details: 'ABCDE1234F' },
  { id: '3', type: 'service', title: 'Plumbing Services', submittedBy: 'Rajesh Kumar', date: '1 day ago', details: 'Home Services, ₹500/hr' },
  { id: '4', type: 'hotel', title: 'Budget Inn', submittedBy: 'Hotel Manager', date: '2 days ago', details: 'Mumbai, ₹800/night' },
];

export function AdminDashboardScreen({ onLogout }: AdminDashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'stats'>('pending');
  const [stats] = useState({
    totalUsers: 12450,
    activeJobs: 856,
    activeServices: 432,
    totalRevenue: '₹12.5L'
  });

  const handleAction = (itemId: string, action: 'approve' | 'reject' | 'flag' | 'ban') => {
    const actions = {
      approve: '✅ Approved successfully!',
      reject: '❌ Rejected',
      flag: '🚩 Flagged for review',
      ban: '🚫 Banned'
    };
    alert(actions[action]);
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-2xl mb-1">Admin Dashboard</h1>
            <p className="text-white/80 text-sm">Full Control Panel</p>
          </div>
          <button
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
          >
            <Users className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Total Users</p>
            <p className="text-white text-xl">{stats.totalUsers.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
          >
            <Briefcase className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Active Jobs</p>
            <p className="text-white text-xl">{stats.activeJobs}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
          >
            <Wrench className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Services</p>
            <p className="text-white text-xl">{stats.activeServices}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
          >
            <DollarSign className="w-6 h-6 text-white mb-2" />
            <p className="text-white/80 text-sm">Revenue</p>
            <p className="text-white text-xl">{stats.totalRevenue}</p>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#141A2A] px-4 py-3 flex gap-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'pending' ? 'bg-[#007BFF] text-white' : 'bg-[#0A0F1C] text-gray-400'
          }`}
        >
          Pending ({mockPendingItems.length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'approved' ? 'bg-[#007BFF] text-white' : 'bg-[#0A0F1C] text-gray-400'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'stats' ? 'bg-[#007BFF] text-white' : 'bg-[#0A0F1C] text-gray-400'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'pending' && (
          <div className="space-y-3">
            {mockPendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141A2A] rounded-2xl p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.type === 'job' ? 'bg-blue-500/10' :
                    item.type === 'service' ? 'bg-purple-500/10' :
                    item.type === 'hotel' ? 'bg-orange-500/10' :
                    'bg-green-500/10'
                  }`}>
                    {item.type === 'job' && <Briefcase className="w-5 h-5 text-blue-400" />}
                    {item.type === 'service' && <Wrench className="w-5 h-5 text-purple-400" />}
                    {item.type === 'hotel' && <Hotel className="w-5 h-5 text-orange-400" />}
                    {item.type === 'user' && <Users className="w-5 h-5 text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">By: {item.submittedBy}</p>
                    <p className="text-gray-500 text-xs">{item.details}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(item.id, 'approve')}
                    className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-green-500/30 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Approve</span>
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'reject')}
                    className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-red-500/30 transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm">Reject</span>
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'flag')}
                    className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center hover:bg-yellow-500/30 transition-all"
                  >
                    <Flag className="w-4 h-4 text-yellow-400" />
                  </button>
                  <button
                    onClick={() => handleAction(item.id, 'ban')}
                    className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center hover:bg-red-500/30 transition-all"
                  >
                    <Ban className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'approved' && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <p className="text-white text-xl mb-2">All Caught Up!</p>
            <p className="text-gray-400">No approved items to review</p>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="bg-[#141A2A] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white">Platform Growth</h3>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">New Users (This Month)</span>
                    <span className="text-white">+1,234</span>
                  </div>
                  <div className="h-2 bg-[#0A0F1C] rounded-full overflow-hidden">
                    <div className="h-full bg-[#007BFF] w-[78%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Job Postings</span>
                    <span className="text-white">+456</span>
                  </div>
                  <div className="h-2 bg-[#0A0F1C] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[65%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Service Bookings</span>
                    <span className="text-white">+892</span>
                  </div>
                  <div className="h-2 bg-[#0A0F1C] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[89%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#141A2A] rounded-2xl p-4">
              <h3 className="text-white mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New job posted', time: '5 min ago', color: 'text-blue-400' },
                  { action: 'User verified', time: '15 min ago', color: 'text-green-400' },
                  { action: 'Service completed', time: '1 hour ago', color: 'text-purple-400' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm ${activity.color}`}>{activity.action}</span>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
