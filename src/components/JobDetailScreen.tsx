import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Briefcase, Building2, Share2, Bookmark, MessageCircle, Send, X } from 'lucide-react';
import { Job, UserRole } from '../App';
import { toast } from 'sonner@2.0.3';

interface JobDetailScreenProps {
  job: Job;
  onBack: () => void;
  userRole: UserRole;
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  suggestedQuestions?: string[];
}

const jobQADatabase: Record<string, string> = {
  'salary': 'The salary range for this position is mentioned in the job details. It may vary based on your experience and interview performance. Additional benefits like health insurance, bonuses, and stock options may also be included.',
  'experience': 'The required experience level can be found in the requirements section. We value both years of experience and quality of work. Fresh graduates with strong portfolios are also encouraged to apply for entry-level positions.',
  'work from home': 'Work arrangements depend on the company policy. Many companies now offer hybrid models combining remote and office work. You can discuss specific work arrangements during the interview process.',
  'joining': 'Typical joining time ranges from 2 weeks to 2 months after the offer, depending on your notice period. Immediate joiners are often preferred but companies understand notice period requirements.',
  'benefits': 'Standard benefits usually include health insurance, paid time off, provident fund, and performance bonuses. Premium companies may offer additional perks like gym memberships, meal allowances, and learning budgets.',
  'interview': 'The interview process typically includes 2-4 rounds: initial screening, technical assessment, cultural fit interview, and HR discussion. Prepare your portfolio, brush up on required skills, and research the company.',
  'growth': 'Career growth opportunities vary by company. Look for organizations with clear growth paths, mentorship programs, and skill development initiatives. Discuss growth expectations during your interview.',
  'team': 'Team size and structure depend on the company and role. You will typically work with cross-functional teams. Ask about team composition and reporting structure during the interview.',
  'location': 'The job location is mentioned in the details. Consider commute time, relocation options, and remote work possibilities. Some companies offer relocation assistance for outstation candidates.',
  'apply': 'To apply, click the "Apply Now" button below. Ensure your resume is updated and highlights relevant experience. A well-crafted cover letter can significantly improve your chances.'
};

const suggestedQuestions = [
  'What is the salary range?',
  'What about work from home?',
  'How is the interview process?',
  'What are the benefits?',
  'When can I join?',
  'What are growth opportunities?'
];

export function JobDetailScreen({ job, onBack, userRole }: JobDetailScreenProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with any questions about this job. Feel free to ask me anything!',
      isBot: true,
      suggestedQuestions: suggestedQuestions
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = async () => {
    const shareText = `${job.title} at ${job.company}\nLocation: ${job.location}\nSalary: ${job.salary}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: shareText,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      toast.success('Job details copied to clipboard!');
    }
  };

  const handleApply = () => {
    toast.success('Application submitted successfully! The company will review your profile.');
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for keywords in the question
    for (const [keyword, response] of Object.entries(jobQADatabase)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return 'That\'s a great question! I recommend discussing this directly with the hiring team during your interview. You can apply now to start the conversation with them.';
  };

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageToSend,
      isBot: false
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageToSend),
        isBot: true,
        suggestedQuestions: suggestedQuestions.filter(q => q !== messageToSend)
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center hover:bg-[#0A0F1C]/80 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">Job Details</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleBookmark}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isBookmarked 
                ? 'bg-[#007BFF] text-white' 
                : 'bg-[#0A0F1C] text-gray-400 hover:bg-[#0A0F1C]/80'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center hover:bg-[#0A0F1C]/80 transition-all"
          >
            <Share2 className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141A2A] rounded-2xl p-6 mb-4"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#007BFF]/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-[#007BFF]" />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-xl mb-1">{job.title}</h2>
              <p className="text-gray-400">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Briefcase className="w-4 h-4" />
              {job.type}
            </span>
          </div>
        </motion.div>

        {/* Salary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <p className="text-gray-400 text-sm mb-1">Salary Range</p>
          <p className="text-white text-xl">{job.salary}</p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-2">Job Description</h3>
          <p className="text-gray-400 leading-relaxed">{job.description}</p>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141A2A] rounded-2xl p-4 mb-4"
        >
          <h3 className="text-white mb-3">Requirements</h3>
          <div className="space-y-2">
            {job.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#007BFF]"></div>
                <span className="text-gray-400">{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Posted Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm mb-20"
        >
          Posted {job.postedDate}
        </motion.div>
      </div>

      {/* Apply Button & Chat */}
      {userRole === 'job-seeker' && (
        <>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-[#141A2A] px-4 py-4"
          >
            <button 
              onClick={handleApply}
              className="w-full bg-[#007BFF] hover:bg-[#0066CC] text-white py-4 rounded-2xl transition-all shadow-lg shadow-[#007BFF]/20"
            >
              Apply Now
            </button>
          </motion.div>

          {/* Chatbot Toggle Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="fixed bottom-24 right-4 w-14 h-14 bg-[#007BFF] rounded-full flex items-center justify-center shadow-lg shadow-[#007BFF]/30 z-50"
          >
            {isChatOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.button>

          {/* Chatbot Window */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 400 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 400 }}
                className="fixed inset-0 bg-[#0A0F1C] z-40 flex flex-col"
              >
                {/* Chat Header */}
                <div className="bg-[#141A2A] px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">Job Assistant</h3>
                      <p className="text-gray-400 text-xs">Ask me anything</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id}>
                      <div
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.isBot
                              ? 'bg-[#141A2A] text-white'
                              : 'bg-[#007BFF] text-white'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                      </div>
                      
                      {/* Suggested Questions */}
                      {message.isBot && message.suggestedQuestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestedQuestions.slice(0, 4).map((question, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(question)}
                              className="bg-[#141A2A] text-gray-300 text-xs px-3 py-2 rounded-full hover:bg-[#1A2332] transition-all border border-[#007BFF]/20"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="bg-[#141A2A] px-4 py-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your question..."
                      className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      className="w-12 h-12 bg-[#007BFF] rounded-xl flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
