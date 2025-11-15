import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, MapPin, DollarSign, FileText } from 'lucide-react';

interface PostJobScreenProps {
  onBack: () => void;
}

export function PostJobScreen({ onBack }: PostJobScreenProps) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle job posting
    alert('Job posted successfully! Waiting for admin approval.');
    onBack();
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">Post a Job</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Job Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <label className="text-gray-400 text-sm">Job Title</label>
          <div className="bg-[#141A2A] rounded-2xl p-4 flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-[#007BFF]" />
            <input
              type="text"
              placeholder="e.g., Frontend Developer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              required
            />
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="text-gray-400 text-sm">Location</label>
          <div className="bg-[#141A2A] rounded-2xl p-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#007BFF]" />
            <input
              type="text"
              placeholder="e.g., Mumbai, Maharashtra"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              required
            />
          </div>
        </motion.div>

        {/* Salary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-gray-400 text-sm">Salary Range</label>
          <div className="bg-[#141A2A] rounded-2xl p-4 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-[#007BFF]" />
            <input
              type="text"
              placeholder="e.g., ₹8-12 LPA"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              required
            />
          </div>
        </motion.div>

        {/* Job Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="text-gray-400 text-sm">Job Type</label>
          <div className="grid grid-cols-2 gap-2">
            {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`py-3 rounded-2xl transition-all ${
                  formData.type === type
                    ? 'bg-[#007BFF] text-white'
                    : 'bg-[#141A2A] text-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <label className="text-gray-400 text-sm">Job Description</label>
          <div className="bg-[#141A2A] rounded-2xl p-4">
            <textarea
              placeholder="Describe the role, responsibilities, and requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-transparent text-white outline-none placeholder-gray-500 min-h-[120px] resize-none"
              required
            />
          </div>
        </motion.div>

        <div className="h-20"></div>
      </form>

      {/* Submit Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-[#141A2A] px-4 py-4"
      >
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-[#007BFF] hover:bg-[#0066CC] text-white py-4 rounded-2xl transition-all shadow-lg shadow-[#007BFF]/20"
        >
          Post Job
        </button>
        <p className="text-gray-500 text-sm text-center mt-2">
          *Job will be visible after admin approval
        </p>
      </motion.div>
    </div>
  );
}
