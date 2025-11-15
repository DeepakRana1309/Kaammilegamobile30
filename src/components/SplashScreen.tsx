import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#0A0F1C] to-[#141A2A] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(0, 123, 255, 0.3)',
              '0 0 40px rgba(0, 123, 255, 0.6)',
              '0 0 20px rgba(0, 123, 255, 0.3)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block p-6 rounded-3xl bg-[#007BFF] mb-6"
        >
          <Briefcase className="w-16 h-16 text-white" strokeWidth={2} />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white text-3xl tracking-wide"
        >
          Kaam Milega
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-400 mt-2"
        >
          Your Work, Our Priority
        </motion.p>
      </motion.div>
    </div>
  );
}
