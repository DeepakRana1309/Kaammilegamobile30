import { ArrowLeft, Crown, Download, Calendar, CheckCircle, XCircle, AlertCircle, CreditCard, RefreshCw, Trash2, Shield, Star, Zap } from 'lucide-react';
import { useState } from 'react';

interface PremiumPaymentsManagePageProps {
  onBack: () => void;
  onUpgrade?: () => void;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  plan: string;
  invoiceNumber: string;
  paymentMethod: string;
}

export function PremiumPaymentsManagePage({ onBack, onUpgrade }: PremiumPaymentsManagePageProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Mock subscription data
  const subscription = {
    plan: 'Mid Premium',
    price: '₹25',
    status: 'active',
    nextBilling: '15 Dec 2025',
    startedOn: '15 Nov 2025',
    autoRenew: true
  };

  // Mock payment history
  const paymentHistory: PaymentHistory[] = [
    {
      id: 'PAY001',
      date: '15 Nov 2025',
      amount: '₹29.50',
      status: 'success',
      plan: 'Mid Premium',
      invoiceNumber: 'INV-2025-001',
      paymentMethod: 'UPI'
    },
    {
      id: 'PAY002',
      date: '15 Oct 2025',
      amount: '₹29.50',
      status: 'success',
      plan: 'Mid Premium',
      invoiceNumber: 'INV-2025-002',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'PAY003',
      date: '15 Sep 2025',
      amount: '₹29.50',
      status: 'success',
      plan: 'Entry Premium',
      invoiceNumber: 'INV-2025-003',
      paymentMethod: 'UPI'
    },
    {
      id: 'PAY004',
      date: '10 Sep 2025',
      amount: '₹22.42',
      status: 'failed',
      plan: 'Entry Premium',
      invoiceNumber: 'INV-2025-004',
      paymentMethod: 'UPI'
    }
  ];

  const handleDownloadInvoice = (invoiceNumber: string) => {
    console.log('Downloading invoice:', invoiceNumber);
    // In production, this would trigger invoice PDF download
  };

  const handleCancelSubscription = () => {
    console.log('Subscription cancelled');
    setShowCancelConfirm(false);
    // In production, this would cancel the subscription
  };

  const handleRetryPayment = (paymentId: string) => {
    console.log('Retrying payment:', paymentId);
    // In production, this would retry the failed payment
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-500/20 border-green-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/20 border-red-500/20';
      case 'pending':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937] bg-[#141A2A] sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#0A0F1C] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl mb-1">Premium Subscription</h1>
          <p className="text-gray-400 text-sm">Manage your plan & payments</p>
        </div>
        <Crown className="w-6 h-6 text-yellow-400" />
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Current Plan Status */}
        <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white mb-1">{subscription.plan}</h3>
                <p className="text-blue-100 text-sm">{subscription.price}/month</p>
              </div>
            </div>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-green-500/30">
              <CheckCircle className="w-3 h-3" />
              Active
            </span>
          </div>

          <div className="bg-white/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-100">Next Billing</span>
              <span className="text-white">{subscription.nextBilling}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-100">Started On</span>
              <span className="text-white">{subscription.startedOn}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-100">Auto-Renewal</span>
              <span className="text-white flex items-center gap-1">
                {subscription.autoRenew ? (
                  <>
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    On
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 text-red-400" />
                    Off
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Premium Benefits Active */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Your Active Benefits
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-[#007BFF]" />
              Priority listing in search results
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-[#007BFF]" />
              Featured Candidate badge
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-[#007BFF]" />
              Unlimited job applications
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-[#007BFF]" />
              Advanced analytics & insights
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Top Premium
            </button>
          )}

          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full bg-[#141A2A] text-red-400 py-3 rounded-xl border border-red-500/20 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            Cancel Subscription
          </button>
        </div>

        {/* Payment History */}
        <div>
          <h3 className="text-white mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#007BFF]" />
            Payment History
          </h3>

          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className={`bg-[#141A2A] rounded-xl p-4 border transition-all ${
                  selectedPayment === payment.id
                    ? 'border-[#007BFF] shadow-lg shadow-[#007BFF]/20'
                    : 'border-[#1f2937]'
                }`}
                onClick={() => setSelectedPayment(selectedPayment === payment.id ? null : payment.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white">{payment.plan}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 border ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{payment.date}</p>
                    <p className="text-gray-500 text-xs">Invoice: {payment.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white mb-1">{payment.amount}</p>
                    <p className="text-gray-400 text-xs">{payment.paymentMethod}</p>
                  </div>
                </div>

                {/* Expanded Actions */}
                {selectedPayment === payment.id && (
                  <div className="pt-3 border-t border-[#1f2937] flex gap-2">
                    {payment.status === 'success' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadInvoice(payment.invoiceNumber);
                        }}
                        className="flex-1 bg-[#007BFF]/20 text-[#007BFF] py-2 rounded-lg text-sm hover:bg-[#007BFF]/30 transition-all flex items-center justify-center gap-2 border border-[#007BFF]/20"
                      >
                        <Download className="w-4 h-4" />
                        Download Invoice
                      </button>
                    )}
                    {payment.status === 'failed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetryPayment(payment.id);
                        }}
                        className="flex-1 bg-orange-500/20 text-orange-400 py-2 rounded-lg text-sm hover:bg-orange-500/30 transition-all flex items-center justify-center gap-2 border border-orange-500/20"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Retry Payment
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#007BFF]" />
            Payment Method
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <p className="text-white text-sm">UPI</p>
                <p className="text-gray-400 text-xs">user@upi</p>
              </div>
            </div>
            <button className="text-[#007BFF] text-sm hover:underline">
              Change
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 text-sm mb-1">Secure Payments</p>
              <p className="text-gray-400 text-xs">
                All payments are processed securely through Razorpay with industry-standard encryption.
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          <h3 className="text-white mb-3">Need Help?</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-[#007BFF] text-sm hover:underline">
              View billing FAQs
            </button>
            <button className="w-full text-left text-[#007BFF] text-sm hover:underline">
              Contact support
            </button>
            <button className="w-full text-left text-[#007BFF] text-sm hover:underline">
              Request refund
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-5 z-50">
          <div className="bg-[#141A2A] rounded-xl p-6 max-w-sm w-full border border-[#1f2937]">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-white text-center text-lg mb-2">Cancel Subscription?</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Your premium benefits will remain active until {subscription.nextBilling}. 
              After that, you'll lose access to all premium features.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleCancelSubscription}
                className="w-full bg-red-500/20 text-red-400 py-3 rounded-xl border border-red-500/20 hover:bg-red-500/30 transition-all"
              >
                Yes, Cancel Subscription
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="w-full bg-[#007BFF] text-white py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Keep Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
