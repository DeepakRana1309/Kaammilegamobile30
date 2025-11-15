import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MessageCircle, 
  HelpCircle, 
  FileText, 
  Send,
  ChevronDown,
  ChevronUp,
  Bot
} from 'lucide-react';

interface HelpSupportScreenProps {
  onBack: () => void;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    category: 'Account',
    question: 'How do I verify my account?',
    answer: 'To verify your account, go to Profile > Settings > Account Verification. Upload your PAN card and wait 24-48 hours for admin approval.'
  },
  {
    id: 2,
    category: 'Jobs',
    question: 'How do I apply for a job?',
    answer: 'Browse jobs in the Jobs tab, tap on any job to view details, and click "Apply Now". Fill in your details and submit your application.'
  },
  {
    id: 3,
    category: 'Services',
    question: 'How do I book a service?',
    answer: 'Go to Services tab, select a service category, choose a provider, and tap "Book Now". Complete payment to confirm booking.'
  },
  {
    id: 4,
    category: 'Payment',
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, Credit/Debit Cards, Net Banking, and Wallet payments through our secure Razorpay integration.'
  },
  {
    id: 5,
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'Go to Settings > Security > Change Password. Enter your current password and set a new one.'
  },
  {
    id: 6,
    category: 'Services',
    question: 'How do I cancel a service booking?',
    answer: 'Go to My Bookings, select the booking, and tap "Cancel Booking". Refunds are processed within 5-7 business days.'
  },
];

const suggestedQuestions = [
  'How to verify my account?',
  'Payment methods available?',
  'How to apply for jobs?',
  'Cancel service booking?',
];

export function HelpSupportScreen({ onBack }: HelpSupportScreenProps) {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'faq' | 'ticket'>('chatbot');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot' as const, text: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'General',
    description: ''
  });

  const handleSuggestedQuestion = (question: string) => {
    setChatInput('');
    setChatMessages([...chatMessages, 
      { id: chatMessages.length + 1, type: 'user' as const, text: question }
    ]);
    
    // Simulate bot response
    setTimeout(() => {
      const faq = faqs.find(f => f.question.toLowerCase().includes(question.toLowerCase().split(' ')[0]));
      const response = faq ? faq.answer : 'I can help you with that! Please check our FAQ section or create a support ticket for detailed assistance.';
      setChatMessages(prev => [...prev, 
        { id: prev.length + 1, type: 'bot' as const, text: response }
      ]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages([...chatMessages, 
      { id: chatMessages.length + 1, type: 'user' as const, text: chatInput }
    ]);
    setChatInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, 
        { id: prev.length + 1, type: 'bot' as const, text: 'Thank you for your message! Our support team will assist you shortly. You can also check our FAQ section or create a support ticket.' }
      ]);
    }, 1000);
  };

  const handleSubmitTicket = () => {
    if (!ticketForm.subject || !ticketForm.description) {
      alert('Please fill in all fields');
      return;
    }
    alert('Support ticket created successfully! Ticket ID: #' + Math.floor(Math.random() * 10000));
    setTicketForm({ subject: '', category: 'General', description: '' });
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white">Help & Support</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'chatbot' ? 'bg-[#007BFF] text-white' : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Chatbot</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'faq' ? 'bg-[#007BFF] text-white' : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'ticket' ? 'bg-[#007BFF] text-white' : 'bg-[#0A0F1C] text-gray-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ticket</span>
          </button>
        </div>
      </div>

      {/* Chatbot Tab */}
      {activeTab === 'chatbot' && (
        <div className="flex-1 flex flex-col">
          {/* Suggested Questions */}
          <div className="px-4 py-3 bg-[#141A2A]/50">
            <p className="text-gray-400 text-sm mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="px-3 py-1.5 bg-[#141A2A] text-gray-300 text-sm rounded-full hover:bg-[#007BFF] hover:text-white transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-[#007BFF] text-white' 
                    : 'bg-[#141A2A] text-gray-300'
                }`}>
                  {message.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-[#007BFF]" />
                      <span className="text-xs text-[#007BFF]">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="px-4 py-4 bg-[#141A2A]">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="w-12 h-12 bg-[#007BFF] rounded-xl flex items-center justify-center"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#141A2A] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-start justify-between text-left"
                >
                  <div className="flex-1">
                    <span className="text-xs text-[#007BFF] mb-1 block">{faq.category}</span>
                    <p className="text-white">{faq.question}</p>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Create Ticket Tab */}
      {activeTab === 'ticket' && (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Subject</label>
              <input
                type="text"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                placeholder="Brief description of your issue"
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
              >
                <option>General</option>
                <option>Account</option>
                <option>Jobs</option>
                <option>Services</option>
                <option>Payment</option>
                <option>Technical Issue</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block">Description</label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                placeholder="Describe your issue in detail..."
                rows={6}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF] resize-none"
              />
            </div>

            <button
              onClick={handleSubmitTicket}
              className="w-full bg-[#007BFF] text-white py-4 rounded-xl font-medium shadow-lg shadow-[#007BFF]/30"
            >
              Submit Ticket
            </button>

            <div className="bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-2xl p-4">
              <p className="text-[#007BFF] text-sm">
                <strong>Note:</strong> Our support team typically responds within 24 hours. For urgent issues, please use the chatbot.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
