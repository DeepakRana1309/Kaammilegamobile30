import { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  LogOut,
  Search,
  Building2
} from 'lucide-react';

interface CompanyDashboardProps {
  onLogout: () => void;
  companyName: string;
}

export function CompanyDashboard({ onLogout, companyName }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'add-job'>('overview');
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    skills: ''
  });

  // Mock data for company's posted jobs
  const postedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      location: 'Mumbai, Maharashtra',
      type: 'Full-time',
      salary: '₹8-12 LPA',
      postedDate: '2 days ago',
      status: 'approved',
      views: 234,
      applications: 45
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      salary: '₹15-20 LPA',
      postedDate: '5 days ago',
      status: 'pending',
      views: 0,
      applications: 0
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      salary: '₹6-10 LPA',
      postedDate: '1 week ago',
      status: 'approved',
      views: 189,
      applications: 32
    }
  ];

  const stats = [
    { label: 'Active Jobs', value: '2', icon: Briefcase, color: 'from-blue-500 to-blue-700' },
    { label: 'Total Applications', value: '77', icon: Users, color: 'from-green-500 to-green-700' },
    { label: 'Pending Approval', value: '1', icon: Clock, color: 'from-orange-500 to-red-600' },
    { label: 'Total Views', value: '423', icon: Eye, color: 'from-purple-500 to-purple-700' }
  ];

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job submitted for approval:', jobForm);
    setShowAddJobForm(false);
    setJobForm({
      title: '',
      location: '',
      type: 'Full-time',
      experience: '',
      salary: '',
      description: '',
      requirements: '',
      skills: ''
    });
    // Reset to jobs tab to show pending job
    setActiveTab('jobs');
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
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg text-white mb-3">Quick Actions</h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowAddJobForm(true)}
            className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white p-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className="w-full bg-[#141A2A] text-white p-4 rounded-xl border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            View Applications
          </button>
        </div>
      </div>

      {/* Recent Jobs */}
      <div>
        <h3 className="text-lg text-white mb-3">Recent Jobs</h3>
        <div className="space-y-3">
          {postedJobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{job.title}</h4>
                  <p className="text-gray-400 text-sm">{job.location}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  job.status === 'approved'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {job.status === 'approved' ? 'Active' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {job.views}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {job.applications}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-white">Your Posted Jobs</h3>
        <button
          onClick={() => setShowAddJobForm(true)}
          className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Post Job
        </button>
      </div>

      {postedJobs.map((job) => (
        <div
          key={job.id}
          className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-white">{job.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  job.status === 'approved'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {job.status === 'approved' ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Approved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Pending
                    </span>
                  )}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-400">📍 {job.location}</p>
                <div className="flex items-center gap-3">
                  <span className="text-green-400">{job.salary}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{job.type}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#1f2937]">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {job.views} views
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.applications} applications
              </span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-[#007BFF]" />
              </button>
              <button className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderApplications = () => (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400 mb-2">No applications yet</p>
      <p className="text-gray-500 text-sm">Applications will appear here once candidates apply</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Header */}
      <div className="bg-[#141A2A] border-b border-[#1f2937] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg text-white">{companyName}</h1>
              <p className="text-gray-400 text-sm">Company Dashboard</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#141A2A] border-b border-[#1f2937] px-5">
        <div className="flex gap-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'jobs', label: 'Posted Jobs' },
            { id: 'applications', label: 'Applications' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm transition-all ${
                activeTab === tab.id
                  ? 'text-[#007BFF] border-b-2 border-[#007BFF]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-5 py-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'jobs' && renderJobs()}
        {activeTab === 'applications' && renderApplications()}
      </div>

      {/* Add Job Modal */}
      {showAddJobForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in">
          <div className="bg-[#141A2A] rounded-t-3xl w-full max-w-[390px] max-h-[90%] flex flex-col animate-in slide-in-from-bottom">
            <div className="px-5 py-4 border-b border-[#1f2937] flex items-center justify-between">
              <h3 className="text-white text-lg">Post New Job</h3>
              <button
                onClick={() => setShowAddJobForm(false)}
                className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmitJob} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Senior React Developer"
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Location *</label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Job Type *</label>
                <select
                  value={jobForm.type}
                  onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Experience Required *</label>
                <input
                  type="text"
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  placeholder="e.g. 3-5 years"
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Salary Range *</label>
                <input
                  type="text"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  placeholder="e.g. ₹8-12 LPA"
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Job Description *</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Describe the role and responsibilities..."
                  rows={4}
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Requirements</label>
                <textarea
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="List key requirements..."
                  rows={3}
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Skills Required</label>
                <input
                  type="text"
                  value={jobForm.skills}
                  onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-400 text-sm">
                  ℹ️ Your job posting will be reviewed by our admin team before going live. This usually takes 2-4 hours.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-4 rounded-xl hover:shadow-lg transition-all"
              >
                Submit for Approval
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
