import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Download,
  Check,
  X,
  Clock,
  Star,
  Filter,
  Search
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Application {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'interview';
  matchScore: number;
  coverLetter: string;
  resume: string;
  portfolio?: string;
}

interface ViewApplicationsPageProps {
  jobTitle: string;
  totalApplications: number;
  onBack: () => void;
  onViewProfile: (application: Application) => void;
}

const mockApplications: Application[] = [
  {
    id: '1',
    candidateName: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    experience: '3 years',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    appliedDate: '2 days ago',
    status: 'pending',
    matchScore: 95,
    coverLetter: 'I am excited to apply for this position. With 3 years of experience in React development, I have built multiple production applications...',
    resume: 'resume_rahul_sharma.pdf',
    portfolio: 'https://rahulsharma.dev'
  },
  {
    id: '2',
    candidateName: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 87654 32109',
    location: 'Pune, Maharashtra',
    experience: '4 years',
    skills: ['React', 'JavaScript', 'Redux', 'REST APIs', 'Git'],
    appliedDate: '3 days ago',
    status: 'reviewed',
    matchScore: 88,
    coverLetter: 'I have extensive experience in frontend development and have led teams in delivering enterprise applications...',
    resume: 'resume_priya_patel.pdf'
  },
  {
    id: '3',
    candidateName: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 76543 21098',
    location: 'Bangalore, Karnataka',
    experience: '5 years',
    skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Webpack'],
    appliedDate: '5 days ago',
    status: 'shortlisted',
    matchScore: 92,
    coverLetter: 'As a senior frontend developer with 5 years of experience, I specialize in building scalable React applications...',
    resume: 'resume_amit_kumar.pdf',
    portfolio: 'https://amitkumar.com'
  },
  {
    id: '4',
    candidateName: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 65432 10987',
    location: 'Hyderabad, Telangana',
    experience: '2 years',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Firebase'],
    appliedDate: '1 week ago',
    status: 'interview',
    matchScore: 85,
    coverLetter: 'I am a passionate developer who loves creating beautiful user interfaces. My portfolio showcases my work...',
    resume: 'resume_sneha_reddy.pdf',
    portfolio: 'https://snehareddy.dev'
  },
  {
    id: '5',
    candidateName: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 54321 09876',
    location: 'Delhi, India',
    experience: '6 years',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js', 'Testing'],
    appliedDate: '1 week ago',
    status: 'rejected',
    matchScore: 78,
    coverLetter: 'I bring 6 years of experience in full-stack development with a focus on React and modern web technologies...',
    resume: 'resume_vikram_singh.pdf'
  }
];

export function ViewApplicationsPage({ 
  jobTitle, 
  totalApplications, 
  onBack,
  onViewProfile 
}: ViewApplicationsPageProps) {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleStatusChange = (appId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    
    const statusMessages = {
      'shortlisted': 'Candidate shortlisted!',
      'rejected': 'Application rejected',
      'interview': 'Interview scheduled!',
      'reviewed': 'Marked as reviewed'
    };
    
    toast.success(statusMessages[newStatus] || 'Status updated');
  };

  const handleDownloadResume = (candidateName: string, resume: string) => {
    toast.success(`Downloading ${candidateName}'s resume...`);
    // In production, this would trigger actual download
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    interview: applications.filter(a => a.status === 'interview').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const getStatusColor = (status: Application['status']) => {
    const colors = {
      'pending': 'bg-orange-500/20 text-orange-500',
      'reviewed': 'bg-blue-500/20 text-blue-500',
      'shortlisted': 'bg-green-500/20 text-green-500',
      'interview': 'bg-purple-500/20 text-purple-500',
      'rejected': 'bg-red-500/20 text-red-500'
    };
    return colors[status];
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white">Applications</h1>
            <p className="text-gray-400 text-sm">{jobTitle}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
            <p className="text-white text-sm">{stats.pending}</p>
            <p className="text-gray-400 text-xs">Pending</p>
          </div>
          <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
            <p className="text-green-500 text-sm">{stats.shortlisted}</p>
            <p className="text-gray-400 text-xs">Shortlisted</p>
          </div>
          <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
            <p className="text-purple-500 text-sm">{stats.interview}</p>
            <p className="text-gray-400 text-xs">Interview</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-[#0A0F1C] rounded-xl p-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 rounded-xl flex items-center justify-center transition-all ${
              showFilters || filterStatus !== 'all'
                ? 'bg-[#007BFF] text-white'
                : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 overflow-x-auto pb-2"
          >
            {['all', 'pending', 'reviewed', 'shortlisted', 'interview', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-[#007BFF] text-white'
                    : 'bg-[#0A0F1C] text-gray-400 hover:bg-[#141A2A]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Applications List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0">
                  <span className="text-white">{app.candidateName[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white truncate">{app.candidateName}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      app.matchScore >= 90 
                        ? 'bg-green-500/20 text-green-500'
                        : app.matchScore >= 80
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {app.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{app.experience} experience</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {app.appliedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#0A0F1C] rounded-lg p-3 mb-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{app.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{app.phone}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-3">
                <p className="text-gray-400 text-xs mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {app.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#0A0F1C] text-gray-400 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-3">
                <span className={`text-xs px-3 py-1.5 rounded-full ${getStatusColor(app.status)}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={() => onViewProfile(app)}
                  className="bg-[#007BFF] text-white py-2 rounded-xl text-sm hover:bg-[#0066CC] transition-all"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleDownloadResume(app.candidateName, app.resume)}
                  className="bg-[#0A0F1C] text-gray-400 py-2 rounded-xl text-sm hover:bg-[#141A2A] transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleStatusChange(app.id, 'shortlisted')}
                  disabled={app.status === 'shortlisted'}
                  className="bg-green-500/20 text-green-500 py-2 rounded-lg text-xs hover:bg-green-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <Star className="w-3 h-3" />
                  Shortlist
                </button>
                <button
                  onClick={() => handleStatusChange(app.id, 'interview')}
                  disabled={app.status === 'interview'}
                  className="bg-purple-500/20 text-purple-500 py-2 rounded-lg text-xs hover:bg-purple-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  Interview
                </button>
                <button
                  onClick={() => handleStatusChange(app.id, 'reviewed')}
                  disabled={app.status === 'reviewed'}
                  className="bg-blue-500/20 text-blue-500 py-2 rounded-lg text-xs hover:bg-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Review
                </button>
                <button
                  onClick={() => handleStatusChange(app.id, 'rejected')}
                  disabled={app.status === 'rejected'}
                  className="bg-red-500/20 text-red-500 py-2 rounded-lg text-xs hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Reject
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
}
