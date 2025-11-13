import { ArrowLeft, Check, Crown, Star, Zap, TrendingUp, Shield, Eye, Bell, MessageCircle, Award, Gift } from 'lucide-react';
import { useState } from 'react';

interface PremiumPlansPageProps {
  onBack: () => void;
  onSelectPlan: (planId: 'A' | 'B' | 'C', planDetails: { name: string, price: string }) => void;
}

export function PremiumPlansPage({ onBack, onSelectPlan }: PremiumPlansPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'A' | 'B' | 'C' | null>(null);

  const plans = [
    {
      id: 'A',
      name: 'Entry Premium',
      price: '₹19',
      period: '/month',
      tagline: 'Perfect for getting started',
      gradient: 'from-blue-500 to-blue-700',
      icon: Star,
      features: [
        { text: 'Profile visibility boost', icon: TrendingUp },
        { text: 'Daily job alerts (top-matched jobs)', icon: Bell },
        { text: '+5 extra job applications per month', icon: Zap },
        { text: 'Basic analytics (profile views, employer interest)', icon: Eye },
        { text: 'Ad-free experience', icon: Shield }
      ]
    },
    {
      id: 'B',
      name: 'Mid Premium',
      price: '₹25',
      period: '/month',
      tagline: 'Most Popular - Best Value',
      gradient: 'from-purple-500 to-purple-700',
      icon: Crown,
      popular: true,
      features: [
        { text: 'All Entry Premium features', icon: Check },
        { text: 'Priority listing (top of search results)', icon: TrendingUp },
        { text: 'Advanced filters (location + salary + role)', icon: Zap },
        { text: '"Featured Candidate" badge on profile', icon: Award },
        { text: 'Discounted service listings', icon: Gift },
        { text: 'Unlimited chat with employers/clients', icon: MessageCircle }
      ]
    },
    {
      id: 'C',
      name: 'Top Premium',
      price: '₹29',
      period: '/month',
      tagline: 'Ultimate Professional Package',
      gradient: 'from-yellow-500 to-orange-600',
      icon: Zap,
      features: [
        { text: 'All Mid Premium features', icon: Check },
        { text: '"Featured Job Seeker" highlight badge', icon: Star },
        { text: 'View "who viewed your profile" + insights', icon: Eye },
        { text: 'Access to exclusive jobs (premium only)', icon: Award },
        { text: 'Early access to new features', icon: Zap },
        { text: '₹50 credit after 3 months loyalty reward', icon: Gift }
      ]
    }
  ];

  const handleSelectPlan = (planId: 'A' | 'B' | 'C') => {
    setSelectedPlan(planId);
    onSelectPlan(planId);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      const plan = plans.find(p => p.id === selectedPlan);
      if (plan) {
        onSelectPlan(selectedPlan, { name: plan.name, price: plan.price });
      }
    }
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#141A2A]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl mb-1">Go Premium</h1>
          <p className="text-gray-400 text-sm">Unlock your full potential</p>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-6 text-center">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-pulse" />
          <h2 className="text-2xl mb-2">Supercharge Your Job Search</h2>
          <p className="text-blue-100 text-sm">
            Get noticed faster, apply smarter, and land your dream job
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id as 'A' | 'B' | 'C')}
                className={`relative bg-[#141A2A] rounded-xl p-5 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#007BFF] shadow-lg shadow-[#007BFF]/20'
                    : 'border-[#1f2937] hover:border-[#007BFF]/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-1 rounded-full text-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.gradient} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{plan.name}</h3>
                      <p className="text-gray-400 text-xs">{plan.tagline}</p>
                    </div>
                  </div>
                  
                  {/* Radio Button */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-[#007BFF] bg-[#007BFF]' : 'border-gray-600'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl">{plan.price}</span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Cancel anytime • No commitments</p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} bg-opacity-20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <FeatureIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-[#1f2937]">
                    <div className="text-[#007BFF] text-sm text-center flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Selected
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#007BFF]" />
            Why Go Premium?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#007BFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">3x More Profile Views</p>
                <p className="text-gray-400 text-xs">Premium members get significantly more visibility</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#007BFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Stand Out from Competition</p>
                <p className="text-gray-400 text-xs">Get featured badges and priority placement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-[#007BFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#007BFF]" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Land Jobs 2x Faster</p>
                <p className="text-gray-400 text-xs">Premium users report faster job placements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          disabled={!selectedPlan}
          className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
            selectedPlan
              ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg shadow-[#007BFF]/50'
              : 'bg-[#141A2A] text-gray-500 cursor-not-allowed'
          }`}
        >
          <Crown className="w-5 h-5" />
          {selectedPlan ? `Continue to Payment` : 'Select a Plan to Continue'}
        </button>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 text-center">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          <br />
          Your subscription will auto-renew. Cancel anytime from settings.
        </p>
      </div>
    </div>
  );
}