import { ArrowLeft, AlertCircle, Upload, Camera, Send } from 'lucide-react';
import { useState } from 'react';

interface ReportIssuePageProps {
  onBack: () => void;
}

export function ReportIssuePage({ onBack }: ReportIssuePageProps) {
  const [formData, setFormData] = useState({
    issueType: '',
    subject: '',
    description: '',
    priority: 'medium',
    screenshot: null as File | null
  });
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    'Technical Issue',
    'Payment Problem',
    'Account Access',
    'Job Application Issue',
    'Service Booking Problem',
    'Hotel Reservation Issue',
    'Profile Error',
    'Other'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          issueType: '',
          subject: '',
          description: '',
          priority: 'medium',
          screenshot: null
        });
      }, 3000);
    }, 500);
  };

  const isFormValid = formData.issueType && formData.subject && formData.description;

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
        <h1 className="text-lg flex-1">Report an Issue</h1>
      </div>

      <div className="px-5 py-6">
        {submitted ? (
          <div className="bg-[#141A2A] rounded-xl p-8 border border-[#007BFF] text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl mb-2">Report Submitted!</h3>
            <p className="text-gray-400 mb-4">
              Ticket #KM{Math.floor(Math.random() * 10000)}
            </p>
            <p className="text-gray-400 text-sm">
              Our team will investigate and get back to you within 24-48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Alert Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-200 text-sm">
                Please provide as much detail as possible to help us resolve your issue quickly.
              </p>
            </div>

            {/* Issue Type */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Issue Type *</label>
              <select
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                required
              >
                <option value="">Select issue type</option>
                {issueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Priority Level *</label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority })}
                    className={`px-4 py-3 rounded-xl text-sm capitalize transition-all ${
                      formData.priority === priority
                        ? priority === 'high'
                          ? 'bg-red-500/20 text-red-500 border border-red-500'
                          : priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500'
                          : 'bg-blue-500/20 text-blue-500 border border-blue-500'
                        : 'bg-[#141A2A] text-gray-400 border border-[#1f2937]'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subject *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of the issue"
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Detailed Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please describe the issue in detail. Include steps to reproduce if applicable..."
                rows={6}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Screenshot Upload */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Screenshot (Optional)</label>
              <label className="block bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                    {formData.screenshot ? (
                      <Camera className="w-5 h-5 text-[#007BFF]" />
                    ) : (
                      <Upload className="w-5 h-5 text-[#007BFF]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      {formData.screenshot ? formData.screenshot.name : 'Upload screenshot'}
                    </p>
                    <p className="text-gray-400 text-xs">PNG, JPG (Max 5MB)</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg shadow-[#007BFF]/50'
                  : 'bg-[#141A2A] text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              Submit Report
            </button>

            <p className="text-xs text-gray-500 text-center">
              You'll receive a ticket number and email confirmation once submitted.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
