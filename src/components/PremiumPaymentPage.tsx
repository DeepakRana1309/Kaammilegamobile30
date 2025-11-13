import { ArrowLeft, Crown, Shield, CheckCircle, Lock, AlertCircle, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PremiumPaymentPageProps {
  onBack: () => void;
  onPaymentSuccess: () => void;
  planDetails: {
    name: string;
    price: string;
  };
}

export function PremiumPaymentPage({ onBack, onPaymentSuccess, planDetails }: PremiumPaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Extract numeric price (remove ₹ symbol)
  const priceAmount = parseInt(planDetails.price.replace('₹', ''));

  const handleRazorpayPayment = () => {
    setIsProcessing(true);

    // Razorpay Integration Code
    // In production, you'll get order_id from your backend
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
      amount: priceAmount * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'Kaam Milega',
      description: `${planDetails.name} - Monthly Subscription`,
      image: '/logo.png', // Your app logo
      order_id: '', // This should come from backend after creating order
      handler: function (response: any) {
        // Payment successful
        console.log('Payment Success:', response);
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
        
        // Show success message
        setIsProcessing(false);
        setShowSuccess(true);

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      },
      prefill: {
        name: 'User Name', // Get from user profile
        email: 'user@example.com', // Get from user profile
        contact: '9999999999' // Get from user profile
      },
      notes: {
        plan: planDetails.name,
        subscription_type: 'monthly'
      },
      theme: {
        color: '#007BFF'
      },
      modal: {
        ondismiss: function() {
          // User closed the payment modal
          setIsProcessing(false);
          console.log('Payment cancelled by user');
        }
      }
    };

    // For demo purposes, simulate payment success
    // In production, uncomment below lines and remove setTimeout simulation
    
    // const razorpay = new (window as any).Razorpay(options);
    // razorpay.open();

    // DEMO SIMULATION - Remove this in production
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Auto redirect to dashboard after 2 seconds
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 2000);
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (showSuccess) {
    return (
      <div className="min-h-full bg-[#0A0F1C] text-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl mb-3">Payment Successful! 🎉</h2>
          <p className="text-gray-400 mb-2">Your premium subscription is now active</p>
          <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#141A2A]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl mb-1">Complete Payment</h1>
          <p className="text-gray-400 text-sm">Secure checkout with Razorpay</p>
        </div>
        <Lock className="w-5 h-5 text-green-500" />
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Plan Summary */}
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <h3 className="text-white text-center text-xl mb-2">{planDetails.name}</h3>
          <p className="text-blue-100 text-sm text-center mb-6">Monthly Premium Subscription</p>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white">Subscription Fee</span>
              <span className="text-white">{planDetails.price}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-white">GST (18%)</span>
              <span className="text-white">₹{Math.round(priceAmount * 0.18)}</span>
            </div>
            <div className="border-t border-white/20 pt-3 flex items-center justify-between">
              <span className="text-white">Total Amount</span>
              <span className="text-2xl text-white">₹{Math.round(priceAmount * 1.18)}</span>
            </div>
          </div>
        </div>

        {/* Premium Features Quick Preview */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            What You'll Get
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Instant premium badge on profile
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Priority listing & visibility boost
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Unlimited job applications
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Advanced analytics & insights
            </div>
          </div>
        </div>

        {/* Payment Methods Info */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <h3 className="text-white mb-3">Razorpay Accepts</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0A0F1C] rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">💳</span>
              <span className="text-gray-400 text-xs">Cards</span>
            </div>
            <div className="bg-[#0A0F1C] rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">📱</span>
              <span className="text-gray-400 text-xs">UPI</span>
            </div>
            <div className="bg-[#0A0F1C] rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">💰</span>
              <span className="text-gray-400 text-xs">Wallets</span>
            </div>
            <div className="bg-[#0A0F1C] rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">🏦</span>
              <span className="text-gray-400 text-xs">Net Banking</span>
            </div>
            <div className="bg-[#0A0F1C] rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">🟢</span>
              <span className="text-gray-400 text-xs">GPay</span>
            </div>
            <div className="bg-[#0A0F1C] rounded-lg p-3 text-center">
              <span className="text-2xl mb-1 block">🟣</span>
              <span className="text-gray-400 text-xs">PhonePe</span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 text-sm mb-1">🔒 100% Secure Payment</p>
              <p className="text-gray-400 text-xs">
                Your payment is processed securely through Razorpay with bank-grade encryption.
              </p>
            </div>
          </div>
        </div>

        {/* Auto-Renewal Info */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-400 text-sm mb-1">Auto-Renewal</p>
              <p className="text-gray-400 text-xs">
                Subscription renews monthly. Cancel anytime from settings before next billing cycle.
              </p>
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handleRazorpayPayment}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
            isProcessing
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-lg shadow-green-500/50'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ₹{Math.round(priceAmount * 1.18)} via Razorpay
            </>
          )}
        </button>

        {/* Razorpay Branding */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Powered by Razorpay Payment Gateway
          </p>
          <p className="text-gray-600 text-xs">
            Trusted by millions • PCI DSS Compliant
          </p>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center">
          By completing this payment, you agree to our Terms of Service and Privacy Policy.
          <br />
          Questions? Contact support@kaammilega.com
        </p>
      </div>
    </div>
  );
}
