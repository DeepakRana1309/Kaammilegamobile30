import { MessageCircle, HelpCircle, Phone, MessageSquare, BookOpen, Shield, AlertCircle, Mail, X, Send } from 'lucide-react';
import { useState } from 'react';

interface HelpPageProps {
  onNavigate: (page: string) => void;
}

export function HelpPage({ onNavigate }: HelpPageProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Hi! I\'m Kaam Bot, your AI assistant. How can I help you today?',
      sender: 'bot' as const
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

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

  const quickQuestions = [
    'How do I apply for jobs?',
    'How to add money to wallet?',
    'How to book a hotel?',
    'Track my application'
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: inputMessage,
        sender: 'user' as const
      };
      setChatMessages([...chatMessages, userMessage]);
      setInputMessage('');

      // Simulate AI response
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          text: 'Thanks for your question! Let me help you with that. For detailed assistance, please check our FAQ section or contact our support team.',
          sender: 'bot' as const
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
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
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 p-3 rounded-full animate-pulse">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white">Chat with Kaam Bot</h3>
              <p className="text-blue-100 text-sm">Get instant AI-powered answers</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAIAssistant(true)}
            className="w-full bg-white text-[#007BFF] py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start Chat
          </button>
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

      {/* AI Assistant Popup */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in">
          <div className="bg-[#141A2A] rounded-t-3xl w-full max-w-[390px] h-[80%] flex flex-col animate-in slide-in-from-bottom">
            {/* Chat Header */}
            <div className="px-5 py-4 border-b border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white">Kaam Bot</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
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
                        ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white'
                        : 'bg-[#0A0F1C] text-white border border-[#1f2937]'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="px-5 py-3 border-t border-[#1f2937]">
              <p className="text-xs text-gray-400 mb-2">Quick Questions:</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="bg-[#0A0F1C] text-gray-300 px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-[#1f2937] hover:border-[#007BFF] transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="px-5 py-4 border-t border-[#1f2937]">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-3 rounded-xl transition-all ${
                    inputMessage.trim()
                      ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg'
                      : 'bg-[#0A0F1C] text-gray-500'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
