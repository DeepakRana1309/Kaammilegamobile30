import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Users, MapPin, ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Briefcase,
    title: 'Find Your Dream Job',
    description: 'Browse thousands of job listings from top companies. Apply instantly and track your applications.',
    color: '#007BFF',
  },
  {
    icon: Users,
    title: 'Hire Instant Services',
    description: 'Need a plumber, electrician, or cleaner? Find verified service providers near you in seconds.',
    color: '#00D9FF',
  },
  {
    icon: MapPin,
    title: 'Connect & Grow',
    description: 'Whether you\'re seeking work or offering services, Kaam Milega connects you with opportunities.',
    color: '#00FFA3',
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#0A0F1C] to-[#141A2A] flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-gray-400 hover:text-white transition-colors px-4 py-2"
        >
          Skip
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  `0 0 30px ${slides[currentSlide].color}40`,
                  `0 0 50px ${slides[currentSlide].color}60`,
                  `0 0 30px ${slides[currentSlide].color}40`,
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-8 rounded-3xl bg-[#141A2A] mb-8"
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-20 h-20" style={{ color: slides[currentSlide].color }} strokeWidth={1.5} />;
              })()}
            </motion.div>
            <h2 className="text-white text-2xl mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-[#007BFF]'
                : 'w-2 bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          className="w-full bg-[#007BFF] hover:bg-[#0066CC] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#007BFF]/20"
        >
          <span>{currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
