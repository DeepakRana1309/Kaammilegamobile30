import { CheckCircle, IndianRupee, CreditCard, Smartphone, Wallet as WalletIcon, Banknote, Star } from 'lucide-react';
import { useState } from 'react';

interface PaymentPromptPageProps {
  bookingDetails: any;
  onPaymentComplete: () => void;
}

export function PaymentPromptPage({ bookingDetails, onPaymentComplete }: PaymentPromptPageProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(bookingDetails.paymentMethod);

  const handlePayment = () => {
    setIsPaying(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 2000);
  };

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: <Banknote className="w-6 h-6" />, color: 'from-green-500 to-green-700' },
    { id: 'upi', name: 'UPI', icon: <Smartphone className="w-6 h-6" />, color: 'from-purple-500 to-purple-700' },
    { id: 'card', name: 'Card', icon: <CreditCard className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
    { id: 'wallet', name: 'Wallet', icon: <WalletIcon className="w-6 h-6" />, color: 'from-orange-500 to-orange-700' }
  ];

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-24">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 px-5 py-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl mb-2">Service Completed!</h1>
        <p className="text-green-100 text-sm">
          {bookingDetails.worker.name} has completed the service
        </p>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Worker Card */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-3xl">
              {bookingDetails.worker.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg mb-1">{bookingDetails.worker.name}</h3>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm">{bookingDetails.worker.rating}</span>
                <span className="text-gray-400 text-sm">• {bookingDetails.subServiceName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-6 text-center">
          <p className="text-blue-100 text-sm mb-2">Amount to Pay</p>
          <div className="flex items-center justify-center gap-1">
            <IndianRupee className="w-8 h-8 text-white" />
            <span className="text-5xl text-white">{bookingDetails.total}</span>
          </div>
          <p className="text-blue-100 text-xs mt-2">Including platform fee</p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <h4 className="text-white">Select Payment Method</h4>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`relative rounded-xl p-4 border-2 transition-all ${
                  paymentMethod === method.id
                    ? 'border-[#007BFF] bg-[#007BFF]/10'
                    : 'border-[#1f2937] bg-[#141A2A] hover:border-[#007BFF]/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center text-white mb-2 mx-auto`}>
                  {method.icon}
                </div>
                <p className="text-white text-sm text-center">{method.name}</p>
                {paymentMethod === method.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#007BFF] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <h4 className="text-white mb-3">Bill Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Service: {bookingDetails.subServiceName}</span>
              <span className="text-white">₹{bookingDetails.total - 20}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Platform Fee</span>
              <span className="text-white">₹20</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Service Duration</span>
              <span className="text-white">~45 min</span>
            </div>
            <div className="border-t border-[#1f2937] pt-2 mt-2 flex items-center justify-between">
              <span className="text-white">Total Payable</span>
              <span className="text-xl text-[#007BFF]">₹{bookingDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        {paymentMethod === 'cash' && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <p className="text-yellow-400 text-sm mb-1">Cash Payment</p>
                <p className="text-gray-400 text-xs">
                  Please pay ₹{bookingDetails.total} in cash to {bookingDetails.worker.name}
                </p>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-purple-400 text-sm mb-1">UPI Payment</p>
                <p className="text-gray-400 text-xs">
                  You'll be redirected to your UPI app to complete the payment
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-blue-400 text-sm mb-1">After Payment</p>
              <p className="text-gray-400 text-xs">
                Once you complete the payment, you'll be asked to rate your experience with {bookingDetails.worker.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#141A2A] border-t border-[#1f2937] px-5 py-4 max-w-[390px] mx-auto">
        <button
          onClick={handlePayment}
          disabled={isPaying}
          className={`w-full py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            isPaying
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-green-700 hover:shadow-xl'
          }`}
        >
          {isPaying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white">Processing Payment...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white">Pay ₹{bookingDetails.total}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
