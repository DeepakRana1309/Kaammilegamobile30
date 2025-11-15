import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Upload, MapPin, Users, Globe, Phone, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CompanyProfileSetupProps {
  userName: string;
  onComplete: (profileData: CompanyProfile) => void;
}

export interface CompanyProfile {
  companyName: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  phone: string;
  email: string;
  description: string;
  logo: string | null;
}

export function CompanyProfileSetup({ userName, onComplete }: CompanyProfileSetupProps) {
  const [formData, setFormData] = useState<CompanyProfile>({
    companyName: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    phone: '',
    email: '',
    description: '',
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'E-commerce',
    'Manufacturing',
    'Consulting',
    'Real Estate',
    'Media & Entertainment',
    'Retail',
    'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData({ ...formData, logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.industry || !formData.size || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Company profile created successfully!');
    onComplete(formData);
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] overflow-y-auto">
      <div className="px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-[#007BFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-2xl mb-2">Company Profile Setup</h1>
          <p className="text-gray-400">Tell us about your company</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141A2A] rounded-2xl p-6"
          >
            <label className="block text-white mb-3">Company Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#0A0F1C] flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="bg-[#007BFF] text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#0066CC] transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                </div>
              </label>
            </div>
            <p className="text-gray-500 text-xs mt-2">Max size: 5MB (JPG, PNG)</p>
          </motion.div>

          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Enter company name"
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              required
            />
          </motion.div>

          {/* Industry & Size */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <label className="text-white text-sm mb-2 block">Industry *</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
                required
              >
                <option value="">Select</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <label className="text-white text-sm mb-2 block flex items-center gap-2">
                <Users className="w-4 h-4" />
                Size *
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
                required
              >
                <option value="">Select</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
              placeholder="City, State, Country"
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              required
            />
          </motion.div>

          {/* Website */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://www.example.com"
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
            />
          </motion.div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <label className="text-white text-sm mb-2 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 1234567890"
                className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#141A2A] rounded-2xl p-4"
            >
              <label className="text-white text-sm mb-2 block flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@company.com"
                className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-[#141A2A] rounded-2xl p-4"
          >
            <label className="text-white text-sm mb-2 block">About Company</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description about your company..."
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none h-24 resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            type="submit"
            className="w-full bg-[#007BFF] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#0066CC] transition-all"
          >
            <span>Complete Setup</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
