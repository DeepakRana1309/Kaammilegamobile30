import { Search, MapPin, Briefcase, Clock, DollarSign, User } from 'lucide-react';

interface JobsPageProps {
  onJobClick: (job: any) => void;
  onProfileClick: () => void;
}

export function JobsPage({ onJobClick, onProfileClick }: JobsPageProps) {
  const jobsNearYou = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Ltd',
      salary: '₹6-10 LPA',
      location: 'Mumbai, Maharashtra',
      time: '2h ago',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studios',
      salary: '₹5-8 LPA',
      location: 'Bangalore, Karnataka',
      time: '5h ago',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Corp',
      salary: '₹7-12 LPA',
      location: 'Pune, Maharashtra',
      time: '1d ago',
      type: 'Remote'
    }
  ];

  const skillBasedJobs = [
    {
      id: 4,
      title: 'React Developer',
      company: 'StartupHub Inc',
      salary: '₹8-15 LPA',
      location: 'Hyderabad, Telangana',
      time: '3h ago',
      type: 'Hybrid'
    },
    {
      id: 5,
      title: 'Product Designer',
      company: 'Design First',
      salary: '₹6-9 LPA',
      location: 'Delhi NCR',
      time: '6h ago',
      type: 'Full-time'
    }
  ];

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl mb-1">Kaam Milega</h1>
          <p className="text-gray-400 text-sm">Find your dream job</p>
        </div>
        <button 
          onClick={onProfileClick}
          className="bg-[#141A2A] p-2.5 rounded-full border border-[#1f2937] hover:border-[#007BFF] transition-all"
        >
          <User className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search job title or keyword"
            className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
          />
        </div>
        <div className="mt-3">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Jobs Near You */}
      <div className="px-5 mb-6">
        <h2 className="text-lg mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#007BFF]" />
          Jobs Near You
        </h2>
        <div className="space-y-3">
          {jobsNearYou.map((job) => (
            <div
              key={job.id}
              onClick={() => onJobClick(job)}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{job.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{job.company}</p>
                </div>
                <span className="bg-[#007BFF]/10 text-[#007BFF] text-xs px-2 py-1 rounded-md">
                  {job.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Clock className="w-3 h-3" />
                <span>{job.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Based on Your Skills */}
      <div className="px-5 pb-6">
        <h2 className="text-lg mb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#007BFF]" />
          Jobs Based on Your Skills
        </h2>
        <div className="space-y-3">
          {skillBasedJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onJobClick(job)}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{job.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{job.company}</p>
                </div>
                <span className="bg-[#007BFF]/10 text-[#007BFF] text-xs px-2 py-1 rounded-md">
                  {job.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                <Clock className="w-3 h-3" />
                <span>{job.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}