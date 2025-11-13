import { MessageCircle, HelpCircle, Phone, MessageSquare, BookOpen, Shield, AlertCircle, Mail, X, Send, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HelpPageProps {
  onNavigate: (page: string) => void;
}

// Comprehensive Q&A Database
const qaDatabase: { [key: string]: string } = {
  // Job Related
  'how do i apply for jobs': 'To apply for jobs: 1) Go to Jobs section 2) Browse or search for jobs 3) Click on job card 4) Click "Apply Now" button 5) Fill the application form. Premium members get priority applications!',
  'how to search jobs': 'Use the search bar on Jobs page to search by job title, company, or location. You can also apply filters for job type, salary range, and experience level.',
  'track my application': 'Go to Profile → My Applications to track all your job applications. You\'ll see status updates like "Under Review", "Shortlisted", or "Selected".',
  'how to bookmark jobs': 'Click the bookmark icon on any job card to save it for later. Access all bookmarked jobs from your Profile page.',
  
  // Premium & Payments
  'how to add money to wallet': 'Go to Profile → Wallet → Add Money. Enter amount, select payment method (UPI/Card/Net Banking), and complete payment via Razorpay gateway.',
  'premium membership benefits': 'Premium benefits include: Priority job applications, Unlimited service bookings, No booking fees, Direct chat with employers, Advanced filters, Profile boost, and Ad-free experience!',
  'razorpay payment': 'We use Razorpay for secure payments. All UPI apps (GPay, PhonePe, Paytm), cards, and net banking are supported. Payments are encrypted and 100% secure.',
  'refund policy': 'Refunds are processed within 5-7 business days. For service cancellations before worker arrival: Full refund. After arrival: No refund. Contact support for special cases.',
  
  // Hotel Booking
  'how to book a hotel': '1) Go to Hotel Stays section 2) Search by city/location 3) Select check-in/out dates 4) Choose room type 5) Complete payment. You\'ll get instant confirmation!',
  'hotel booking cancellation': 'Free cancellation up to 24 hours before check-in. After that, cancellation charges apply (varies by hotel). Check hotel policy before booking.',
  'hotel payment options': 'Pay via UPI (GPay/PhonePe/Paytm), Credit/Debit cards, Net Banking, or Wallet. You can also pay at hotel (limited properties).',
  
  // Services
  'how to book services': '1) Open Services section 2) Select category (Cleaning, Repair, Beauty, etc.) 3) Choose service 4) Pick professional 5) Select date/time 6) Confirm booking & pay.',
  'service worker ratings': 'All workers are rated by customers. Check their star rating, reviews, completed jobs, and verification badge before booking.',
  'service cancellation': 'Cancel anytime before worker starts journey. Full refund if cancelled 2+ hours before. Partial refund if 30min-2hrs before. No refund after journey starts.',
  
  // Account & Profile
  'how to update profile': 'Go to Profile → Edit Profile. You can update photo, bio, skills, experience, resume (PDF), and contact details.',
  'how to add skills': 'Profile → Edit → Skills section. Search from 200+ skills dropdown. Select all relevant skills to get better job recommendations.',
  'upload resume': 'Profile → Edit → Resume section. Click "Upload Resume" and select PDF file (max 5MB). Your resume will be shared with employers when you apply.',
  'change password': 'Profile → Settings → Security → Change Password. Enter current password, new password, and confirm.',
  
  // Company Related
  'how to post a job': 'Company accounts can post jobs from Dashboard → Post New Job. Fill job details, requirements, salary, and publish. Admin will review and approve.',
  'company verification': 'Contact support with company documents (GST, registration certificate). Verified companies get a blue checkmark and better visibility.',
  
  // Technical Issues
  'app not working': 'Try these steps: 1) Refresh the page 2) Clear browser cache 3) Check internet connection 4) Try different browser. If issue persists, contact support.',
  'payment failed': 'If payment failed but money deducted, don\'t retry. Amount will be auto-refunded in 5-7 days. Contact support with transaction ID for faster resolution.',
  'not receiving notifications': 'Check browser notification permissions. Go to browser settings → Site settings → Notifications → Allow for Kaam Milega.',
  
  // General
  'contact support': 'Email: support@kaammilega.com | Phone: +91 1800-XXX-XXXX | Available Mon-Fri, 9 AM - 6 PM IST. Or chat with us here!',
  'office locations': 'Head Office: Mumbai, Maharashtra. Branch offices in Delhi, Bangalore, Hyderabad, Pune, and Chennai. Check Contact Us page for addresses.',
  'who can use this app': 'Anyone 18+ can use Kaam Milega! Job seekers can find jobs, companies can hire, and customers can book instant services and hotels.',
  'is it safe': 'Yes! All workers are verified, payments are secured via Razorpay, data is encrypted, and we have 24/7 monitoring. Your privacy is our priority.',
  'admin approval': 'All job postings, service listings, and hotel bookings need admin approval before going live. This ensures quality and safety for all users.',
};

// Quick question suggestions
const quickQuestions = [
  'How do I apply for jobs?',
  'How to add money to wallet?',
  'How to book a hotel?',
  'Track my application',
  'Premium membership benefits',
  'How to book services?',
  'Upload resume',
  'Refund policy'
];

export function HelpPage({ onNavigate }: HelpPageProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Hi! I\'m Kaam Bot 🤖, your AI assistant. How can I help you today?',
      sender: 'bot' as const
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const mainActions = [
    {
      id: 1,
      title: 'Chat With Us',
      description: 'Live support available',
      icon: MessageCircle,
      color: '#007BFF',
      page: 'chat'
    },
    {
      id: 2,
      title: 'FAQ',
      description: 'Common questions',
      icon: HelpCircle,
      color: '#10B981',
      page: 'faq'
    },
    {
      id: 3,
      title: 'Contact Us',
      description: 'Get in touch',
      icon: Phone,
      color: '#F59E0B',
      page: 'contact'
    },
    {
      id: 4,
      title: 'Give Feedback',
      description: 'Share your thoughts',
      icon: MessageSquare,
      color: '#8B5CF6',
      page: 'feedback'
    }
  ];

  const helpTopics = [
    {
      id: 1,
      title: 'Getting Started',
      icon: BookOpen,
      page: 'getting-started'
    },
    {
      id: 2,
      title: 'Account & Privacy',
      icon: Shield,
      page: 'account-privacy'
    },
    {
      id: 3,
      title: 'Report an Issue',
      icon: AlertCircle,
      page: 'report-issue'
    },
    {
      id: 4,
      title: 'Email Support',
      icon: Mail,
      page: 'email-support'
    }
  ];

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const findBestAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase().trim();
    
    // Direct match
    if (qaDatabase[lowerQuestion]) {
      return qaDatabase[lowerQuestion];
    }
    
    // Fuzzy matching
    const keywords = lowerQuestion.split(' ');
    let bestMatch = '';
    let maxScore = 0;
    
    Object.entries(qaDatabase).forEach(([key, answer]) => {
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
      return bestMatch;
    }
    
    // Default response with suggestions
    return `I'm not sure about that specific question. Here are some popular topics:\n\n• How to apply for jobs?\n• Premium membership benefits\n• How to book services?\n• Upload resume\n\nYou can also contact our support team at support@kaammilega.com or call +91 1800-XXX-XXXX (Mon-Fri, 9 AM - 6 PM IST) for detailed assistance! 😊`;
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
    // Auto send after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl mb-1">Help & Support</h1>
        <p className="text-gray-400 text-sm">We're here to help you</p>
      </div>

      {/* Main Action Grid */}
      <div className="px-5 mb-6">
        <h2 className="text-lg mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {mainActions.map((action) => (
            <div
              key={action.id}
              onClick={() => onNavigate(action.page)}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all cursor-pointer group"
            >
              <div 
                className="p-3 rounded-lg mb-3 inline-block"
                style={{ backgroundColor: `${action.color}20` }}
              >
                <action.icon 
                  className="w-6 h-6"
                  style={{ color: action.color }}
                />
              </div>
              <h3 className="text-white mb-1">{action.title}</h3>
              <p className="text-gray-400 text-xs">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Help Topics */}
      <div className="px-5 mb-6">
        <h2 className="text-lg mb-3">Browse Help Topics</h2>
        <div className="space-y-2">
          {helpTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onNavigate(topic.page)}
              className="w-full bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all flex items-center gap-3 group"
            >
              <div className="bg-[#007BFF]/10 p-2 rounded-lg group-hover:bg-[#007BFF]/20 transition-colors">
                <topic.icon className="w-5 h-5 text-[#007BFF]" />
              </div>
              <span className="text-white">{topic.title}</span>
              <svg
                className="w-5 h-5 text-gray-400 ml-auto group-hover:text-[#007BFF] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant Card */}
      <div className="px-5 mb-6">
        <h2 className="text-lg mb-3">AI Assistant</h2>
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-5 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-full animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">Chat with Kaam Bot</h3>
                <p className="text-blue-100 text-sm">Get instant AI-powered answers 24/7</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAIAssistant(true)}
              className="w-full bg-white text-[#007BFF] py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-5">
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <h3 className="text-white mb-3">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4 text-[#007BFF]" />
              <span>support@kaammilega.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="w-4 h-4 text-[#007BFF]" />
              <span>+91 1800-XXX-XXXX</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#1f2937]">
            <p className="text-xs text-gray-500 text-center">
              Available Mon-Fri, 9:00 AM - 6:00 PM IST
            </p>
          </div>
        </div>
      </div>

      {/* AI Assistant Popup - Mobile Optimized Full Screen */}
      {showAIAssistant && (
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
                  Kaam Bot
                  <span className="text-xs bg-[#007BFF] px-2 py-0.5 rounded-full">AI</span>
                </h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • Instant replies
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAIAssistant(false)}
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
              Popular Questions:
            </p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {quickQuestions.map((question, idx) => (
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
                placeholder="Ask me anything..."
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
    </div>
  );
}
