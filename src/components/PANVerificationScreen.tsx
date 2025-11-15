import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, AlertCircle, CheckCircle, Camera, FileText, ArrowLeft } from 'lucide-react';

interface PANVerificationScreenProps {
  userName: string;
  onSubmit: () => void;
  onBack: () => void;
}

export function PANVerificationScreen({ userName, onSubmit, onBack }: PANVerificationScreenProps) {
  const [panNumber, setPanNumber] = useState('');
  const [panImage, setPanImage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handlePanChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setPanNumber(upperValue);
    // PAN format: ABCDE1234F
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setIsValid(panRegex.test(upperValue));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPanImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (isValid && panImage) {
      onSubmit();
    }
  };

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141A2A] to-[#0A0F1C] px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-[#0A0F1C] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
          <h1 className="text-white text-2xl mb-2">Verify Your Identity</h1>
          <p className="text-gray-400">Hello {userName}, please complete PAN verification</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141A2A] rounded-2xl p-6 mb-4"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#007BFF]/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-[#007BFF]" />
            </div>
            <div>
              <h3 className="text-white mb-2">Why PAN Verification?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                PAN verification helps us ensure platform security and prevent fraud. 
                Your details will be verified by our admin team within 24-48 hours.
              </p>
            </div>
          </div>
        </motion.div>

        {/* PAN Number Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#141A2A] rounded-2xl p-6 mb-4"
        >
          <label className="text-white mb-3 block">PAN Card Number</label>
          <input
            type="text"
            value={panNumber}
            onChange={(e) => handlePanChange(e.target.value)}
            maxLength={10}
            placeholder="ABCDE1234F"
            className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl outline-none border-2 border-transparent focus:border-[#007BFF] transition-all uppercase"
          />
          {panNumber && (
            <div className="flex items-center gap-2 mt-3">
              {isValid ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Valid PAN format</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm">Invalid PAN format</span>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* PAN Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141A2A] rounded-2xl p-6 mb-4"
        >
          <label className="text-white mb-3 block">Upload PAN Card Image</label>
          
          {!panImage ? (
            <label className="border-2 border-dashed border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#007BFF] transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-[#007BFF]/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-[#007BFF]" />
              </div>
              <p className="text-white mb-1">Tap to upload</p>
              <p className="text-gray-400 text-sm">JPG, PNG or PDF (Max 5MB)</p>
            </label>
          ) : (
            <div className="relative">
              <img
                src={panImage}
                alt="PAN Card"
                className="w-full rounded-xl"
              />
              <button
                onClick={() => setPanImage(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-lg">×</span>
              </button>
              <div className="flex items-center gap-2 mt-3">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">Image uploaded successfully</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-2xl p-4"
        >
          <p className="text-[#007BFF] text-sm leading-relaxed">
            <strong>Note:</strong> Ensure your PAN card image is clear and all details are visible. 
            After submission, our admin team will review and approve your account within 24-48 hours.
          </p>
        </motion.div>
      </div>

      {/* Submit Button */}
      <div className="px-4 py-4 bg-[#141A2A]">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleSubmit}
          disabled={!isValid || !panImage}
          className={`w-full py-4 rounded-xl font-medium transition-all ${
            isValid && panImage
              ? 'bg-[#007BFF] text-white shadow-lg shadow-[#007BFF]/30'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit for Verification
        </motion.button>
      </div>
    </div>
  );
}