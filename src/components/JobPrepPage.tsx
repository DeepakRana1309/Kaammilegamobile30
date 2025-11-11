import { Brain, FileText, MessageSquare, PlayCircle, TrendingUp, CheckCircle, User, Wallet, Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface JobPrepPageProps {
  onProfileClick: () => void;
  onWalletClick: () => void;
  onMenuClick: () => void;
}

export function JobPrepPage({ onProfileClick, onWalletClick, onMenuClick }: JobPrepPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const learningCards = [
    {
      id: 1,
      title: 'Aptitude Quiz',
      description: 'Test your logical reasoning',
      icon: Brain,
      progress: 65,
      color: '#007BFF'
    },
    {
      id: 2,
      title: 'Resume Builder',
      description: 'Create a professional resume',
      icon: FileText,
      progress: 40,
      color: '#10B981'
    },
    {
      id: 3,
      title: 'Interview Tips',
      description: 'Master your interviews',
      icon: MessageSquare,
      progress: 80,
      color: '#F59E0B'
    }
  ];

  const commonQuestions = [
    'Tell me about yourself',
    'What are your strengths and weaknesses?',
    'Why do you want to work here?',
    'Where do you see yourself in 5 years?'
  ];

  const faqs = [
    {
      category: 'Technical',
      questions: [
        {
          q: 'What is your experience with React?',
          a: 'Focus on your hands-on projects, mention specific features you\'ve built, and discuss how you handle state management and component architecture.'
        },
        {
          q: 'Explain the difference between var, let, and const',
          a: 'var is function-scoped, let and const are block-scoped. const cannot be reassigned, while let can. Always prefer const unless you need to reassign.'
        }
      ]
    },
    {
      category: 'Behavioral',
      questions: [
        {
          q: 'Tell me about a challenging project',
          a: 'Use the STAR method: Situation, Task, Action, Result. Be specific about your role and the impact you made.'
        },
        {
          q: 'How do you handle conflicts in a team?',
          a: 'Focus on communication, empathy, and finding win-win solutions. Give real examples from your experience.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl mb-1">Job Preparation</h1>
            <p className="text-gray-400 text-sm">Enhance your skills & prepare for success</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onWalletClick}
            className="bg-[#141A2A] p-2.5 rounded-full border border-[#1f2937] hover:border-[#007BFF] transition-all"
          >
            <Wallet className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={onProfileClick}
            className="bg-[#141A2A] p-2.5 rounded-full border border-[#1f2937] hover:border-[#007BFF] transition-all"
          >
            <User className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="mx-5 mb-6 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white mb-1">Your Progress</h3>
            <p className="text-blue-100 text-sm">Keep learning!</p>
          </div>
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center flex-1 border-r border-blue-400">
            <div className="text-2xl">12</div>
            <div className="text-xs text-blue-100">Courses</div>
          </div>
          <div className="text-center flex-1 border-r border-blue-400">
            <div className="text-2xl">8</div>
            <div className="text-xs text-blue-100">Completed</div>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl">67%</div>
            <div className="text-xs text-blue-100">Overall</div>
          </div>
        </div>
      </div>

      {/* Learning Dashboard Cards */}
      <div className="px-5 mb-6">
        <h2 className="text-lg mb-3">Learning Modules</h2>
        <div className="space-y-3">
          {learningCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <card.icon 
                    className="w-6 h-6"
                    style={{ color: card.color }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span style={{ color: card.color }}>{card.progress}%</span>
                </div>
                <div className="w-full bg-[#0A0F1C] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${card.progress}%`,
                      backgroundColor: card.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Interview Questions */}
      <div className="px-5 mb-6">
        <h2 className="text-lg mb-3">Common Interview Questions</h2>
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="space-y-3 mb-4">
            {commonQuestions.map((question, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{question}</p>
              </div>
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
            <PlayCircle className="w-5 h-5" />
            Practice Now
          </button>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="px-5">
        <h2 className="text-lg mb-3">Quick Resources</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] text-center hover:border-[#007BFF] transition-all cursor-pointer">
            <Brain className="w-8 h-8 text-[#007BFF] mx-auto mb-2" />
            <p className="text-sm">Skill Tests</p>
          </div>
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] text-center hover:border-[#007BFF] transition-all cursor-pointer">
            <FileText className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
            <p className="text-sm">Templates</p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="px-5 pt-6 pb-6">
        <h2 className="text-lg mb-3">Interview FAQs by Category</h2>
        <div className="space-y-3">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="space-y-2">
              <h3 className="text-[#007BFF] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#007BFF] rounded-full"></span>
                {category.category} Questions
              </h3>
              {category.questions.map((faq, faqIndex) => {
                const faqId = catIndex * 100 + faqIndex;
                const isExpanded = expandedFaq === faqId;
                
                return (
                  <div
                    key={faqIndex}
                    className="bg-[#141A2A] rounded-xl border border-[#1f2937] overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                      className="w-full p-4 flex items-center justify-between hover:bg-[#0A0F1C] transition-colors"
                    >
                      <span className="text-white text-left text-sm">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#007BFF] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 text-sm text-gray-300 leading-relaxed animate-in slide-in-from-top">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}