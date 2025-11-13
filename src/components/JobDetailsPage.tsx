import { ArrowLeft, MapPin, Clock, Bookmark, Briefcase, Share2, MessageCircle, Building2, ChevronDown, ChevronUp, X, Send, Sparkles, Facebook, Instagram, Linkedin, Twitter, Link as LinkIcon, Mail } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  time: string;
  type: string;
}

interface JobDetailsPageProps {
  job: Job;
  onBack: () => void;
  onApplyClick: () => void;
}

// Job-specific Q&A Database
const jobQADatabase: { [key: string]: string } = {
  // Application Process
  'how to apply': 'Click the "Apply Now" button at the bottom. Fill in your details, upload your resume (PDF), and submit. You\'ll get a confirmation email within 24 hours!',
  'application status': 'After applying, track your application in Profile → My Applications. You\'ll see updates like "Under Review", "Shortlisted", or "Selected".',
  'apply deadline': 'This job posting is active. Apply ASAP as companies review applications on a rolling basis. Popular jobs close within 2-3 weeks!',
  
  // Job Requirements
  'required experience': 'This role requires 1-3 years of experience. However, freshers with strong portfolios and relevant projects are also encouraged to apply!',
  'required skills': 'Key skills: HTML, CSS, JavaScript, React, Node.js. Also important: Problem solving, communication, and teamwork. Check the Skills Required section above.',
  'work from home': 'Work mode depends on job type. Remote jobs are 100% WFH. Hybrid means 2-3 days office. Check the job type badge above for details.',
  
  // Salary & Benefits
  'salary negotiable': 'Yes! The salary range shown is indicative. Final offer depends on your experience, skills, and interview performance. Premium members get better negotiation tips!',
  'when will i get paid': 'Most companies pay monthly salary on the last working day. Some offer weekly payments for contract roles. This will be discussed during the offer stage.',
  'benefits': 'Benefits vary by company but typically include: Health insurance, Paid leaves, Performance bonuses, Skill development budget, and Work-from-home allowances.',
  
  // Company Information
  'about company': `${''} is a technology company founded in 2015 with 500-1000 employees. They focus on innovative solutions and foster a culture of creativity. Check "About Company" section above.`,
  'company culture': 'Companies featured on Kaam Milega are verified for good work culture. Check employee reviews on Glassdoor and AmbitionBox before applying.',
  'company location': `This job is based in ${''}. For remote roles, you can work from anywhere in India. Hybrid roles require proximity to office location.`,
  
  // Interview Process
  'interview process': 'Typical process: 1) Resume screening (2-3 days) 2) HR round (phone/video) 3) Technical round 4) Final round with manager 5) Offer letter. Premium members get interview tips!',
  'how to prepare': 'Prepare by: 1) Researching the company 2) Reviewing job requirements 3) Practicing common interview questions 4) Updating your resume 5) Preparing questions to ask.',
  
  // Premium Features
  'premium benefits': 'Premium members get: Priority applications (seen first), Direct chat with HR, Advanced interview tips, Resume review, Profile boost, and Salary negotiation guidance!',
  'upgrade to premium': 'Go to Profile → Upgrade to Premium. Plans start at ₹299/month. Get 3 months free with annual plan. Premium members get 5x more interview calls!',
  
  // General Queries
  'withdraw application': 'Go to Profile → My Applications → Find this job → Click "Withdraw". Note: This is permanent and cannot be undone.',
  'multiple applications': 'Yes! You can apply to multiple jobs. However, focus on jobs that match your skills for better success rate. Premium users can apply to unlimited jobs.',
  'referral bonus': 'Some companies offer referral bonuses if you refer someone who gets hired. Check with the company after joining!',
  'job genuine': 'All jobs on Kaam Milega are admin-verified. We check company credentials, remove scam listings, and ensure genuine opportunities. Report suspicious jobs to support.',
  
  // Contact & Support
  'contact hr': 'After applying, HR will contact you via email/phone if shortlisted. Premium members can directly chat with HR using the "Chat" button.',
  'contact support': 'For any issues: Email support@kaammilega.com or call +91 1800-XXX-XXXX (Mon-Fri, 9 AM - 6 PM). Or chat with our AI bot for instant help!'
};

const quickJobQuestions = [
  'How to apply?',
  'Required experience?',
  'Salary negotiable?',
  'Interview process?',
  'Premium benefits?',
  'Work from home?'
];

export function JobDetailsPage({ job, onBack, onApplyClick }: JobDetailsPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm your Job Assistant 🤖\n\nI can help you with questions about:\n• Application process\n• Job requirements\n• Salary & benefits\n• Interview preparation\n• Company info\n\nAsk me anything!`,
      sender: 'bot' as const
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const responsibilities = [
    'Develop and maintain app interfaces using modern frameworks',
    'Collaborate with UI/UX designers to implement responsive designs',
    'Fix bugs and improve application performance',
    'Write clean, maintainable, and well-documented code',
    'Knowledge of React / Node.js preferred'
  ];

  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Communication',
    'Problem Solving',
    'Team Work'
  ];

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const findBestAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase().trim();
    
    // Direct match
    if (jobQADatabase[lowerQuestion]) {
      return jobQADatabase[lowerQuestion].replace('${job.company}', job.company).replace('${job.location}', job.location);
    }
    
    // Fuzzy matching
    const keywords = lowerQuestion.split(' ');
    let bestMatch = '';
    let maxScore = 0;
    
    Object.entries(jobQADatabase).forEach(([key, answer]) => {
      let score = 0;
      keywords.forEach(keyword => {
        if (keyword.length > 2 && key.includes(keyword)) {
          score++;
        }
      });
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = answer;
      }
    });
    
    if (maxScore >= 2) {
      return bestMatch.replace('${job.company}', job.company).replace('${job.location}', job.location);
    }
    
    // Default response
    return `I'm here to help with this job! Try asking:\n\n• How to apply?\n• Required experience?\n• Salary negotiable?\n• Interview process?\n• Premium benefits?\n\nOr contact our support team at support@kaammilega.com for detailed assistance! 😊`;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: inputMessage,
        sender: 'user' as const
      };
      setChatMessages([...chatMessages, userMessage]);
      const userQuestion = inputMessage;
      setInputMessage('');
      setIsTyping(true);

      // Simulate AI typing and response
      setTimeout(() => {
        const answer = findBestAnswer(userQuestion);
        const botResponse = {
          id: chatMessages.length + 2,
          text: answer,
          sender: 'bot' as const
        };
        setChatMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleShare = (platform: string) => {
    const jobUrl = `https://kaammilega.com/jobs/${job.id}`;
    const text = `Check out this ${job.title} position at ${job.company}! ${job.salary} • ${job.location}`;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + jobUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(jobUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, copy to clipboard
        navigator.clipboard.writeText(text + ' ' + jobUrl);
        alert('Link copied! Share it as Instagram story or post.');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent('Job Opportunity: ' + job.title)}&body=${encodeURIComponent(text + '\n\n' + jobUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(jobUrl);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#0A0F1C] sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">Job Details</h1>
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-lg border transition-all ${
            isBookmarked 
              ? 'bg-[#007BFF] border-[#007BFF]' 
              : 'bg-[#141A2A] border-[#1f2937] hover:border-[#007BFF]'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-white fill-white' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">{/* Increased padding bottom for sticky button */}

        {/* Job Header Section */}
        <div className="px-5 pt-6 pb-4 border-b border-[#1f2937]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl mb-2">{job.title}</h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-[#141A2A] rounded-lg flex items-center justify-center border border-[#1f2937]">
                  <Building2 className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-gray-300">{job.company}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary & Job Type Section */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937]">
              <div className="text-[#007BFF] text-sm mb-1">Salary</div>
              <div className="text-white">{job.salary}</div>
            </div>
            <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937]">
              <div className="text-[#007BFF] text-sm mb-1">Job Type</div>
              <div className="text-white">{job.type}</div>
            </div>
            <div className="bg-[#141A2A] rounded-xl p-3 border border-[#1f2937]">
              <div className="text-[#007BFF] text-sm mb-1">Experience</div>
              <div className="text-white">1-3 yrs</div>
            </div>
          </div>
        </div>

        {/* Job Description Section */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <h3 className="text-lg mb-3">About the Job</h3>
          <div className="space-y-3">
            {responsibilities.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#007BFF] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="px-5 py-5 border-b border-[#1f2937]">
          <h3 className="text-lg mb-3">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#007BFF]/10 text-[#007BFF] px-3 py-2 rounded-full text-sm border border-[#007BFF]/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Company Info Section */}
        <div className="px-5 py-5">
          <h3 className="text-lg mb-3">About Company</h3>
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#0A0F1C] rounded-lg flex items-center justify-center border border-[#1f2937]">
                <Building2 className="w-6 h-6 text-[#007BFF]" />
              </div>
              <div>
                <h4 className="text-white mb-1">{job.company}</h4>
                <p className="text-gray-400 text-sm">Technology Company</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Leading technology company focused on building innovative solutions for modern businesses. 
              We foster a culture of creativity and excellence.
            </p>
            
            {/* Expandable Company Details */}
            <button 
              onClick={() => setShowCompanyDetails(!showCompanyDetails)}
              className="w-full bg-[#141A2A] text-[#007BFF] py-3 rounded-lg border border-[#007BFF] hover:bg-[#007BFF]/10 transition-all flex items-center justify-center gap-2"
            >
              View Company Profile
              {showCompanyDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showCompanyDetails && (
              <div className="mt-4 pt-4 border-t border-[#1f2937] space-y-3 animate-in slide-in-from-top">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Founded</span>
                  <span className="text-white">2015</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Employees</span>
                  <span className="text-white">500-1000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Industry</span>
                  <span className="text-white">Technology</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Website</span>
                  <span className="text-[#007BFF]">www.company.com</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Jobs Section */}
        <div className="px-5 py-5">
          <h3 className="text-lg mb-3">Similar Jobs</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] min-w-[280px] hover:border-[#007BFF] transition-all cursor-pointer"
              >
                <h4 className="text-white mb-1">Senior Developer</h4>
                <p className="text-gray-400 text-sm mb-2">Tech Corp</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span>Remote</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Bubble - Mobile Optimized */}
      <button 
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-24 right-5 bg-gradient-to-r from-[#007BFF] to-[#0056b3] p-4 rounded-full shadow-lg shadow-blue-500/50 hover:shadow-xl transition-all z-10"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chatbot Popup - Mobile Optimized Full Screen */}
      {showChatbot && (
        <div className="fixed inset-0 bg-[#0A0F1C] z-50 flex flex-col">
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-[#1f2937] flex items-center justify-between bg-gradient-to-r from-[#007BFF]/10 to-transparent safe-area-top">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center relative">
                <Sparkles className="w-6 h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0A0F1C] animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white flex items-center gap-2">
                  Job Assistant
                  <span className="text-xs bg-[#007BFF] px-2 py-0.5 rounded-full">AI</span>
                </h3>
                <p className="text-xs text-gray-400">Ask about this job</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white shadow-lg'
                      : 'bg-[#141A2A] text-white border border-[#1f2937]'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#141A2A] border border-[#1f2937] rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-5 py-3 border-t border-[#1f2937] bg-[#141A2A]">
            <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Quick Questions:
            </p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {quickJobQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="bg-[#0A0F1C] text-gray-300 px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-[#1f2937] hover:border-[#007BFF] hover:bg-[#007BFF]/10 transition-all flex-shrink-0"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input - Safe area bottom */}
          <div className="px-5 py-4 border-t border-[#1f2937] bg-[#141A2A] safe-area-bottom">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about this job..."
                className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`p-3 rounded-xl transition-all ${
                  inputMessage.trim()
                    ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg hover:shadow-blue-500/30'
                    : 'bg-[#0A0F1C] text-gray-500'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Action Bar - Mobile Optimized with Safe Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#141A2A] border-t border-[#1f2937] px-5 py-4 pb-6 flex gap-3 z-20 safe-area-bottom">
        <button 
          onClick={onApplyClick}
          className="flex-1 bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Briefcase className="w-5 h-5" />
          Apply Now
        </button>
        <button 
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="px-5 bg-[#0A0F1C] text-[#007BFF] py-4 rounded-xl border-2 border-[#007BFF] hover:bg-[#007BFF]/10 transition-all active:scale-95"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Share Menu Popup - Mobile Optimized Bottom Sheet */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end z-50 animate-in fade-in" onClick={() => setShowShareMenu(false)}>
          <div className="bg-[#141A2A] rounded-t-3xl w-full p-6 pb-8 safe-area-bottom animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg mb-5 text-white">Share Job</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-400">WhatsApp</span>
              </button>
              <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg">
                  <Facebook className="w-7 h-7 text-white fill-white" />
                </div>
                <span className="text-xs text-gray-400">Facebook</span>
              </button>
              <button onClick={() => handleShare('instagram')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full flex items-center justify-center shadow-lg">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-400">Instagram</span>
              </button>
              <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#1DA1F2] rounded-full flex items-center justify-center shadow-lg">
                  <Twitter className="w-7 h-7 text-white fill-white" />
                </div>
                <span className="text-xs text-gray-400">Twitter</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => handleShare('linkedin')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#0A66C2] rounded-full flex items-center justify-center shadow-lg">
                  <Linkedin className="w-7 h-7 text-white fill-white" />
                </div>
                <span className="text-xs text-gray-400">LinkedIn</span>
              </button>
              <button onClick={() => handleShare('email')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-400">Email</span>
              </button>
              <button onClick={() => handleShare('copy')} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-[#007BFF] rounded-full flex items-center justify-center shadow-lg">
                  <LinkIcon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-400">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
