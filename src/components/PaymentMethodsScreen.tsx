import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Smartphone, Plus, Trash2, CheckCircle } from 'lucide-react';

interface PaymentMethodsScreenProps {
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'upi' | 'card';
  name: string;
  details: string;
  isDefault: boolean;
}

export function PaymentMethodsScreen({ onBack }: PaymentMethodsScreenProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'upi', name: 'Google Pay', details: 'rahul@okaxis', isDefault: true },
    { id: '2', type: 'card', name: 'HDFC Debit Card', details: '**** **** **** 4532', isDefault: false },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'upi' | 'card'>('upi');

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-[#141A2A] px-4 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white">Payment Methods</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* UPI Section */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm mb-3 px-2">UPI</h3>
          <div className="space-y-3">
            {paymentMethods.filter(pm => pm.type === 'upi').map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141A2A] rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-[#007BFF]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white">{method.name}</p>
                      {method.isDefault && (
                        <span className="text-xs bg-[#007BFF] text-white px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{method.details}</p>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="w-8 h-8 rounded-lg bg-[#007BFF]/10 flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-[#007BFF]" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <button
              onClick={() => {
                setAddType('upi');
                setShowAddModal(true);
              }}
              className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-center gap-2 border-2 border-dashed border-gray-600 hover:border-[#007BFF] transition-all"
            >
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Add UPI ID</span>
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm mb-3 px-2">CARDS</h3>
          <div className="space-y-3">
            {paymentMethods.filter(pm => pm.type === 'card').map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                className="bg-[#141A2A] rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#007BFF]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white">{method.name}</p>
                      {method.isDefault && (
                        <span className="text-xs bg-[#007BFF] text-white px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{method.details}</p>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="w-8 h-8 rounded-lg bg-[#007BFF]/10 flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 text-[#007BFF]" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <button
              onClick={() => {
                setAddType('card');
                setShowAddModal(true);
              }}
              className="w-full bg-[#141A2A] rounded-2xl p-4 flex items-center justify-center gap-2 border-2 border-dashed border-gray-600 hover:border-[#007BFF] transition-all"
            >
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Add Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowAddModal(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom">
            <div className="bg-[#141A2A] rounded-t-3xl p-6 max-w-[390px] mx-auto">
              <h3 className="text-white text-xl mb-4">
                Add {addType === 'upi' ? 'UPI ID' : 'Card'}
              </h3>
              {addType === 'upi' ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., username@okaxis)"
                    className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
                  />
                  <button
                    onClick={() => {
                      alert('UPI added successfully!');
                      setShowAddModal(false);
                    }}
                    className="w-full bg-[#007BFF] text-white py-3 rounded-xl"
                  >
                    Add UPI
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={16}
                    className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      maxLength={3}
                      className="flex-1 bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF]"
                  />
                  <button
                    onClick={() => {
                      alert('Card added successfully!');
                      setShowAddModal(false);
                    }}
                    className="w-full bg-[#007BFF] text-white py-3 rounded-xl"
                  >
                    Add Card
                  </button>
                </div>
              )}
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full text-gray-400 py-3 mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
