import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Check,
  User,
  MapPin,
  Calendar,
  Search,
  Filter,
  Star,
  Clock
} from 'lucide-react';

interface ReviewedSectionProps {
  onBack: () => void;
  onViewProfile: (candidate: any) => void;
  onShortlist: (candidate: any) => void;
  onScheduleInterview: (candidate: any) => void;
  reviewedCandidates: any[];
}

export function ReviewedSection({
  onBack,
  onViewProfile,
  onShortlist,
  onScheduleInterview,
  reviewedCandidates
}: ReviewedSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJob, setFilterJob] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique jobs
  const jobs = ['all', ...Array.from(new Set(reviewedCandidates.map(c => c.appliedFor)))];

  // Filter candidates
  const filteredCandidates = reviewedCandidates.filter(candidate => {
    const matchesSearch = 
      candidate.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterJob === 'all' || candidate.appliedFor === filterJob;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-3">
      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="flex-1 bg-[#141A2A] rounded-xl p-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviewed applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 rounded-xl flex items-center justify-center transition-all ${
            showFilters || filterJob !== 'all'
              ? 'bg-[#007BFF] text-white'
              : 'bg-[#141A2A] text-gray-400'
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
          {jobs.map(job => (
            <button
              key={job}
              onClick={() => setFilterJob(job)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                filterJob === job
                  ? 'bg-[#007BFF] text-white'
                  : 'bg-[#141A2A] text-gray-400 hover:bg-[#1A2333]'
              }`}
            >
              {job === 'all' ? 'All Jobs' : job}
            </button>
          ))}
        </motion.div>
      )}

      {/* Candidates List */}
      {filteredCandidates.length > 0 ? (
        filteredCandidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#007BFF] flex items-center justify-center flex-shrink-0">
                <span className="text-white">{candidate.candidateName[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-white truncate">{candidate.candidateName}</h3>
                  <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Reviewed
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{candidate.experience}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {candidate.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {candidate.appliedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Applied For */}
            <div className="bg-[#0A0F1C] rounded-lg p-2 mb-3">
              <p className="text-gray-400 text-xs">Applied for</p>
              <p className="text-[#007BFF] text-sm">{candidate.appliedFor}</p>
            </div>

            {/* Match Score */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Match Score</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                candidate.matchScore >= 90 
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-orange-500/20 text-orange-500'
              }`}>
                {candidate.matchScore}%
              </span>
            </div>

            {/* Skills */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 4).map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#0A0F1C] text-gray-400 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 4 && (
                  <span className="text-xs bg-[#0A0F1C] text-gray-400 px-2 py-1 rounded-full">
                    +{candidate.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onShortlist(candidate)}
                className="bg-yellow-500/20 text-yellow-500 py-2 rounded-lg text-xs hover:bg-yellow-500/30 transition-all flex items-center justify-center gap-1"
              >
                <Star className="w-3 h-3" />
                Shortlist
              </button>
              <button
                onClick={() => onScheduleInterview(candidate)}
                className="bg-purple-500/20 text-purple-500 py-2 rounded-lg text-xs hover:bg-purple-500/30 transition-all flex items-center justify-center gap-1"
              >
                <Clock className="w-3 h-3" />
                Interview
              </button>
              <button
                onClick={() => onViewProfile(candidate)}
                className="bg-[#007BFF] text-white py-2 rounded-lg text-xs hover:bg-[#0066CC] transition-all"
              >
                Profile
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12">
          <Check className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No reviewed applications</p>
          <p className="text-gray-500 text-sm mt-2">
            Applications you mark as reviewed will appear here
          </p>
        </div>
      )}
    </div>
  );
}