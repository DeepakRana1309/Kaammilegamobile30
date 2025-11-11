import { ArrowLeft, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactUsPageProps {
  onBack: () => void;
}

export function ContactUsPage({ onBack }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }, 500);
  };

  const isFormValid = formData.name && formData.email && formData.message;

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
        <h1 className="text-lg flex-1">Contact Us</h1>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Contact Info Cards */}
        <div className="space-y-3">
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <div className="flex items-center gap-3">
              <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                <Phone className="w-5 h-5 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Phone</p>
                <p className="text-white">+91 1800-XXX-XXXX</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <div className="flex items-center gap-3">
              <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                <Mail className="w-5 h-5 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Email</p>
                <p className="text-white">support@kaammilega.com</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <div className="flex items-center gap-3">
              <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                <MapPin className="w-5 h-5 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Address</p>
                <p className="text-white">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <div className="flex items-center gap-3">
              <div className="bg-[#007BFF]/10 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Business Hours</p>
                <p className="text-white">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-lg mb-4">Send us a message</h2>
          
          {submitted ? (
            <div className="bg-[#141A2A] rounded-xl p-8 border border-[#007BFF] text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2">Message Sent!</h3>
              <p className="text-gray-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email *</label>
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
                <label className="text-sm text-gray-400">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Subject (Optional)</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What is this regarding?"
                  className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg'
                    : 'bg-[#141A2A] text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
