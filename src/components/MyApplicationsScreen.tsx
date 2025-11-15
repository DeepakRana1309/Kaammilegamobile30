import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface MyApplicationsScreenProps {
  onBack: () => void;
}

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  salary: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Frontend Developer',
    company: 'Tech Solutions Inc',
    location: 'Mumbai, Maharashtra',
    appliedDate: '2 days ago',
    status: 'accepted',
    salary: '₹8-12 LPA'
  },
  {
    id: '2',
    jobTitle: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Bangalore, Karnataka',
    appliedDate: '5 days ago',
    status: 'pending',
    salary: '₹6-10 LPA'
  },
  {
    id: '3',
    jobTitle: 'Backend Developer',
    company: 'Startup Hub',
    location: 'Delhi, India',
    appliedDate: '1 week ago',
    status: 'rejected',
    salary: '₹10-15 LPA'
  },
  {
    id: '4',
    jobTitle: 'Full Stack Developer',
    company: 'Digital Agency',
    location: 'Pune, Maharashtra',
    appliedDate: '2 weeks ago',
    status: 'pending',
    salary: '₹12-18 LPA'
  },
];

export function MyApplicationsScreen({ onBack }: MyApplicationsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const filteredApplications = filter === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === filter);

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-400/10 text-green-400 border-green-400/30';
      case 'rejected':
        return 'bg-red-400/10 text-red-400 border-red-400/30';
      case 'pending':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30';
    }
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white">My Applications</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-[#007BFF] text-white'
                  : 'bg-[#0A0F1C] text-gray-400'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Briefcase className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-gray-400">No applications found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141A2A] rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{application.jobTitle}</h3>
                    <p className="text-gray-400 text-sm">{application.company}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="text-xs capitalize">{application.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {application.location}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    Applied {application.appliedDate}
                  </div>
                  <span className="text-[#007BFF]">{application.salary}</span>
                </div>

                {application.status === 'accepted' && (
                  <button className="w-full mt-3 bg-[#007BFF] text-white py-2 rounded-xl">
                    View Details
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-[#141A2A] px-4 py-4">
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-white text-xl">{mockApplications.length}</p>
            <p className="text-gray-400 text-sm">Total</p>
          </div>
          <div className="text-center">
            <p className="text-green-400 text-xl">{mockApplications.filter(a => a.status === 'accepted').length}</p>
            <p className="text-gray-400 text-sm">Accepted</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 text-xl">{mockApplications.filter(a => a.status === 'pending').length}</p>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-red-400 text-xl">{mockApplications.filter(a => a.status === 'rejected').length}</p>
            <p className="text-gray-400 text-sm">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
