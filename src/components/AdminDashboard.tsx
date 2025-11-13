import { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wrench, 
  Hotel, 
  Users, 
  Building2, 
  CheckCircle, 
  XCircle, 
  Plus,
  Search,
  Filter,
  LogOut,
  TrendingUp,
  AlertCircle,
  Flag,
  Ban,
  Eye,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  companyVerified: boolean;
  status: 'pending' | 'approved' | 'declined' | 'flagged' | 'banned';
  description?: string;
  postedBy: string;
}

interface ServiceListing {
  id: number;
  providerName: string;
  service: string;
  location: string;
  rating: number;
  price: string;
  status: 'pending' | 'approved' | 'declined' | 'flagged' | 'banned';
  phone: string;
  postedDate: string;
}

interface HotelListing {
  id: number;
  name: string;
  location: string;
  rating: number;
  pricePerNight: string;
  status: 'pending' | 'approved' | 'declined' | 'flagged' | 'banned';
  postedDate: string;
  amenities: string[];
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'pending-jobs' | 'pending-services' | 'pending-hotels' | 'approved-jobs' | 'approved-services' | 'users' | 'companies'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showDeclineReason, setShowDeclineReason] = useState<number | null>(null);
  const [declineReason, setDeclineReason] = useState('');

  // Mock data for pending job listings
  const [pendingJobs, setPendingJobs] = useState<JobListing[]>([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Solutions Ltd',
      location: 'Mumbai, Maharashtra',
      salary: '₹8-12 LPA',
      type: 'Full-time',
      postedDate: '2 hours ago',
      companyVerified: true,
      status: 'pending',
      description: 'We are looking for an experienced React developer...',
      postedBy: 'company'
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Creative Agency Inc',
      location: 'Bangalore, Karnataka',
      salary: '₹6-9 LPA',
      type: 'Full-time',
      postedDate: '5 hours ago',
      companyVerified: true,
      status: 'pending',
      description: 'Seeking a creative marketing professional...',
      postedBy: 'company'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'StartUp Ventures',
      location: 'Pune, Maharashtra',
      salary: '₹5-7 LPA',
      type: 'Full-time',
      postedDate: '1 day ago',
      companyVerified: false,
      status: 'pending',
      description: 'Data analysis role for growing startup...',
      postedBy: 'company'
    }
  ]);

  // Mock data for pending services
  const [pendingServices, setPendingServices] = useState<ServiceListing[]>([
    {
      id: 1,
      providerName: 'Rajesh Kumar',
      service: 'Plumber',
      location: 'Andheri, Mumbai',
      rating: 0,
      price: '₹500/hour',
      status: 'pending',
      phone: '+91 98765 43210',
      postedDate: '1 hour ago'
    },
    {
      id: 2,
      providerName: 'Amit Electricals',
      service: 'Electrician',
      location: 'Koramangala, Bangalore',
      rating: 0,
      price: '₹600/hour',
      status: 'pending',
      phone: '+91 98765 43211',
      postedDate: '3 hours ago'
    },
    {
      id: 3,
      providerName: 'Home Clean Pro',
      service: 'Cleaning Service',
      location: 'Powai, Mumbai',
      rating: 0,
      price: '₹800/visit',
      status: 'pending',
      phone: '+91 98765 43212',
      postedDate: '6 hours ago'
    }
  ]);

  // Mock data for pending hotels
  const [pendingHotels, setPendingHotels] = useState<HotelListing[]>([
    {
      id: 1,
      name: 'Comfort Inn Express',
      location: 'Mumbai, Maharashtra',
      rating: 0,
      pricePerNight: '₹2,500',
      status: 'pending',
      postedDate: '4 hours ago',
      amenities: ['WiFi', 'AC', 'Breakfast']
    },
    {
      id: 2,
      name: 'Luxury Stays Hotel',
      location: 'Goa',
      rating: 0,
      pricePerNight: '₹4,500',
      status: 'pending',
      postedDate: '1 day ago',
      amenities: ['Pool', 'WiFi', 'Restaurant']
    }
  ]);

  const stats = [
    { label: 'Pending Approvals', value: pendingJobs.length + pendingServices.length + pendingHotels.length, change: 'New', icon: AlertCircle, color: 'from-orange-500 to-red-600' },
    { label: 'Active Jobs', value: '45', change: '+8%', icon: Briefcase, color: 'from-green-500 to-green-700' },
    { label: 'Active Services', value: '78', change: '+15%', icon: Wrench, color: 'from-purple-500 to-purple-700' },
    { label: 'Total Users', value: '15,432', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-700' }
  ];

  // Action handlers
  const handleApproveJob = (jobId: number) => {
    setPendingJobs(pendingJobs.map(job => 
      job.id === jobId ? { ...job, status: 'approved' } : job
    ));
    // In real app, this would move to approved jobs list and make it visible to users
    console.log('Job approved:', jobId);
  };

  const handleDeclineJob = (jobId: number) => {
    if (declineReason.trim()) {
      setPendingJobs(pendingJobs.filter(job => job.id !== jobId));
      setShowDeclineReason(null);
      setDeclineReason('');
      console.log('Job declined:', jobId, 'Reason:', declineReason);
    }
  };

  const handleFlagJob = (jobId: number) => {
    setPendingJobs(pendingJobs.map(job => 
      job.id === jobId ? { ...job, status: 'flagged' } : job
    ));
    console.log('Job flagged for review:', jobId);
  };

  const handleBanJob = (jobId: number) => {
    setPendingJobs(pendingJobs.map(job => 
      job.id === jobId ? { ...job, status: 'banned' } : job
    ));
    console.log('Job banned:', jobId);
  };

  // Service action handlers
  const handleApproveService = (serviceId: number) => {
    setPendingServices(pendingServices.map(service => 
      service.id === serviceId ? { ...service, status: 'approved' } : service
    ));
    console.log('Service approved:', serviceId);
  };

  const handleDeclineService = (serviceId: number) => {
    if (declineReason.trim()) {
      setPendingServices(pendingServices.filter(service => service.id !== serviceId));
      setShowDeclineReason(null);
      setDeclineReason('');
      console.log('Service declined:', serviceId);
    }
  };

  const handleFlagService = (serviceId: number) => {
    setPendingServices(pendingServices.map(service => 
      service.id === serviceId ? { ...service, status: 'flagged' } : service
    ));
    console.log('Service flagged:', serviceId);
  };

  const handleBanService = (serviceId: number) => {
    setPendingServices(pendingServices.map(service => 
      service.id === serviceId ? { ...service, status: 'banned' } : service
    ));
    console.log('Service banned:', serviceId);
  };

  // Hotel action handlers
  const handleApproveHotel = (hotelId: number) => {
    setPendingHotels(pendingHotels.map(hotel => 
      hotel.id === hotelId ? { ...hotel, status: 'approved' } : hotel
    ));
    console.log('Hotel approved:', hotelId);
  };

  const handleDeclineHotel = (hotelId: number) => {
    if (declineReason.trim()) {
      setPendingHotels(pendingHotels.filter(hotel => hotel.id !== hotelId));
      setShowDeclineReason(null);
      setDeclineReason('');
      console.log('Hotel declined:', hotelId);
    }
  };

  const handleFlagHotel = (hotelId: number) => {
    setPendingHotels(pendingHotels.map(hotel => 
      hotel.id === hotelId ? { ...hotel, status: 'flagged' } : hotel
    ));
    console.log('Hotel flagged:', hotelId);
  };

  const handleBanHotel = (hotelId: number) => {
    setPendingHotels(pendingHotels.map(hotel => 
      hotel.id === hotelId ? { ...hotel, status: 'banned' } : hotel
    ));
    console.log('Hotel banned:', hotelId);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl text-white mb-1">{stat.value}</p>
            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg text-white mb-3">Pending Approvals</h3>
        <div className="space-y-3">
          <button
            onClick={() => setActiveSection('pending-jobs')}
            className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#007BFF]" />
              <div className="text-left">
                <p className="text-white text-sm">Pending Jobs</p>
                <p className="text-gray-400 text-xs">{pendingJobs.filter(j => j.status === 'pending').length} waiting for approval</p>
              </div>
            </div>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs">
              {pendingJobs.filter(j => j.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('pending-services')}
            className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-purple-500" />
              <div className="text-left">
                <p className="text-white text-sm">Pending Services</p>
                <p className="text-gray-400 text-xs">{pendingServices.filter(s => s.status === 'pending').length} waiting for approval</p>
              </div>
            </div>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs">
              {pendingServices.filter(s => s.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('pending-hotels')}
            className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Hotel className="w-5 h-5 text-green-500" />
              <div className="text-left">
                <p className="text-white text-sm">Pending Hotels</p>
                <p className="text-gray-400 text-xs">{pendingHotels.filter(h => h.status === 'pending').length} waiting for approval</p>
              </div>
            </div>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs">
              {pendingHotels.filter(h => h.status === 'pending').length}
            </span>
          </button>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-400 text-sm mb-1">Action Required</p>
            <p className="text-gray-400 text-xs">
              You have {pendingJobs.length + pendingServices.length + pendingHotels.length} listings waiting for approval. 
              No listing is visible to users until approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPendingJobs = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg text-white">Pending Job Approvals</h3>
          <p className="text-gray-400 text-sm">{pendingJobs.filter(j => j.status === 'pending').length} jobs waiting</p>
        </div>
      </div>

      {pendingJobs.filter(job => job.status === 'pending').map((job) => (
        <div
          key={job.id}
          className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-white">{job.title}</h4>
                {job.companyVerified && (
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">📍 {job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-green-400">{job.salary}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{job.type}</span>
                </div>
              </div>

              {/* Expandable Details */}
              <button
                onClick={() => setExpandedItem(expandedItem === job.id ? null : job.id)}
                className="text-[#007BFF] text-sm flex items-center gap-1 mb-3"
              >
                {expandedItem === job.id ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    View Details
                  </>
                )}
              </button>

              {expandedItem === job.id && (
                <div className="bg-[#0A0F1C] rounded-lg p-3 mb-3">
                  <p className="text-gray-300 text-sm">{job.description}</p>
                  <div className="mt-2 pt-2 border-t border-[#1f2937]">
                    <p className="text-gray-400 text-xs">Posted by: {job.postedBy === 'company' ? job.company : 'Individual'}</p>
                    <p className="text-gray-400 text-xs">{job.postedDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decline Reason Input */}
          {showDeclineReason === job.id && (
            <div className="mb-3 space-y-2">
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Enter reason for declining..."
                rows={3}
                className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-red-500 focus:outline-none text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeclineJob(job.id)}
                  disabled={!declineReason.trim()}
                  className="flex-1 bg-red-500/20 text-red-500 px-3 py-2 rounded-lg text-sm border border-red-500/20 hover:bg-red-500/30 transition-all disabled:opacity-50"
                >
                  Confirm Decline
                </button>
                <button
                  onClick={() => {
                    setShowDeclineReason(null);
                    setDeclineReason('');
                  }}
                  className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#1f2937]">
            <button
              onClick={() => handleApproveJob(job.id)}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-2 rounded-lg text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => setShowDeclineReason(job.id)}
              className="flex-1 bg-red-500/10 text-red-500 px-3 py-2 rounded-lg text-sm border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center justify-center gap-1"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={() => handleFlagJob(job.id)}
              className="px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-all"
            >
              <Flag className="w-4 h-4 text-yellow-500" />
            </button>
            <button
              onClick={() => handleBanJob(job.id)}
              className="px-3 py-2 bg-gray-500/10 rounded-lg border border-gray-500/20 hover:bg-gray-500/20 transition-all"
            >
              <Ban className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}

      {pendingJobs.filter(j => j.status === 'pending').length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">All jobs reviewed! ✨</p>
        </div>
      )}
    </div>
  );

  const renderPendingServices = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg text-white">Pending Service Approvals</h3>
          <p className="text-gray-400 text-sm">{pendingServices.filter(s => s.status === 'pending').length} services waiting</p>
        </div>
      </div>

      {pendingServices.filter(service => service.status === 'pending').map((service) => (
        <div
          key={service.id}
          className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]"
        >
          <div className="mb-3">
            <h4 className="text-white mb-2">{service.providerName}</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-500" />
                <span className="text-gray-400 text-sm">{service.service}</span>
              </div>
              <p className="text-gray-400 text-sm">📍 {service.location}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-400">{service.price}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">📞 {service.phone}</span>
              </div>
              <p className="text-gray-500 text-xs">{service.postedDate}</p>
            </div>
          </div>

          {/* Decline Reason Input */}
          {showDeclineReason === service.id && (
            <div className="mb-3 space-y-2">
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Enter reason for declining..."
                rows={3}
                className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-red-500 focus:outline-none text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeclineService(service.id)}
                  disabled={!declineReason.trim()}
                  className="flex-1 bg-red-500/20 text-red-500 px-3 py-2 rounded-lg text-sm border border-red-500/20 hover:bg-red-500/30 transition-all disabled:opacity-50"
                >
                  Confirm Decline
                </button>
                <button
                  onClick={() => {
                    setShowDeclineReason(null);
                    setDeclineReason('');
                  }}
                  className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#1f2937]">
            <button
              onClick={() => handleApproveService(service.id)}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-2 rounded-lg text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => setShowDeclineReason(service.id)}
              className="flex-1 bg-red-500/10 text-red-500 px-3 py-2 rounded-lg text-sm border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center justify-center gap-1"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={() => handleFlagService(service.id)}
              className="px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-all"
            >
              <Flag className="w-4 h-4 text-yellow-500" />
            </button>
            <button
              onClick={() => handleBanService(service.id)}
              className="px-3 py-2 bg-gray-500/10 rounded-lg border border-gray-500/20 hover:bg-gray-500/20 transition-all"
            >
              <Ban className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}

      {pendingServices.filter(s => s.status === 'pending').length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">All services reviewed! ✨</p>
        </div>
      )}
    </div>
  );

  const renderPendingHotels = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg text-white">Pending Hotel Approvals</h3>
          <p className="text-gray-400 text-sm">{pendingHotels.filter(h => h.status === 'pending').length} hotels waiting</p>
        </div>
      </div>

      {pendingHotels.filter(hotel => hotel.status === 'pending').map((hotel) => (
        <div
          key={hotel.id}
          className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]"
        >
          <div className="mb-3">
            <h4 className="text-white mb-2">{hotel.name}</h4>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm">📍 {hotel.location}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-400">{hotel.pricePerNight}/night</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {hotel.amenities.map((amenity, idx) => (
                  <span key={idx} className="bg-[#007BFF]/20 text-[#007BFF] text-xs px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-2">{hotel.postedDate}</p>
            </div>
          </div>

          {/* Decline Reason Input */}
          {showDeclineReason === hotel.id && (
            <div className="mb-3 space-y-2">
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Enter reason for declining..."
                rows={3}
                className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-red-500 focus:outline-none text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeclineHotel(hotel.id)}
                  disabled={!declineReason.trim()}
                  className="flex-1 bg-red-500/20 text-red-500 px-3 py-2 rounded-lg text-sm border border-red-500/20 hover:bg-red-500/30 transition-all disabled:opacity-50"
                >
                  Confirm Decline
                </button>
                <button
                  onClick={() => {
                    setShowDeclineReason(null);
                    setDeclineReason('');
                  }}
                  className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#1f2937]">
            <button
              onClick={() => handleApproveHotel(hotel.id)}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-2 rounded-lg text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => setShowDeclineReason(hotel.id)}
              className="flex-1 bg-red-500/10 text-red-500 px-3 py-2 rounded-lg text-sm border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center justify-center gap-1"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
            <button
              onClick={() => handleFlagHotel(hotel.id)}
              className="px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-all"
            >
              <Flag className="w-4 h-4 text-yellow-500" />
            </button>
            <button
              onClick={() => handleBanHotel(hotel.id)}
              className="px-3 py-2 bg-gray-500/10 rounded-lg border border-gray-500/20 hover:bg-gray-500/20 transition-all"
            >
              <Ban className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}

      {pendingHotels.filter(h => h.status === 'pending').length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">All hotels reviewed! ✨</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'pending-jobs':
        return renderPendingJobs();
      case 'pending-services':
        return renderPendingServices();
      case 'pending-hotels':
        return renderPendingHotels();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Header */}
      <div className="bg-[#141A2A] border-b border-[#1f2937] px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Full Platform Control</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search listings..."
            className="w-full bg-[#0A0F1C] text-white pl-10 pr-4 py-2 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#141A2A] border-b border-[#1f2937] px-5 overflow-x-auto scrollbar-hide flex-shrink-0">
        <div className="flex gap-1 min-w-max">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'pending-jobs', label: 'Jobs', icon: Briefcase, badge: pendingJobs.filter(j => j.status === 'pending').length },
            { id: 'pending-services', label: 'Services', icon: Wrench, badge: pendingServices.filter(s => s.status === 'pending').length },
            { id: 'pending-hotels', label: 'Hotels', icon: Hotel, badge: pendingHotels.filter(h => h.status === 'pending').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-all relative ${
                activeSection === tab.id
                  ? 'text-[#007BFF] border-b-2 border-[#007BFF]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-5 py-6 pb-20">
        {renderContent()}
      </div>
    </div>
  );
}