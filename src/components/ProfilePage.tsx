import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Edit2, Save, Crown, Camera, FileText, Upload, X, Search } from 'lucide-react';
import { useState, useRef } from 'react';

interface ProfilePageProps {
  onBack: () => void;
  onPremiumManageClick?: () => void;
}

// Comprehensive skills list for both jobs and services
const allSkills = [
  // Programming & Development
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin',
  'Go', 'Rust', 'SQL', 'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js',
  'Next.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'React Native', 'Flutter', 'iOS Development',
  'Android Development', 'Frontend Development', 'Backend Development', 'Full Stack Development',
  
  // Data & Analytics
  'Data Analysis', 'Data Science', 'Machine Learning', 'Deep Learning', 'Artificial Intelligence',
  'Data Visualization', 'Power BI', 'Tableau', 'Excel', 'Google Analytics', 'Big Data', 'Hadoop',
  'Spark', 'TensorFlow', 'PyTorch', 'R Programming', 'Statistics', 'SQL Server', 'MongoDB', 'PostgreSQL',
  
  // Design
  'UI/UX Design', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Sketch',
  'Adobe XD', 'InDesign', 'After Effects', 'Premiere Pro', 'CorelDRAW', '3D Modeling', 'Blender',
  'AutoCAD', 'Video Editing', 'Motion Graphics', 'Web Design', 'Logo Design', 'Brand Identity',
  
  // Marketing & Sales
  'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing',
  'Google Ads', 'Facebook Ads', 'Instagram Marketing', 'Copywriting', 'Content Writing', 'Sales',
  'Business Development', 'Lead Generation', 'Market Research', 'Brand Management', 'Public Relations',
  
  // Business & Management
  'Project Management', 'Product Management', 'Agile', 'Scrum', 'Team Management', 'Strategic Planning',
  'Business Analysis', 'Financial Analysis', 'Accounting', 'Bookkeeping', 'Human Resources', 'Recruitment',
  'Operations Management', 'Supply Chain', 'Logistics', 'Quality Assurance', 'Risk Management',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'DevOps', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git',
  'Linux', 'System Administration', 'Network Administration', 'Cloud Architecture', 'Terraform',
  
  // Service Skills - Technical
  'Plumbing', 'Electrical Work', 'Carpentry', 'Painting', 'Welding', 'HVAC', 'Appliance Repair',
  'Computer Repair', 'Mobile Repair', 'AC Repair', 'Refrigerator Repair', 'TV Repair',
  'Laptop Repair', 'Network Setup', 'CCTV Installation', 'Home Automation',
  
  // Service Skills - Personal Care
  'Hair Cutting', 'Hair Styling', 'Makeup Artist', 'Nail Art', 'Facial Treatment', 'Massage Therapy',
  'Spa Services', 'Mehendi Artist', 'Bridal Makeup', 'Hair Coloring', 'Beauty Therapy',
  
  // Service Skills - Home Services
  'House Cleaning', 'Deep Cleaning', 'Pest Control', 'Gardening', 'Landscaping', 'Interior Design',
  'Home Renovation', 'Waterproofing', 'Tile Installation', 'Wood Polishing', 'Furniture Assembly',
  
  // Service Skills - Automotive
  'Car Repair', 'Bike Repair', 'Auto Mechanic', 'Car Washing', 'Car Detailing', 'Tire Repair',
  'Engine Repair', 'Brake Repair', 'Oil Change', 'Battery Replacement', 'Vehicle Inspection',
  
  // Service Skills - Photography & Events
  'Photography', 'Videography', 'Wedding Photography', 'Event Photography', 'Portrait Photography',
  'Product Photography', 'Drone Photography', 'Photo Editing', 'Event Planning', 'Catering',
  'DJ Services', 'Decoration', 'Balloon Decoration', 'Stage Decoration',
  
  // Service Skills - Teaching & Training
  'Tutoring', 'Music Teacher', 'Dance Teacher', 'Yoga Instructor', 'Fitness Trainer', 'Personal Trainer',
  'Swimming Coach', 'Driving Instructor', 'Language Teacher', 'Math Tutor', 'Science Tutor',
  
  // Service Skills - Professional Services
  'Legal Services', 'Tax Consultation', 'Financial Planning', 'Insurance Agent', 'Real Estate Agent',
  'Property Management', 'Consulting', 'Translation', 'Writing', 'Proofreading', 'Virtual Assistant',
  
  // Service Skills - Food & Cooking
  'Cooking', 'Baking', 'Chef Services', 'Home Chef', 'Catering Services', 'Cake Making',
  'Food Delivery', 'Meal Planning', 'Nutrition Consulting', 'Dietician Services',
  
  // Other Professional Skills
  'Communication', 'Leadership', 'Problem Solving', 'Critical Thinking', 'Time Management',
  'Customer Service', 'Negotiation', 'Presentation', 'Microsoft Office', 'Typing', 'Data Entry'
];

export function ProfilePage({ onBack, onPremiumManageClick }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    jobTitle: 'Frontend Developer',
    experience: '3 years',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    profilePic: null as string | null,
    resumeName: 'Resume_Rahul_Sharma.pdf'
  });

  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const completionPercentage = 85;

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setProfile({ ...profile, resumeName: file.name });
      // In production, upload file to server
      alert('Resume uploaded successfully!');
    } else {
      alert('Please select a PDF file');
    }
  };

  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
    !profile.skills.includes(skill)
  );

  const handleAddSkill = (skill: string) => {
    setProfile({ ...profile, skills: [...profile.skills, skill] });
    setSkillSearchQuery('');
    setShowSkillsDropdown(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({ 
      ...profile, 
      skills: profile.skills.filter(skill => skill !== skillToRemove) 
    });
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
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
            {/* Profile Picture with Upload */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#007BFF] to-[#0056b3] flex items-center justify-center">
                {profile.profilePic ? (
                  <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              {isEditing && (
                <>
                  <button
                    onClick={() => profilePicInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-[#007BFF] rounded-full flex items-center justify-center border-2 border-[#141A2A] hover:bg-[#0056b3] transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                  <input
                    ref={profilePicInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </>
              )}
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

        {/* Skills with Dropdown */}
        <div className="space-y-3">
          <h3 className="text-lg">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-[#007BFF]/10 text-[#007BFF] px-4 py-2 rounded-full text-sm border border-[#007BFF]/20 flex items-center gap-2"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="relative">
                <button 
                  onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                  className="bg-[#141A2A] text-gray-400 px-4 py-2 rounded-full text-sm border border-[#1f2937] hover:border-[#007BFF] transition-all"
                >
                  + Add Skill
                </button>

                {/* Skills Dropdown */}
                {showSkillsDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 max-w-[calc(100vw-2.5rem)] bg-[#141A2A] border border-[#1f2937] rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-3 border-b border-[#1f2937]">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search skills..."
                          value={skillSearchQuery}
                          onChange={(e) => setSkillSearchQuery(e.target.value)}
                          className="w-full bg-[#0A0F1C] text-white pl-10 pr-3 py-2 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none text-sm"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="max-h-64 overflow-y-auto">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.slice(0, 50).map((skill, index) => (
                          <button
                            key={index}
                            onClick={() => handleAddSkill(skill)}
                            className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-[#007BFF]/10 transition-colors border-b border-[#1f2937] last:border-b-0"
                          >
                            {skill}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-gray-400 text-sm">
                          No skills found
                        </div>
                      )}
                    </div>

                    {/* Close Button */}
                    <div className="p-2 border-t border-[#1f2937]">
                      <button
                        onClick={() => setShowSkillsDropdown(false)}
                        className="w-full bg-[#0A0F1C] text-gray-400 py-2 rounded-lg hover:bg-[#1f2937] transition-colors text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="space-y-3">
          <h3 className="text-lg">Resume</h3>
          
          {profile.resumeName ? (
            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#007BFF]" />
                </div>
                <div>
                  <p className="text-white text-sm">{profile.resumeName}</p>
                  <p className="text-gray-400 text-xs">PDF Document</p>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => resumeInputRef.current?.click()}
                  className="text-[#007BFF] text-sm hover:underline"
                >
                  Replace
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => resumeInputRef.current?.click()}
              className="w-full bg-[#141A2A] rounded-xl p-6 border border-dashed border-[#1f2937] hover:border-[#007BFF] transition-all flex flex-col items-center justify-center gap-2"
            >
              <div className="w-12 h-12 bg-[#007BFF]/10 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#007BFF]" />
              </div>
              <p className="text-white">Add Resume</p>
              <p className="text-gray-400 text-xs">Upload PDF file from your device</p>
            </button>
          )}
          
          <input
            ref={resumeInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleResumeChange}
            className="hidden"
          />
        </div>

        {/* Premium Management */}
        {onPremiumManageClick && (
          <div className="space-y-3">
            <h3 className="text-lg">Premium Management</h3>
            <button
              onClick={onPremiumManageClick}
              className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center justify-between"
            >
              <span className="text-white">Manage Premium Features</span>
              <Crown className="w-5 h-5 text-[#007BFF]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
