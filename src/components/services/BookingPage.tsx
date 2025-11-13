import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, Wallet, IndianRupee, User, Phone, Home } from 'lucide-react';
import { useState } from 'react';

interface Worker {
  id: string;
  name: string;
  rating: number;
  price: number;
  avatar: string;
}

interface BookingPageProps {
  worker: Worker;
  serviceName: string;
  subServiceName: string;
  onBack: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

export function BookingPage({ worker, serviceName, subServiceName, onBack, onConfirmBooking }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState('2025-11-13');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
  const [address, setAddress] = useState('123, MG Road, Mumbai, Maharashtra - 400001');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [name, setName] = useState('Rahul Sharma');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash on Service', icon: '💵' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'wallet', name: 'Wallet', icon: '👛' }
  ];

  const serviceFee = worker.price;
  const platformFee = 20;
  const total = serviceFee + platformFee;

  const handleConfirm = () => {
    const bookingDetails = {
      worker,
      serviceName,
      subServiceName,
      date: selectedDate,
      time: selectedTime,
      paymentMethod: selectedPaymentMethod,
      address,
      phone,
      name,
      total
    };
    onConfirmBooking(bookingDetails);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#0A0F1C] sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl">Book Service</h1>
          <p className="text-gray-400 text-sm">{serviceName} - {subServiceName}</p>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Worker Info */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-2xl">
              {worker.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">{worker.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-400">⭐ {worker.rating}</span>
                <span className="text-gray-400">•</span>
                <span className="text-[#007BFF]">₹{worker.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-3">
          <h3 className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#007BFF]" />
            Your Details
          </h3>
          <div className="space-y-3">
            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
              />
            </div>
            <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
              <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <h3 className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#007BFF]" />
            Service Location
          </h3>
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
              placeholder="Enter your complete address"
            />
            <button className="mt-2 text-[#007BFF] text-sm hover:underline flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Use current location
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <h3 className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#007BFF]" />
            Select Date
          </h3>
          <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-[#0A0F1C] text-white px-3 py-2 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-3">
          <h3 className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#007BFF]" />
            Select Time
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-lg text-sm transition-all ${
                  selectedTime === time
                    ? 'bg-[#007BFF] text-white border border-[#007BFF]'
                    : 'bg-[#141A2A] text-gray-400 border border-[#1f2937] hover:border-[#007BFF]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h3 className="text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#007BFF]" />
            Payment Method
          </h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`w-full bg-[#141A2A] rounded-xl p-4 border transition-all text-left ${
                  selectedPaymentMethod === method.id
                    ? 'border-[#007BFF] bg-[#007BFF]/10'
                    : 'border-[#1f2937] hover:border-[#007BFF]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-white">{method.name}</span>
                  {selectedPaymentMethod === method.id && (
                    <span className="ml-auto text-[#007BFF]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] space-y-3">
          <h3 className="text-white mb-3">Price Breakdown</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Service Fee</span>
            <span className="text-white">₹{serviceFee}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Platform Fee</span>
            <span className="text-white">₹{platformFee}</span>
          </div>
          <div className="border-t border-[#1f2937] pt-3 flex items-center justify-between">
            <span className="text-white">Total Amount</span>
            <span className="text-xl text-[#007BFF]">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#141A2A] border-t border-[#1f2937] px-5 py-4 max-w-[390px] mx-auto">
        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3.5 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Confirm Booking • ₹{total}
        </button>
      </div>
    </div>
  );
}
