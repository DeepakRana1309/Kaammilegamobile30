import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQPageProps {
  onBack: () => void;
}

export function FAQPage({ onBack }: FAQPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'General',
      faqs: [
        {
          q: 'What is Kaam Milega?',
          a: 'Kaam Milega is a comprehensive platform that connects job seekers with employers, provides instant service providers, and offers hotel booking services all in one place.'
        },
        {
          q: 'How do I create an account?',
          a: 'Download the app, click on "Sign Up", enter your details including email, phone number, and create a password. You\'ll receive a verification code to complete the registration.'
        },
        {
          q: 'Is Kaam Milega free to use?',
          a: 'Yes, basic features are completely free. Premium features and services may have associated costs which will be clearly mentioned before you proceed.'
        }
      ]
    },
    {
      category: 'Jobs',
      faqs: [
        {
          q: 'How do I apply for jobs?',
          a: 'Browse available jobs, click on a job card to view details, and click "Apply Now". Fill in your details, upload your resume, and submit your application.'
        },
        {
          q: 'Can I save jobs for later?',
          a: 'Yes! Click the bookmark icon on any job details page to save it. Access your saved jobs from your profile.'
        },
        {
          q: 'How do I track my applications?',
          a: 'Go to your Profile > My Applications to see all jobs you\'ve applied to and their current status.'
        }
      ]
    },
    {
      category: 'Services',
      faqs: [
        {
          q: 'How do I book a service provider?',
          a: 'Go to the Services tab, browse available providers, check their ratings and pricing, then click "Request Service" to book.'
        },
        {
          q: 'Are service providers verified?',
          a: 'Yes, all service providers go through our verification process including background checks and skill assessments.'
        },
        {
          q: 'What if I\'m not satisfied with a service?',
          a: 'You can rate and review the service provider. If you have issues, contact our support team for resolution.'
        }
      ]
    },
    {
      category: 'Hotels',
      faqs: [
        {
          q: 'How do I book a hotel room?',
          a: 'Navigate to the Hotels tab, search for your destination, browse available hotels, select a room type, and proceed to payment.'
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Cancellation policies vary by hotel. Check the specific hotel\'s cancellation policy before booking.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'Refunds are processed according to the hotel\'s cancellation policy. Premium bookings may have different terms.'
        }
      ]
    },
    {
      category: 'Payment & Wallet',
      faqs: [
        {
          q: 'How do I add money to my wallet?',
          a: 'Go to Wallet > Add Money, enter the amount, select your payment method (UPI/Card), and complete the payment via Razorpay.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Absolutely! All payments are processed through Razorpay\'s secure payment gateway with bank-level encryption.'
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Wallet payments.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
        <h1 className="text-lg flex-1">Frequently Asked Questions</h1>
      </div>

      {/* Search Bar */}
      <div className="px-5 pt-6 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full bg-[#141A2A] text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="px-5 pb-6 space-y-6">
        {filteredCategories.map((category, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-lg mb-3 text-[#007BFF] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#007BFF] rounded-full"></span>
              {category.category}
            </h2>
            <div className="space-y-2">
              {category.faqs.map((faq, faqIndex) => {
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
                      <span className="text-white text-left">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#007BFF] flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
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
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No FAQs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
