import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ThumbsUp, 
  PenTool, 
  X,
  Send
} from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export const ReviewsSection = ({
  reviews,
  onAddReview,
  soundEnabled
}) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  const [ambianceSetting, setAmbianceSetting] = useState('Dining Chandelier');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedReviews, setLikedReviews] = useState({});

  const handleLike = (id) => {
    setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!author || !comment || !title) return;

    setIsSubmitting(true);
    const newRev = {
      productId: 'general',
      author,
      rating,
      title,
      comment,
      location: location || 'Verified Buyer',
      ambianceSetting,
      verifiedPurchase: true
    };

    await onAddReview(newRev);
    setIsSubmitting(false);
    setIsWriteModalOpen(false);
    setAuthor('');
    setTitle('');
    setComment('');
    setLocation('');
    if (soundEnabled) playSwitchSound(true);
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-vintage-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Write Review Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patron Testimonials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vintage-100">
              The Ambient Living Experience
            </h2>
            <p className="text-vintage-300 text-sm sm:text-base max-w-xl">
              From historic Brooklyn brownstones to Michelin-starred dining rooms.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-vintage-850 hover:bg-vintage-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 hover:border-amber-500/80 text-xs sm:text-sm font-semibold flex items-center gap-2 self-start md:self-auto transition-all shadow-sm"
          >
            <PenTool className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => {
            const rId = String(rev?._id || rev?.id || `rev_${idx}`);
            const isLiked = !!likedReviews[rId];
            return (
              <motion.div
                key={rId}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-vintage-900/80 border border-vintage-700/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Verified Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-base text-vintage-100">
                    "{rev.title}"
                  </h3>

                  <p className="text-xs text-vintage-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-vintage-800/80 flex items-center justify-between text-xs text-vintage-400">
                  <div>
                    <div className="font-semibold text-vintage-200">{rev.author}</div>
                    <div className="text-[11px] text-vintage-500">{rev.location} {rev.ambianceSetting ? `• ${rev.ambianceSetting}` : ''}</div>
                  </div>

                  <button
                    onClick={() => handleLike(rId)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg transition-colors ${
                      isLiked ? 'text-amber-400 bg-amber-500/10' : 'text-vintage-500 hover:text-vintage-300'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-mono text-[11px]">{(rev.likes || 0) + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Write Review Modal */}
        <AnimatePresence>
          {isWriteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWriteModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-vintage-950 border border-vintage-700 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-vintage-100">
                      Share Your Experience
                    </h3>
                    <p className="text-xs text-vintage-400">
                      Help fellow collectors and designers find their perfect vintage ambiance.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWriteModalOpen(false)}
                    className="p-2 rounded-full bg-vintage-900 text-vintage-400 hover:text-vintage-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                  {/* Star Rating Picker */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-vintage-300">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1"
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-vintage-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Location */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-vintage-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Julian Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-vintage-900 border border-vintage-700 text-vintage-100 placeholder-vintage-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-vintage-300">City / Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Brooklyn, NY"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-vintage-900 border border-vintage-700 text-vintage-100 placeholder-vintage-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="font-semibold text-vintage-300">Review Headline *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The warmest, most enchanting glow in our townhouse"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-vintage-900 border border-vintage-700 text-vintage-100 placeholder-vintage-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Ambiance Setting */}
                  <div className="space-y-1">
                    <label className="font-semibold text-vintage-300">Room / Fixture Setting</label>
                    <select
                      value={ambianceSetting}
                      onChange={(e) => setAmbianceSetting(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-vintage-900 border border-vintage-700 text-vintage-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Dining Room Chandelier">Dining Room Chandelier</option>
                      <option value="Cafe / Bar Lighting">Cafe / Bar Lighting</option>
                      <option value="Study & Reading Desk">Study &amp; Reading Desk</option>
                      <option value="Outdoor Patio / Pergola">Outdoor Patio / Pergola</option>
                      <option value="Bedside Sconce">Bedside Sconce</option>
                    </select>
                  </div>

                  {/* Detailed Comments */}
                  <div className="space-y-1">
                    <label className="font-semibold text-vintage-300">Detailed Feedback *</label>
                    <textarea
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe the light quality, dimming smoothness, color warmth..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-vintage-900 border border-vintage-700 text-vintage-100 placeholder-vintage-600 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-vintage-950 font-bold text-xs uppercase tracking-wider shadow-glow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Publishing...' : 'Publish Testimonial'}</span>
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ReviewsSection;
