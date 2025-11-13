import { Phone, MessageCircle, Star, MapPin, Calendar, Clock, IndianRupee, CreditCard, CheckCircle, Edit } from 'lucide-react';
import { useState } from 'react';

interface JobAcceptedPageProps {
  bookingDetails: any;
  onPaymentMethodChange: (method: string) => void;
  onContinue: () => void;
}

export function JobAcceptedPage({ bookingDetails, onPaymentMethodChange, onContinue }: JobAcceptedPageProps) {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(bookingDetails.paymentMethod);

  const paymentMethods = [
    { id: 'cash', name: 'Cash on Service', icon: '💵', description: 'Pay after service completion' },
    { id: 'upi', name: 'UPI', icon: '📱', description: 'GPay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
    { id: 'wallet', name: 'Wallet', icon: '👛', description: 'Pay from wallet balance' }
  ];

  const handlePaymentChange = (methodId: string) => {
    setSelectedPayment(methodId);
    onPaymentMethodChange(methodId);
    setShowPaymentOptions(false);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-24">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 px-5 py-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl mb-2">Booking Confirmed!</h1>
        <p className="text-green-100 text-sm">
          {bookingDetails.worker.name} has accepted your request
        </p>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Worker Card */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-3xl">
              {bookingDetails.worker.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg mb-1">{bookingDetails.worker.name}</h3>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm">{bookingDetails.worker.rating}</span>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#007BFF] text-white py-3 rounded-xl hover:bg-[#0056b3] transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Worker
            </button>
            <button className="flex-1 bg-[#0A0F1C] text-[#007BFF] py-3 rounded-xl border border-[#007BFF] hover:bg-[#007BFF]/10 transition-all flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] space-y-3">
          <h4 className="text-white mb-2">Service Details</h4>
          
          <div className="flex items-start gap-3 pb-3 border-b border-[#1f2937]">
            <div className="w-10 h-10 bg-[#007BFF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🔧</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs mb-1">Service Type</p>
              <p className="text-white">{bookingDetails.serviceName}</p>
              <p className="text-gray-400 text-sm">{bookingDetails.subServiceName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-3 border-b border-[#1f2937]">
            <Calendar className="w-5 h-5 text-[#007BFF] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-400 text-xs mb-1">Date & Time</p>
              <p className="text-white">{bookingDetails.date} at {bookingDetails.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#007BFF] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-gray-400 text-xs mb-1">Service Location</p>
              <p className="text-white text-sm">{bookingDetails.address}</p>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#007BFF]" />
              Payment Method
            </h4>
            <button 
              onClick={() => setShowPaymentOptions(!showPaymentOptions)}
              className="text-[#007BFF] text-sm hover:underline flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Change
            </button>
          </div>

          {/* Current Payment Method */}
          {!showPaymentOptions && (
            <div className="bg-[#0A0F1C] rounded-lg p-3 border border-[#007BFF]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {paymentMethods.find(m => m.id === selectedPayment)?.icon}
                </span>
                <div className="flex-1">
                  <p className="text-white">{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                  <p className="text-gray-400 text-xs">{paymentMethods.find(m => m.id === selectedPayment)?.description}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-[#007BFF]" />
              </div>
            </div>
          )}

          {/* Payment Options */}
          {showPaymentOptions && (
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentChange(method.id)}
                  className={`w-full rounded-lg p-3 border transition-all text-left ${
                    selectedPayment === method.id
                      ? 'bg-[#007BFF]/10 border-[#007BFF]'
                      : 'bg-[#0A0F1C] border-[#1f2937] hover:border-[#007BFF]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm">{method.name}</p>
                      <p className="text-gray-400 text-xs">{method.description}</p>
                    </div>
                    {selectedPayment === method.id && (
                      <CheckCircle className="w-5 h-5 text-[#007BFF]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <h4 className="text-white mb-3">Payment Summary</h4>
          <div className="space-y-2 text-sm mb-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Service Charge</span>
              <span className="text-white">₹{bookingDetails.total - 20}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Platform Fee</span>
              <span className="text-white">₹20</span>
            </div>
          </div>
          <div className="border-t border-[#1f2937] pt-3 flex items-center justify-between">
            <span className="text-white">Total Amount</span>
            <span className="text-2xl text-[#007BFF] flex items-center">
              <IndianRupee className="w-5 h-5" />
              {bookingDetails.total}
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="text-blue-400 text-sm mb-1">What's Next?</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                The worker is on the way. You'll receive a notification when they're nearby. 
                You can track their live location once they start their journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#141A2A] border-t border-[#1f2937] px-5 py-4 max-w-[390px] mx-auto">
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3.5 rounded-xl hover:shadow-xl transition-all"
        >
          Track Worker
        </button>
      </div>
    </div>
  );
}
