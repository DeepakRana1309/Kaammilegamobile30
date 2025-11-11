import { ArrowLeft, CheckCircle, Briefcase, Wrench, Hotel, User } from 'lucide-react';

interface GettingStartedPageProps {
  onBack: () => void;
}

export function GettingStartedPage({ onBack }: GettingStartedPageProps) {
  const steps = [
    {
      title: 'Create Your Profile',
      description: 'Set up your account with personal details, skills, and preferences.',
      icon: User,
      color: '#007BFF'
    },
    {
      title: 'Explore Jobs',
      description: 'Browse thousands of job listings tailored to your skills and location.',
      icon: Briefcase,
      color: '#10B981'
    },
    {
      title: 'Book Services',
      description: 'Find and hire verified service providers near you instantly.',
      icon: Wrench,
      color: '#F59E0B'
    },
    {
      title: 'Reserve Hotels',
      description: 'Book comfortable stays at the best prices for your trips.',
      icon: Hotel,
      color: '#8B5CF6'
    }
  ];

  const features = [
    'Smart job matching based on your skills',
    'Real-time service provider availability',
    'Secure payment gateway with Razorpay',
    'Easy application tracking',
    'Verified service professionals',
    'Best hotel deals and offers',
    '24/7 customer support',
    'Wallet for quick transactions'
  ];

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
        <h1 className="text-lg flex-1">Getting Started</h1>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-6 text-center">
          <h2 className="text-2xl mb-2">Welcome to Kaam Milega! 🎉</h2>
          <p className="text-blue-100">
            Your all-in-one platform for jobs, services, and stays
          </p>
        </div>

        {/* How to Get Started */}
        <div>
          <h3 className="text-lg mb-4">How to Get Started</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] flex items-start gap-4"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: `${step.color}20`, color: step.color }}
                    >
                      {index + 1}
                    </span>
                    <h4 className="text-white">{step.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-lg mb-4">Key Features</h3>
          <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div>
          <h3 className="text-lg mb-4">Quick Tips</h3>
          <div className="space-y-3">
            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Complete your profile
              </h4>
              <p className="text-gray-400 text-sm">
                A complete profile increases your chances of getting hired by 70%
              </p>
            </div>

            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Apply quickly
              </h4>
              <p className="text-gray-400 text-sm">
                Jobs get filled fast! Enable notifications to never miss opportunities
              </p>
            </div>

            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <span className="text-xl">💰</span>
                Use your wallet
              </h4>
              <p className="text-gray-400 text-sm">
                Add money to your wallet for faster checkouts and exclusive deals
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-4 rounded-xl hover:shadow-lg transition-all">
          Start Exploring
        </button>
      </div>
    </div>
  );
}
