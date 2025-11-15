import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Save, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditProfileScreenProps {
  userName: string;
  onBack: () => void;
}

export function EditProfileScreen({ userName: initialName, onBack }: EditProfileScreenProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState('rahul@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setTimeout(() => onBack(), 500);
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
        <h1 className="text-white">Edit Profile</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00D9FF] flex items-center justify-center overflow-hidden">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-3xl">{name[0]}</span>
              )}
            </div>
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center border-2 border-[#0A0F1C] cursor-pointer hover:bg-[#0066CC] transition-all">
              <Camera className="w-4 h-4 text-white" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-gray-400 text-xs mt-2">Click camera icon to upload</p>
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
            <div className="bg-[#141A2A] rounded-xl p-4 flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-gray-400 text-sm mb-2 block">Email</label>
            <div className="bg-[#141A2A] rounded-xl p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-gray-400 text-sm mb-2 block">Phone Number</label>
            <div className="bg-[#141A2A] rounded-xl p-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-gray-400 text-sm mb-2 block">Location</label>
            <div className="bg-[#141A2A] rounded-xl p-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <div className="px-4 py-4 bg-[#141A2A]">
        <button 
          onClick={handleSave}
          className="w-full bg-[#007BFF] text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#007BFF]/30 hover:bg-[#0066CC] transition-all"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}