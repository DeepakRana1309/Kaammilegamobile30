import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Loader, Shield, Zap } from 'lucide-react';

interface InstantVerificationScreenProps {
  userName: string;
  onVerificationComplete: (approved: boolean) => void;
}

export function InstantVerificationScreen({ 
  userName, 
  onVerificationComplete 
}: InstantVerificationScreenProps) {
  const [stage, setStage] = useState<'verifying' | 'success' | 'rejected'>('verifying');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const verificationSteps = [
    'Validating PAN format...',
    'Checking document authenticity...',
    'Verifying with government database...',
    'Admin verification in progress...',
    'Finalizing account activation...'
  ];

  useEffect(() => {
    // Simulate AI verification process
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= verificationSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    // After 5 seconds, show result (95% approval rate simulation)
    const resultTimer = setTimeout(() => {
      const isApproved = Math.random() > 0.05; // 95% approval rate
      setStage(isApproved ? 'success' : 'rejected');
      
      // Auto-proceed after 2 seconds
      setTimeout(() => {
        onVerificationComplete(isApproved);
      }, 2000);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(resultTimer);
    };
  }, []);

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col items-center justify-center px-4">
      {stage === 'verifying' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          {/* AI Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              {/* Rotating circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-[#007BFF]/30 border-t-[#007BFF] rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-4 border-[#00D9FF]/30 border-t-[#00D9FF] rounded-full"
              />
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#00D9FF] rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl text-center mb-2">
            Admin Verification
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Verifying your details with AI-powered system
          </p>

          {/* Progress Bar */}
          <div className="bg-[#141A2A] rounded-full h-3 mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#007BFF] to-[#00D9FF]"
            />
          </div>

          {/* Progress Text */}
          <p className="text-[#007BFF] text-center text-sm mb-8">
            {progress}% Complete
          </p>

          {/* Verification Steps */}
          <div className="space-y-3">
            {verificationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : index === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-5 h-5 text-[#007BFF] flex-shrink-0" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                )}
                <span className={`text-sm ${
                  index <= currentStep ? 'text-white' : 'text-gray-600'
                }`}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-[#007BFF] flex-shrink-0 mt-0.5" />
              <p className="text-[#007BFF] text-xs">
                Our AI system is verifying your documents instantly. This usually takes a few seconds.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {stage === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-32 h-32 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-3xl mb-3"
          >
            Account Activated!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-4"
          >
            Welcome {userName}, your account has been verified successfully
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-full text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Verification Complete</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm mt-6"
          >
            Redirecting to dashboard...
          </motion.p>
        </motion.div>
      )}

      {stage === 'rejected' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Rejection Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-32 h-32 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <XCircle className="w-16 h-16 text-red-500" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-3xl mb-3"
          >
            Verification Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-4"
          >
            We couldn't verify your PAN details
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 max-w-sm mx-auto"
          >
            <p className="text-red-400 text-sm">
              Possible reasons:
            </p>
            <ul className="text-red-400 text-xs mt-2 space-y-1 text-left">
              <li>• Invalid PAN number format</li>
              <li>• Document image unclear or incomplete</li>
              <li>• Details don't match government records</li>
            </ul>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm"
          >
            Please try again with correct details...
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
