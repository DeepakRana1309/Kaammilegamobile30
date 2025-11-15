import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Users,
  Star,
  Eye,
  Clock,
  Check,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  User,
  X,
  ArrowLeft,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Menu,
  Bell,
  FileCheck
} from 'lucide-react';
import { Job } from '../App';
import { ViewApplicationsPage } from './company/ViewApplicationsPage';
import { CandidateProfilePage } from './company/CandidateProfilePage';
import { EditJobPage } from './company/EditJobPage';
import { ScheduleInterviewPage, InterviewData } from './company/ScheduleInterviewPage';
import { ShortlistSection } from './company/ShortlistSection';
import { ReviewedSection } from './company/ReviewedSection';

interface CompanyDashboardProps {
  userName: string;
  companyName: string;
  onNavigate: (screen: string) => void;
  onJobSelect?: (job: Job) => void;
}

interface JobAnalytics extends Job {
  views: number;
  applications: number;
  interested: number;
  shortlisted: number;
}

interface Candidate {
  id: string;
  candidateName: string;
  skills: string[];
  experience: string;
  location: string;
  matchScore: number;
  appliedFor: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'interview';
  email: string;
  phone: string;
  appliedDate: string;
  coverLetter: string;
}

// Mock data
const companyJobs: JobAnalytics[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Your Company',
    location: 'Mumbai, Maharashtra',
    salary: '₹8-12 LPA',
    type: 'Full-time',
    description: 'Looking for React developer',
    requirements: ['React', 'TypeScript', 'Tailwind'],
    postedDate: '2 days ago',
    status: 'approved',
    views: 234,
    applications: 45,
    interested: 89,
    shortlisted: 12,
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Your Company',
    location: 'Mumbai, Maharashtra',
    salary: '₹9-14 LPA',
    type: 'Full-time',
    description: 'Node.js backend developer needed',
    requirements: ['Node.js', 'MongoDB', 'Express'],
    postedDate: '5 days ago',
    status: 'approved',
    views: 178,
    applications: 32,
    interested: 67,
    shortlisted: 8,
  },
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    candidateName: 'Rahul Sharma',
    email: 'rahul@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    experience: '3 years',
    skills: ['React', 'TypeScript', 'Node.js'],
    appliedDate: '2 days ago',
    status: 'new',
    matchScore: 95,
    appliedFor: 'Frontend Developer',
    coverLetter: 'I am excited to apply...'
  },
  {
    id: '2',
    candidateName: 'Priya Patel',
    email: 'priya@email.com',
    phone: '+91 87654 32109',
    location: 'Pune, Maharashtra',
    experience: '4 years',
    skills: ['React', 'JavaScript', 'Redux'],
    appliedDate: '3 days ago',
    status: 'reviewed',
    matchScore: 88,
    appliedFor: 'Frontend Developer',
    coverLetter: 'I have extensive experience...'
  },
  {
    id: '3',
    candidateName: 'Amit Kumar',
    email: 'amit@email.com',
    phone: '+91 76543 21098',
    location: 'Bangalore, Karnataka',
    experience: '5 years',
    skills: ['React', 'Vue.js', 'Angular'],
    appliedDate: '5 days ago',
    status: 'shortlisted',
    matchScore: 92,
    appliedFor: 'Frontend Developer',
    coverLetter: 'As a senior developer...'
  },
];

type TabType = 'jobs' | 'candidates' | 'shortlisted' | 'reviewed' | 'interviews';
type ViewType = 'dashboard' | 'applications' | 'profile' | 'edit' | 'schedule';

export function CompanyDashboard({ userName, companyName, onNavigate }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedJob, setSelectedJob] = useState<JobAnalytics | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<JobAnalytics[]>(companyJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [interviews, setInterviews] = useState<InterviewData[]>([]);
  const [activeJobMenu, setActiveJobMenu] = useState<string | null>(null);
  
  // Filter candidates by status
  const shortlistedCandidates = candidates.filter(c => c.status === 'shortlisted');
  const reviewedCandidates = candidates.filter(c => c.status === 'reviewed');
  const interviewCandidates = candidates.filter(c => c.status === 'interview');
  const activeCandidates = candidates.filter(c => c.status !== 'rejected');

  // Calculate total analytics
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0);
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);
  const totalInterested = jobs.reduce((sum, job) => sum + job.interested, 0);

  const handleViewApplications = (job: JobAnalytics) => {
    setSelectedJob(job);
    setCurrentView('applications');
  };

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView('profile');
  };

  const handleEditJob = (job: JobAnalytics) => {
    setSelectedJob(job);
    setCurrentView('edit');
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView('schedule');
  };

  const handleInterviewScheduled = (interviewData: InterviewData) => {
    setInterviews([...interviews, interviewData]);
    // Update candidate status
    setCandidates(candidates.map(c =>
      c.id === interviewData.candidateId ? { ...c, status: 'interview' } : c
    ));
    setCurrentView('dashboard');
  };

  const handleShortlist = (candidate: Candidate) => {
    setCandidates(candidates.map(c =>
      c.id === candidate.id ? { ...c, status: 'shortlisted' } : c
    ));
  };

  const handleMarkReviewed = (candidate: Candidate) => {
    setCandidates(candidates.map(c =>
      c.id === candidate.id ? { ...c, status: 'reviewed' } : c
    ));
  };

  const handleSaveJob = (updatedJob: JobAnalytics) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    setCurrentView('dashboard');
  };

  const handleDeleteJob = () => {
    if (selectedJob) {
      setJobs(jobs.filter(j => j.id !== selectedJob.id));
      setCurrentView('dashboard');
    }
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setSelectedJob(null);
    setSelectedCandidate(null);
  };

  // Render different views
  if (currentView === 'applications' && selectedJob) {
    return (
      <ViewApplicationsPage
        jobTitle={selectedJob.title}
        totalApplications={selectedJob.applications}
        onBack={handleBack}
        onViewProfile={handleViewProfile}
      />
    );
  }

  if (currentView === 'profile' && selectedCandidate) {
    return (
      <CandidateProfilePage
        candidate={selectedCandidate}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'edit' && selectedJob) {
    return (
      <EditJobPage
        job={selectedJob}
        onBack={handleBack}
        onSave={handleSaveJob}
        onDelete={handleDeleteJob}
      />
    );
  }

  if (currentView === 'schedule' && selectedCandidate) {
    return (
      <ScheduleInterviewPage
        candidate={selectedCandidate}
        jobTitle={selectedCandidate.appliedFor}
        onBack={handleBack}
        onSchedule={handleInterviewScheduled}
      />
    );
  }

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141A2A] to-[#0A0F1C] px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('sidebar')}
              className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-white">{companyName}</h1>
              <p className="text-gray-400 text-sm">Company Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('notifications')}
              className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center relative"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center"
            >
              <span className="text-white">{companyName[0]}</span>
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#0A0F1C] rounded-xl p-3 text-center">
            <Eye className="w-5 h-5 text-[#007BFF] mx-auto mb-2" />
            <p className="text-white">{totalViews}</p>
            <p className="text-gray-400 text-xs">Total Views</p>
          </div>
          <div className="bg-[#0A0F1C] rounded-xl p-3 text-center">
            <FileCheck className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <p className="text-white">{totalApplications}</p>
            <p className="text-gray-400 text-xs">Applications</p>
          </div>
          <div className="bg-[#0A0F1C] rounded-xl p-3 text-center">
            <Star className="w-5 h-5 text-orange-500 mx-auto mb-2" />
            <p className="text-white">{totalInterested}</p>
            <p className="text-gray-400 text-xs">Interested</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'jobs'
                ? 'bg-[#007BFF] text-white'
                : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            My Job Listings
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'candidates'
                ? 'bg-[#007BFF] text-white'
                : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Users className="w-4 h-4" />
            Candidates
          </button>
          <button
            onClick={() => setActiveTab('shortlisted')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'shortlisted'
                ? 'bg-[#007BFF] text-white'
                : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Star className="w-4 h-4" />
            Shortlisted
            {shortlistedCandidates.length > 0 && (
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs">
                {shortlistedCandidates.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviewed')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'reviewed'
                ? 'bg-[#007BFF] text-white'
                : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Check className="w-4 h-4" />
            Reviewed
            {reviewedCandidates.length > 0 && (
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
                {reviewedCandidates.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'interviews'
                ? 'bg-[#007BFF] text-white'
                : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            Interviews
            {interviews.length > 0 && (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                {interviews.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'jobs' && (
          <div className="space-y-3">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141A2A] rounded-2xl p-4"
              >
                <h3 className="text-white mb-2">{job.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{job.location}</p>
                
                {/* Analytics */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
                    <p className="text-[#007BFF] text-sm">{job.views}</p>
                    <p className="text-gray-500 text-xs">Views</p>
                  </div>
                  <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
                    <p className="text-green-500 text-sm">{job.applications}</p>
                    <p className="text-gray-500 text-xs">Applied</p>
                  </div>
                  <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
                    <p className="text-orange-500 text-sm">{job.interested}</p>
                    <p className="text-gray-500 text-xs">Interest</p>
                  </div>
                  <div className="bg-[#0A0F1C] rounded-lg p-2 text-center">
                    <p className="text-blue-500 text-sm">{job.shortlisted}</p>
                    <p className="text-gray-500 text-xs">Shortlist</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewApplications(job)}
                    className="flex-1 bg-[#007BFF] text-white py-2 rounded-xl text-sm"
                  >
                    View Applications
                  </button>
                  <button
                    onClick={() => handleEditJob(job)}
                    className="px-4 bg-[#0A0F1C] text-gray-400 py-2 rounded-xl text-sm"
                  >
                    Edit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-3">
            {activeCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#141A2A] rounded-2xl p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0">
                    <span className="text-white">{candidate.candidateName[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white">{candidate.candidateName}</h3>
                    <p className="text-gray-400 text-sm">{candidate.experience}</p>
                    <p className="text-[#007BFF] text-xs">{candidate.appliedFor}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(candidate)}
                    className="flex-1 bg-[#007BFF] text-white py-2 rounded-xl text-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleShortlist(candidate)}
                    className="px-4 bg-yellow-500/20 text-yellow-500 py-2 rounded-xl text-sm"
                  >
                    Shortlist
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'shortlisted' && (
          <ShortlistSection
            onBack={handleBack}
            onViewProfile={handleViewProfile}
            onScheduleInterview={handleScheduleInterview}
            shortlistedCandidates={shortlistedCandidates}
          />
        )}

        {activeTab === 'reviewed' && (
          <ReviewedSection
            onBack={handleBack}
            onViewProfile={handleViewProfile}
            onShortlist={handleShortlist}
            onScheduleInterview={handleScheduleInterview}
            reviewedCandidates={reviewedCandidates}
          />
        )}

        {activeTab === 'interviews' && (
          <div className="space-y-3">
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#141A2A] rounded-2xl p-4"
                >
                  <h3 className="text-white mb-2">{interview.candidateName}</h3>
                  <p className="text-gray-400 text-sm mb-2">{interview.jobTitle}</p>
                  <div className="bg-[#0A0F1C] rounded-lg p-3 space-y-1 text-sm">
                    <p className="text-gray-400">📅 {interview.date}</p>
                    <p className="text-gray-400">⏰ {interview.time}</p>
                    <p className="text-gray-400">📍 {interview.type}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No interviews scheduled</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => onNavigate('post-job')}
        className="absolute bottom-6 right-6 w-14 h-14 bg-[#007BFF] rounded-full flex items-center justify-center shadow-lg shadow-[#007BFF]/30"
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}