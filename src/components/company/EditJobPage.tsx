import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  FileText,
  Plus,
  X,
  Save,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditJobPageProps {
  job: any;
  onBack: () => void;
  onSave: (updatedJob: any) => void;
  onDelete: () => void;
}

export function EditJobPage({ job, onBack, onSave, onDelete }: EditJobPageProps) {
  const [formData, setFormData] = useState({
    title: job.title,
    location: job.location,
    salary: job.salary,
    type: job.type,
    description: job.description,
    requirements: [...job.requirements],
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.location || !formData.salary || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.requirements.length === 0) {
      toast.error('Please add at least one requirement');
      return;
    }

    onSave({ ...job, ...formData });
    toast.success('Job updated successfully!');
    setTimeout(() => onBack(), 500);
  };

  const handleDelete = () => {
    onDelete();
    toast.success('Job deleted successfully');
    setTimeout(() => onBack(), 500);
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white">Edit Job</h1>
        </div>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {/* Job Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Frontend Developer"
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
            />
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Mumbai, Maharashtra"
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
            />
          </motion.div>

          {/* Salary & Type */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <label className="text-white text-sm mb-2 block flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Salary *
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g. ₹8-12 LPA"
                className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <label className="text-white text-sm mb-2 block flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Job Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none h-32 resize-none"
            />
          </motion.div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-3 block">Requirements *</label>
            
            {/* Existing Requirements */}
            <div className="space-y-2 mb-3">
              {formData.requirements.map((req, index) => (
                <div
                  key={index}
                  className="bg-[#0A0F1C] rounded-xl p-3 flex items-center justify-between"
                >
                  <span className="text-gray-300 text-sm">{req}</span>
                  <button
                    onClick={() => handleRemoveRequirement(index)}
                    className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Requirement */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()}
                placeholder="Add a requirement..."
                className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              />
              <button
                onClick={handleAddRequirement}
                className="w-12 h-12 bg-[#007BFF] rounded-xl flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Job Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-sm mb-1">Job Status</h3>
                <p className="text-gray-400 text-xs">Currently accepting applications</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-500">Active</span>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-[#141A2A] px-4 py-4">
        <button
          onClick={handleSave}
          className="w-full bg-[#007BFF] text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0066CC] transition-all shadow-lg shadow-[#007BFF]/20"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#141A2A] rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-white text-lg mb-2">Delete Job Posting?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone. All applications for this job will also be removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-[#0A0F1C] text-gray-400 py-3 rounded-xl hover:bg-[#141A2A] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
