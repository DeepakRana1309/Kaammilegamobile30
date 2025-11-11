import { ArrowLeft, Upload, Check, Building2 } from 'lucide-react';
import { useState } from 'react';

interface ApplyNowPageProps {
  job: {
    title: string;
    company: string;
  };
  onBack: () => void;
}

export function ApplyNowPage({ job, onBack }: ApplyNowPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobType: '',
    coverLetter: '',
    agreeTerms: false,
    resume: null as File | null
  });
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSubmitted(true);
        }, 300);
      }
    }, 100);
  };

  const isFormValid = formData.name && formData.email && formData.phone && 
                      formData.jobType && formData.agreeTerms && formData.resume;

  if (submitted) {
    return (
      <div className="min-h-full bg-[#0A0F1C] text-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl mb-3">Application Sent Successfully!</h2>
          <p className="text-gray-400 mb-6">
            We'll review your application and get back to you soon.
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">Apply Now</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-5">
        {/* Job Info */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div>
              <h3 className="text-white">{job.title}</h3>
              <p className="text-gray-400 text-sm">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {progress > 0 && progress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Uploading application...</span>
              <span className="text-[#007BFF]">{progress}%</span>
            </div>
            <div className="w-full bg-[#141A2A] rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Upload Resume *</label>
          <label className="block bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                <Upload className="w-5 h-5 text-[#007BFF]" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">
                  {formData.resume ? formData.resume.name : 'Choose file'}
                </p>
                <p className="text-gray-400 text-xs">PDF, DOC, DOCX (Max 5MB)</p>
              </div>
              {formData.resume && (
                <Check className="w-5 h-5 text-[#007BFF]" />
              )}
            </div>
          </label>
        </div>

        {/* Personal Details */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your.email@example.com"
            className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Preferred Job Type *</label>
          <select
            value={formData.jobType}
            onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
            className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            required
          >
            <option value="">Select job type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Cover Letter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Cover Letter (Optional)</label>
          <textarea
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            placeholder="Tell us why you're a great fit for this role..."
            rows={4}
            className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
            className="mt-1 w-4 h-4 rounded border-[#1f2937] bg-[#141A2A] text-[#007BFF] focus:ring-[#007BFF] focus:ring-offset-0"
            required
          />
          <span className="text-sm text-gray-400">
            I agree to the terms and conditions and privacy policy
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || progress > 0}
          className={`w-full py-4 rounded-xl transition-all ${
            isFormValid && progress === 0
              ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg shadow-[#007BFF]/50'
              : 'bg-[#141A2A] text-gray-500 cursor-not-allowed'
          }`}
        >
          {progress > 0 ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
