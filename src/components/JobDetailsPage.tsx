import { ArrowLeft, MapPin, Clock, Bookmark, Briefcase, Share2, MessageCircle, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  time: string;
  type: string;
}

interface JobDetailsPageProps {
  job: Job;
  onBack: () => void;
  onApplyClick: () => void;
}

export function JobDetailsPage({ job, onBack, onApplyClick }: JobDetailsPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  const responsibilities = [
    'Develop and maintain app interfaces using modern frameworks',
    'Collaborate with UI/UX designers to implement responsive designs',
    'Fix bugs and improve application performance',
    'Write clean, maintainable, and well-documented code',
    'Knowledge of React / Node.js preferred'
  ];

  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Communication',
    'Problem Solving',
    'Team Work'
  ];

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white relative flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">Job Details</h1>
        <button className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Job Header Section */}
        <div className="px-5 pt-6 pb-4 border-b border-[#1f2937]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl mb-2">{job.title}</h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-[#141A2A] rounded-lg flex items-center justify-center border border-[#1f2937]">
                  <Building2 className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-gray-300">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.time}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-full border transition-all ${
                isBookmarked 
                  ? 'bg-[#007BFF] border-[#007BFF]' 
                  : 'bg-[#141A2A] border-[#1f2937] hover:border-[#007BFF]'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-white fill-white' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        {/* Salary & Job Type Section */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937]">
              <div className="text-[#007BFF] text-sm mb-1">Salary</div>
              <div className="text-white">{job.salary}</div>
            </div>
            <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937]">
              <div className="text-[#007BFF] text-sm mb-1">Job Type</div>
              <div className="text-white">{job.type}</div>
            </div>
            <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937]">
              <div className="text-[#007BFF] text-sm mb-1">Experience</div>
              <div className="text-white">1-3 yrs</div>
            </div>
          </div>
        </div>

        {/* Job Description Section */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <h3 className="text-lg mb-3">About the Job</h3>
          <div className="space-y-3">
            {responsibilities.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#007BFF] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <h3 className="text-lg mb-3">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#007BFF]/10 text-[#007BFF] px-3 py-2 rounded-full text-sm border border-[#007BFF]/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Company Info Section */}
        <div className="px-5 py-5">
          <h3 className="text-lg mb-3">About Company</h3>
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#0A0F1C] rounded-lg flex items-center justify-center border border-[#1f2937]">
                <Building2 className="w-6 h-6 text-[#007BFF]" />
              </div>
              <div>
                <h4 className="text-white mb-1">{job.company}</h4>
                <p className="text-gray-400 text-sm">Technology Company</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Leading technology company focused on building innovative solutions for modern businesses. 
              We foster a culture of creativity and excellence.
            </p>
            
            {/* Expandable Company Details */}
            <button 
              onClick={() => setShowCompanyDetails(!showCompanyDetails)}
              className="w-full bg-[#141A2A] text-[#007BFF] py-3 rounded-lg border border-[#007BFF] hover:bg-[#007BFF]/10 transition-all flex items-center justify-center gap-2"
            >
              View Company Profile
              {showCompanyDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showCompanyDetails && (
              <div className="mt-4 pt-4 border-t border-[#1f2937] space-y-3 animate-in slide-in-from-top">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Founded</span>
                  <span className="text-white">2015</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Employees</span>
                  <span className="text-white">500-1000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Industry</span>
                  <span className="text-white">Technology</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Website</span>
                  <span className="text-[#007BFF]">www.company.com</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Jobs Section */}
        <div className="px-5 py-5">
          <h3 className="text-lg mb-3">Similar Jobs</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] min-w-[280px] hover:border-[#007BFF] transition-all cursor-pointer"
              >
                <h4 className="text-white mb-1">Senior Developer</h4>
                <p className="text-gray-400 text-sm mb-2">Tech Corp</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span>Remote</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <button className="fixed bottom-32 right-8 bg-gradient-to-r from-[#007BFF] to-[#0056b3] p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-10">
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#141A2A] border-t border-[#1f2937] px-5 py-4 flex gap-3">
        <button 
          onClick={onApplyClick}
          className="flex-1 bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Briefcase className="w-5 h-5" />
          Apply Now
        </button>
        <button 
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="px-5 bg-[#141A2A] text-[#007BFF] py-3 rounded-xl border border-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Share Menu Popup */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in" onClick={() => setShowShareMenu(false)}>
          <div className="bg-[#141A2A] rounded-t-3xl w-full max-w-[390px] p-6 animate-in slide-in-from-bottom" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg mb-4 text-white">Share Job</h3>
            <div className="grid grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">W</span>
                </div>
                <span className="text-xs text-gray-400">WhatsApp</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">T</span>
                </div>
                <span className="text-xs text-gray-400">Twitter</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">L</span>
                </div>
                <span className="text-xs text-gray-400">LinkedIn</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#007BFF] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">C</span>
                </div>
                <span className="text-xs text-gray-400">Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}