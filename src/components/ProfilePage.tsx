import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Edit2, Save } from 'lucide-react';
import { useState } from 'react';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    jobTitle: 'Frontend Developer',
    experience: '3 years',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js']
  });

  const completionPercentage = 85;

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

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
        <h1 className="text-lg flex-1">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          {isEditing ? <Save className="w-5 h-5 text-[#007BFF]" /> : <Edit2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Profile Picture & Completion */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">{profile.name}</h2>
              <p className="text-gray-400 text-sm">{profile.jobTitle}</p>
            </div>
          </div>
          
          {/* Profile Completion */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Profile Completion</span>
              <span className="text-[#007BFF]">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-[#0A0F1C] rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg">Personal Information</h3>
          
          <div className="space-y-3">
            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#007BFF]" />
                <div className="flex-1">
                  <p className="text-gray-400 text-xs mb-1">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-transparent text-white border-none focus:outline-none"
                    />
                  ) : (
                    <p className="text-white">{profile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#007BFF]" />
                <div className="flex-1">
                  <p className="text-gray-400 text-xs mb-1">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-transparent text-white border-none focus:outline-none"
                    />
                  ) : (
                    <p className="text-white">{profile.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#007BFF]" />
                <div className="flex-1">
                  <p className="text-gray-400 text-xs mb-1">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-transparent text-white border-none focus:outline-none"
                    />
                  ) : (
                    <p className="text-white">{profile.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#007BFF]" />
                <div className="flex-1">
                  <p className="text-gray-400 text-xs mb-1">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full bg-transparent text-white border-none focus:outline-none"
                    />
                  ) : (
                    <p className="text-white">{profile.location}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[#007BFF]" />
                <div className="flex-1">
                  <p className="text-gray-400 text-xs mb-1">Experience</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="w-full bg-transparent text-white border-none focus:outline-none"
                    />
                  ) : (
                    <p className="text-white">{profile.experience}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <h3 className="text-lg">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#007BFF]/10 text-[#007BFF] px-4 py-2 rounded-full text-sm border border-[#007BFF]/20"
              >
                {skill}
              </span>
            ))}
            {isEditing && (
              <button className="bg-[#141A2A] text-gray-400 px-4 py-2 rounded-full text-sm border border-[#1f2937] hover:border-[#007BFF] transition-all">
                + Add Skill
              </button>
            )}
          </div>
        </div>

        {/* Resume Links */}
        <div className="space-y-3">
          <h3 className="text-lg">Resume</h3>
          <button className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-between">
            <span className="text-white">Resume_Rahul_Sharma.pdf</span>
            <span className="text-[#007BFF] text-sm">View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
