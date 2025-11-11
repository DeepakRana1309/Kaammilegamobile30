import { ArrowLeft, Star, Send } from 'lucide-react';
import { useState } from 'react';

interface GiveFeedbackPageProps {
  onBack: () => void;
}

export function GiveFeedbackPage({ onBack }: GiveFeedbackPageProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'App Experience',
    'Job Search',
    'Services',
    'Hotels',
    'Customer Support',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setFeedback('');
        setCategory('');
      }, 3000);
    }, 500);
  };

  const isFormValid = rating > 0 && category && feedback.trim();

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-[#1f2937]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#141A2A] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">Give Feedback</h1>
      </div>

      <div className="px-5 py-6">
        {submitted ? (
          <div className="bg-[#141A2A] rounded-xl p-8 border border-[#007BFF] text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <h3 className="text-2xl mb-2">Thank You!</h3>
            <p className="text-gray-400">
              Your feedback helps us improve Kaam Milega for everyone.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="bg-[#141A2A] rounded-xl p-6 border border-[#1f2937] text-center">
              <h2 className="text-lg mb-2">How would you rate your experience?</h2>
              <p className="text-gray-400 text-sm mb-4">Tap to rate</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-[#007BFF] mt-4 animate-in fade-in">
                  {rating === 5 && 'Excellent! ⭐'}
                  {rating === 4 && 'Great! 👍'}
                  {rating === 3 && 'Good 👌'}
                  {rating === 2 && 'Could be better 🤔'}
                  {rating === 1 && 'Sorry to hear that 😔'}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Feedback Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Feedback Text */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Your Feedback *</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think... We'd love to hear your thoughts!"
                rows={6}
                className="w-full bg-[#141A2A] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                required
              />
              <p className="text-xs text-gray-500">{feedback.length}/500 characters</p>
            </div>

            {/* Quick Feedback Options */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Quick Tags (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {['Easy to use', 'Fast', 'Helpful', 'Needs improvement', 'Bug found'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="bg-[#141A2A] text-gray-400 px-3 py-2 rounded-full text-xs border border-[#1f2937] hover:border-[#007BFF] hover:text-[#007BFF] transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white hover:shadow-lg shadow-[#007BFF]/50'
                  : 'bg-[#141A2A] text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
