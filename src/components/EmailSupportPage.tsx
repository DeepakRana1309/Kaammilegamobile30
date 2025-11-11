import { ArrowLeft, Mail, Send, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface EmailSupportPageProps {
  onBack: () => void;
}

export function EmailSupportPage({ onBack }: EmailSupportPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
    category: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Job Related',
    'Service Booking',
    'Hotel Reservation',
    'Payment & Billing',
    'Account Issues',
    'Technical Support',
    'General Inquiry',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ email: '', subject: '', message: '', category: '' });
      }, 4000);
    }, 500);
  };

  const isFormValid = formData.email && formData.subject && formData.message && formData.category;

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
        <h1 className="text-lg flex-1">Email Support</h1>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-[#007BFF]/10 p-3 rounded-full">
              <Mail className="w-6 h-6 text-[#007BFF]" />
            </div>
            <div>
              <h3 className="text-white mb-2">Get Help via Email</h3>
              <p className="text-gray-400 text-sm">
                Send us your query and we'll respond within 24 hours during business days.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-[#007BFF]" />
            <span className="text-gray-400">Response time: 12-24 hours</span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-[#141A2A] rounded-xl p-8 border border-[#007BFF] text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl mb-2">Email Sent!</h3>
            <p className="text-gray-400 mb-4">
              We've received your message and will respond to:
            </p>
            <p className="text-[#007BFF] mb-4">{formData.email}</p>
            <p className="text-gray-400 text-sm">
              Please check your spam folder if you don't see our response.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Your Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                required
              />
              <p className="text-xs text-gray-500">We'll send our response to this address</p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subject *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What's your question about?"
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your query in detail..."
                rows={8}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                required
              />
              <p className="text-xs text-gray-500">{formData.message.length}/1000 characters</p>
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
              Send Email
            </button>
          </form>
        )}

        {/* Alternative Support */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <p className="text-gray-400 text-sm text-center mb-3">
            Need immediate help?
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-[#0A0F1C] text-[#007BFF] py-2 rounded-lg text-sm border border-[#1f2937] hover:border-[#007BFF] transition-all">
              Live Chat
            </button>
            <button className="bg-[#0A0F1C] text-[#007BFF] py-2 rounded-lg text-sm border border-[#1f2937] hover:border-[#007BFF] transition-all">
              Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
