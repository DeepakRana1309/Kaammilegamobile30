import { ArrowLeft, Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface WalletPageProps {
  onBack: () => void;
}

export function WalletPage({ onBack }: WalletPageProps) {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const transactions = [
    { id: 1, type: 'credit', title: 'Referral Bonus', amount: 500, date: '2 hours ago' },
    { id: 2, type: 'debit', title: 'Premium Service Payment', amount: 299, date: '1 day ago' },
    { id: 3, type: 'credit', title: 'Cashback', amount: 50, date: '2 days ago' },
    { id: 4, type: 'debit', title: 'Job Application Fee', amount: 100, date: '3 days ago' },
    { id: 5, type: 'credit', title: 'Added Money', amount: 1000, date: '5 days ago' }
  ];

  const balance = 2851;

  const quickAmounts = [100, 500, 1000, 2000];

  const handleAddMoney = () => {
    if (amount) {
      setIsProcessing(true);
      
      // Simulate Razorpay integration
      setTimeout(() => {
        const options = {
          key: 'rzp_test_XXXXXXXXXXX', // Replace with actual Razorpay key
          amount: parseInt(amount) * 100, // Amount in paise
          currency: 'INR',
          name: 'Kaam Milega',
          description: 'Add money to wallet',
          image: '/logo.png',
          handler: function(response: any) {
            // Handle successful payment
            console.log('Payment successful:', response);
            setShowAddMoney(false);
            setAmount('');
            setIsProcessing(false);
            alert(`Successfully added ₹${amount} to wallet!`);
          },
          prefill: {
            name: 'Rahul Sharma',
            email: 'rahul@example.com',
            contact: '9876543210'
          },
          theme: {
            color: '#007BFF'
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
            }
          }
        };

        // Check if Razorpay is available
        if (typeof (window as any).Razorpay !== 'undefined') {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } else {
          // Fallback for demo purposes
          alert(`Razorpay Demo: Adding ₹${amount} to wallet`);
          setShowAddMoney(false);
          setAmount('');
          setIsProcessing(false);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white relative">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">My Wallet</h1>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-2xl p-6 shadow-lg shadow-[#007BFF]/20">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Available Balance</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl mb-2">₹{balance.toLocaleString()}</h2>
              <p className="text-white/80 text-sm">Kaam Milega Cash</p>
            </div>
            <button
              onClick={() => setShowAddMoney(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-xl transition-all"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setShowAddMoney(true)}
            className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all"
          >
            <Smartphone className="w-6 h-6 text-[#007BFF] mb-2" />
            <p className="text-white text-sm">Add Money</p>
            <p className="text-gray-400 text-xs">via UPI</p>
          </button>
          <button className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] hover:border-[#007BFF] transition-all">
            <ArrowUpRight className="w-6 h-6 text-[#007BFF] mb-2" />
            <p className="text-white text-sm">Send Money</p>
            <p className="text-gray-400 text-xs">To wallet</p>
          </button>
        </div>

        {/* Transactions */}
        <div className="space-y-3">
          <h3 className="text-lg">Recent Transactions</h3>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937] flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'credit' 
                    ? 'bg-green-500/10' 
                    : 'bg-red-500/10'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white">{transaction.title}</p>
                  <p className="text-gray-400 text-xs">{transaction.date}</p>
                </div>
                <p className={`${
                  transaction.type === 'credit' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50 animate-in fade-in">
          <div className="bg-[#141A2A] rounded-t-3xl w-full max-w-[390px] p-6 animate-in slide-in-from-bottom">
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#007BFF]/10 p-3 rounded-full">
                <Smartphone className="w-6 h-6 text-[#007BFF]" />
              </div>
              <div>
                <h3 className="text-xl text-white">Add Money to Wallet</h3>
                <p className="text-gray-400 text-sm">Pay securely via Razorpay</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-[#0A0F1C] text-white text-2xl pl-10 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="bg-[#0A0F1C] text-white py-2 rounded-lg border border-[#1f2937] hover:border-[#007BFF] transition-all text-sm"
                  >
                    ₹{quickAmount}
                  </button>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="bg-[#0A0F1C] rounded-xl p-4 border border-[#1f2937]">
                <p className="text-sm text-gray-400 mb-3">Payment Method</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="w-4 h-4 text-[#007BFF]"
                    />
                    <Smartphone className="w-5 h-5 text-[#007BFF]" />
                    <span className="text-white text-sm">UPI (GPay, PhonePe, Paytm)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      className="w-4 h-4 text-[#007BFF]"
                    />
                    <svg className="w-5 h-5 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2"/>
                      <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2"/>
                    </svg>
                    <span className="text-white text-sm">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddMoney(false);
                    setAmount('');
                  }}
                  disabled={isProcessing}
                  className="flex-1 bg-[#0A0F1C] text-white py-3 rounded-xl border border-[#1f2937] hover:border-[#007BFF] transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMoney}
                  disabled={!amount || isProcessing}
                  className={`flex-1 py-3 rounded-xl transition-all ${
                    amount && !isProcessing
                      ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg'
                      : 'bg-[#0A0F1C] text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                🔒 Secured by Razorpay Payment Gateway
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}