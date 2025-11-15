import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Filter, MapPin, Briefcase } from 'lucide-react';
import { Job } from '../App';

interface JobListingScreenProps {
  onJobSelect: (job: Job) => void;
  onBack: () => void;
}

export function JobListingScreen({ onJobSelect, onBack }: JobListingScreenProps) {
  const [showFilters, setShowFilters] = useState(false);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc',
      location: 'Mumbai, Maharashtra',
      salary: '₹8-12 LPA',
      type: 'Full-time',
      description: 'Looking for React developer',
      requirements: ['React', 'TypeScript', 'Tailwind'],
      postedDate: '2 days ago',
    },
    // Add more jobs...
  ];

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">All Jobs</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
        >
          <Filter className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="bg-[#141A2A] px-4 py-3 space-y-2 overflow-hidden"
        >
          <div className="flex gap-2 overflow-x-auto">
            {['Full-time', 'Part-time', 'Remote', 'Onsite'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-[#0A0F1C] text-gray-400 rounded-full whitespace-nowrap hover:bg-[#007BFF] hover:text-white transition-all text-sm"
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Job List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {jobs.map((job, index) => (
          <motion.button
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onJobSelect(job)}
            className="w-full bg-[#141A2A] rounded-2xl p-4 text-left hover:bg-[#1A2332] transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-[#007BFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">{job.title}</h3>
                  <p className="text-gray-400 text-sm">{job.company}</p>
                </div>
              </div>
              <span className="text-[#007BFF] text-sm bg-[#007BFF]/10 px-3 py-1 rounded-full">
                {job.type}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#007BFF]">{job.salary}</span>
              <span className="text-xs text-gray-500">{job.postedDate}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
