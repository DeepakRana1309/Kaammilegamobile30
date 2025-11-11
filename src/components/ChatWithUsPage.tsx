import { ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';
import { useState } from 'react';

interface ChatWithUsPageProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

export function ChatWithUsPage({ onBack }: ChatWithUsPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Kaam Milega support. How can I help you today?',
      sender: 'support',
      time: '10:30 AM'
    },
    {
      id: 2,
      text: 'Hi! I have a question about job applications.',
      sender: 'user',
      time: '10:31 AM'
    },
    {
      id: 3,
      text: 'Sure! I\'d be happy to help. What would you like to know about job applications?',
      sender: 'support',
      time: '10:31 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate support response
      setTimeout(() => {
        const supportResponse: Message = {
          id: messages.length + 2,
          text: 'Thank you for your message. Our support team will respond shortly.',
          sender: 'support',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#141A2A]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center">
            <span className="text-white">KM</span>
          </div>
          <div>
            <h1 className="text-lg">Support Team</h1>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white'
                    : 'bg-[#141A2A] text-white border border-[#1f2937]'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#1f2937] bg-[#141A2A] px-5 py-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors pr-12"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-[#141A2A] rounded-lg transition-colors">
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
          </div>
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
  );
}
