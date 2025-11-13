import { Star, ThumbsUp, Send, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RatingPageProps {
  bookingDetails: any;
  onRatingComplete: () => void;
}

export function RatingPage({ bookingDetails, onRatingComplete }: RatingPageProps) {
  const [workerRating, setWorkerRating] = useState(0);
  const [workerReview, setWorkerReview] = useState('');
  const [showAppRating, setShowAppRating] = useState(false);
  const [appRating, setAppRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user should be shown app rating
    // In production, this would check: user has used app 2, 4, 6, 8... times
    const serviceCount = parseInt(localStorage.getItem('serviceCount') || '0');
    const hasRatedApp = localStorage.getItem('hasRatedApp') === 'true';
    
    // Show app rating every 2 services if not rated
    if (!hasRatedApp && serviceCount > 0 && serviceCount % 2 === 0) {
      setShowAppRating(true);
    }
  }, []);

  const handleWorkerRatingClick = (rating: number) => {
    setWorkerRating(rating);
  };

  const handleAppRatingClick = (rating: number) => {
    setAppRating(rating);
  };

  const handleSubmit = () => {
    if (workerRating === 0) {
      alert('Please rate the worker');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      // Update service count
      const serviceCount = parseInt(localStorage.getItem('serviceCount') || '0');
      localStorage.setItem('serviceCount', (serviceCount + 1).toString());

      // If app was rated, save it
      if (appRating > 0) {
        localStorage.setItem('hasRatedApp', 'true');
      }

      onRatingComplete();
    }, 1500);
  };

  const handleSkipAppRating = () => {
    setShowAppRating(false);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] px-5 py-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <ThumbsUp className="w-12 h-12 text-[#007BFF]" />
        </div>
        <h1 className="text-2xl mb-2">Payment Successful!</h1>
        <p className="text-blue-100 text-sm">
          Help others by rating your experience
        </p>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Worker Rating Section */}
        <div className="bg-[#141A2A] rounded-xl p-5 border border-[#1f2937]">
          {/* Worker Info */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1f2937]">
            <div className="w-14 h-14 bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center text-2xl">
              {bookingDetails.worker.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">{bookingDetails.worker.name}</h3>
              <p className="text-gray-400 text-sm">{bookingDetails.subServiceName}</p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm mb-3">How was your experience?</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleWorkerRatingClick(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= workerRating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            {workerRating > 0 && (
              <p className="text-[#007BFF] text-sm">
                {workerRating === 5 ? 'Excellent!' : workerRating === 4 ? 'Great!' : workerRating === 3 ? 'Good' : workerRating === 2 ? 'Fair' : 'Poor'}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">
              Share your feedback (Optional)
            </label>
            <textarea
              value={workerReview}
              onChange={(e) => setWorkerReview(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={4}
              className="w-full bg-[#0A0F1C] text-white px-3 py-3 rounded-lg border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Quick Tags */}
          <div className="mt-3">
            <p className="text-gray-400 text-xs mb-2">Quick tags:</p>
            <div className="flex flex-wrap gap-2">
              {['Professional', 'On Time', 'Quality Work', 'Friendly', 'Value for Money'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setWorkerReview(prev => prev ? `${prev}, ${tag}` : tag)}
                  className="px-3 py-1 bg-[#0A0F1C] text-gray-400 text-xs rounded-full border border-[#1f2937] hover:border-[#007BFF] hover:text-[#007BFF] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* App Rating Section - Shown every 2 services */}
        {showAppRating && (
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-5 border border-purple-500/30 relative">
            <button
              onClick={handleSkipAppRating}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-white mb-1">Enjoying Kaam Milega?</h3>
              <p className="text-gray-400 text-sm">Rate our app on Play Store</p>
            </div>

            {/* App Rating Stars */}
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleAppRatingClick(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= appRating
                        ? 'text-purple-400 fill-purple-400'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            {appRating > 0 && (
              <div className="text-center">
                <p className="text-purple-400 text-sm mb-2">Thank you for rating us!</p>
                <button className="text-xs text-gray-400 hover:text-[#007BFF] transition-colors">
                  Rate on Play Store →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Service Summary */}
        <div className="bg-[#141A2A] rounded-xl p-4 border border-[#1f2937]">
          <h4 className="text-white mb-3">Service Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Service</span>
              <span className="text-white">{bookingDetails.subServiceName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Date</span>
              <span className="text-white">{bookingDetails.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Amount Paid</span>
              <span className="text-[#007BFF]">₹{bookingDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-blue-400 text-sm mb-1">Your review matters</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Your honest feedback helps other users make better decisions and helps workers improve their service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#141A2A] border-t border-[#1f2937] px-5 py-4 max-w-[390px] mx-auto">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || workerRating === 0}
          className={`w-full py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            isSubmitting || workerRating === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white">Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 text-white" />
              <span className="text-white">Submit Review</span>
            </>
          )}
        </button>
        {workerRating === 0 && (
          <p className="text-gray-500 text-xs text-center mt-2">Please rate the worker to continue</p>
        )}
      </div>
    </div>
  );
}
