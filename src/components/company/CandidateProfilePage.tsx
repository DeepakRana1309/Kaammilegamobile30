import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Calendar,
  Download,
  Star,
  Clock,
  Check,
  X,
  ExternalLink,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CandidateProfilePageProps {
  candidate: any;
  onBack: () => void;
}

export function CandidateProfilePage({ candidate, onBack }: CandidateProfilePageProps) {
  const [status, setStatus] = useState(candidate.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    const messages = {
      'shortlisted': 'Candidate shortlisted successfully!',
      'interview': 'Interview scheduled!',
      'rejected': 'Application rejected',
      'reviewed': 'Marked as reviewed'
    };
    toast.success(messages[newStatus as keyof typeof messages]);
  };

  const handleDownload = () => {
    toast.success(`Downloading ${candidate.candidateName}'s resume...`);
  };

  const handleContact = (type: string) => {
    if (type === 'email') {
      window.location.href = `mailto:${candidate.email}`;
    } else if (type === 'phone') {
      window.location.href = `tel:${candidate.phone}`;
    }
  };

  // Mock detailed data
  const profileData = {
    summary: 'Passionate frontend developer with expertise in React, TypeScript, and modern web technologies. Proven track record of building scalable applications and leading development teams. Strong problem-solving skills and dedication to writing clean, maintainable code.',
    
    experience: [
      {
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Pvt Ltd',
        duration: 'Jan 2022 - Present',
        location: 'Mumbai',
        description: 'Leading frontend development team, architecting React applications, mentoring junior developers, and implementing best practices.'
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Solutions',
        duration: 'Jun 2020 - Dec 2021',
        location: 'Pune',
        description: 'Developed responsive web applications using React, collaborated with design team, and optimized application performance.'
      },
      {
        title: 'Junior Developer',
        company: 'StartUp Hub',
        duration: 'Jan 2019 - May 2020',
        location: 'Bangalore',
        description: 'Built UI components, fixed bugs, and contributed to multiple client projects.'
      }
    ],

    education: [
      {
        degree: 'Bachelor of Technology in Computer Science',
        institution: 'IIT Mumbai',
        year: '2015 - 2019',
        grade: 'CGPA: 8.5/10'
      },
      {
        degree: 'Higher Secondary (12th)',
        institution: 'Delhi Public School',
        year: '2014 - 2015',
        grade: '92%'
      }
    ],

    certifications: [
      'AWS Certified Developer - Associate',
      'React Advanced Certification - Meta',
      'TypeScript Expert - Microsoft',
      'Agile Scrum Master Certification'
    ],

    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Built a full-featured e-commerce platform with React, Redux, and Node.js',
        tech: ['React', 'Redux', 'Node.js', 'MongoDB'],
        link: 'https://github.com/username/ecommerce'
      },
      {
        name: 'Task Management App',
        description: 'Real-time collaborative task management application',
        tech: ['React', 'Firebase', 'Material-UI'],
        link: 'https://github.com/username/taskapp'
      },
      {
        name: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media metrics',
        tech: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
        link: 'https://github.com/username/dashboard'
      }
    ],

    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Hindi', level: 'Native' },
      { name: 'Marathi', level: 'Intermediate' }
    ],

    socialLinks: {
      portfolio: candidate.portfolio || 'https://portfolio.example.com',
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username'
    }
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Candidate Profile</h1>
          <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141A2A] rounded-2xl p-6 mb-4"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#007BFF] to-[#00D9FF] flex items-center justify-center flex-shrink-0 text-white text-2xl">
              {candidate.candidateName[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl mb-1">{candidate.candidateName}</h2>
              <p className="text-gray-400 mb-2">{candidate.experience} Experience</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  candidate.matchScore >= 90 
                    ? 'bg-green-500/20 text-green-500'
                    : candidate.matchScore >= 80
                    ? 'bg-orange-500/20 text-orange-500'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {candidate.matchScore}% Match
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  status === 'shortlisted' ? 'bg-green-500/20 text-green-500' :
                  status === 'interview' ? 'bg-purple-500/20 text-purple-500' :
                  status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                  'bg-blue-500/20 text-blue-500'
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <button
              onClick={() => handleContact('email')}
              className="w-full bg-[#0A0F1C] p-3 rounded-xl flex items-center gap-3 text-left hover:bg-[#141A2A] transition-all"
            >
              <Mail className="w-5 h-5 text-[#007BFF]" />
              <span className="text-gray-300 text-sm">{candidate.email}</span>
            </button>
            <button
              onClick={() => handleContact('phone')}
              className="w-full bg-[#0A0F1C] p-3 rounded-xl flex items-center gap-3 text-left hover:bg-[#141A2A] transition-all"
            >
              <Phone className="w-5 h-5 text-[#007BFF]" />
              <span className="text-gray-300 text-sm">{candidate.phone}</span>
            </button>
            <div className="bg-[#0A0F1C] p-3 rounded-xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#007BFF]" />
              <span className="text-gray-300 text-sm">{candidate.location}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {profileData.socialLinks.portfolio && (
              <a
                href={profileData.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#0A0F1C] p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#141A2A] transition-all"
              >
                <Globe className="w-4 h-4 text-[#007BFF]" />
                <span className="text-gray-300 text-xs">Portfolio</span>
              </a>
            )}
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#0A0F1C] p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#141A2A] transition-all"
            >
              <Github className="w-4 h-4 text-[#007BFF]" />
              <span className="text-gray-300 text-xs">GitHub</span>
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#0A0F1C] p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#141A2A] transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#007BFF]" />
              <span className="text-gray-300 text-xs">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Applied For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-[#007BFF]" />
            <h3 className="text-white">Applied For</h3>
          </div>
          <p className="text-gray-300">{candidate.appliedFor}</p>
          <p className="text-gray-500 text-sm mt-1">Applied {candidate.appliedDate}</p>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#007BFF]" />
            Professional Summary
          </h3>
          <p className="text-gray-400 leading-relaxed">{profileData.summary}</p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-[#007BFF]" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#007BFF]/10 text-[#007BFF] px-3 py-1.5 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#007BFF]" />
            Work Experience
          </h3>
          <div className="space-y-4">
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-[#007BFF] pl-4">
                <h4 className="text-white mb-1">{exp.title}</h4>
                <p className="text-gray-400 text-sm mb-1">{exp.company}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#007BFF]" />
            Education
          </h3>
          <div className="space-y-3">
            {profileData.education.map((edu, idx) => (
              <div key={idx}>
                <h4 className="text-white text-sm mb-1">{edu.degree}</h4>
                <p className="text-gray-400 text-sm">{edu.institution}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{edu.year}</span>
                  <span>•</span>
                  <span>{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#007BFF]" />
            Certifications
          </h3>
          <div className="space-y-2">
            {profileData.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#007BFF]"></div>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-[#007BFF]" />
            Projects
          </h3>
          <div className="space-y-3">
            {profileData.projects.map((project, idx) => (
              <div key={idx} className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white text-sm">{project.name}</h4>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#007BFF] hover:text-[#0066CC]"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-400 text-xs mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, tidx) => (
                    <span
                      key={tidx}
                      className="text-xs bg-[#141A2A] text-gray-400 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cover Letter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-20"
        >
          <h3 className="text-white mb-3">Cover Letter</h3>
          <p className="text-gray-400 leading-relaxed">{candidate.coverLetter}</p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="bg-[#141A2A] px-4 py-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleStatusChange('shortlisted')}
            disabled={status === 'shortlisted'}
            className="bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star className="w-5 h-5" />
            Shortlist
          </button>
          <button
            onClick={() => handleStatusChange('interview')}
            disabled={status === 'interview'}
            className="bg-purple-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Clock className="w-5 h-5" />
            Interview
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleStatusChange('reviewed')}
            disabled={status === 'reviewed'}
            className="bg-[#007BFF] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0066CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            Mark Reviewed
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            disabled={status === 'rejected'}
            className="bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
