import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp, MessageSquare, Filter, Edit3, Award } from 'lucide-react'
import ReviewCard from '../../components/customer/ReviewCard'

const MOCK_REVIEWS = [
  {
    id: 1,
    author: "Rohini",
    date: "2026-06-20",
    rating: 5,
    title: "Absolutely Exquisite Dining Experience",
    content: "The flavors were perfectly balanced, reminding me of authentic home-cooked meals but with a premium restaurant touch. The Paneer Butter Masala was rich and creamy. Highly recommend this place for anyone craving top-notch Indian cuisine.",
    helpful: 24,
    avatar: "RO"
  },
  {
    id: 2,
    author: "Rishi",
    date: "2026-06-18",
    rating: 4,
    title: "Great food, beautiful presentation",
    content: "Loved the presentation of the Veg Thali. Everything was fresh and served at the perfect temperature. The only reason I'm giving 4 stars is that the delivery took slightly longer than expected, but the food made up for it.",
    helpful: 12,
    avatar: "RI"
  },
  {
    id: 3,
    author: "Siva",
    date: "2026-06-15",
    rating: 5,
    title: "Best South Indian in town!",
    content: "If you haven't tried their Masala Dosa, you are missing out! Crispy, flavorful, and accompanied by the freshest coconut chutney. The filter coffee was the perfect end to my meal. A solid 5/5.",
    helpful: 45,
    avatar: "SI"
  },
  {
    id: 4,
    author: "Vaibavi",
    date: "2026-06-10",
    rating: 5,
    title: "Consistent Quality Every Time",
    content: "I order from Tiffins Yash almost every week and the quality has never dropped. The portions are generous and the packaging is very secure and premium. It's rare to find such consistency nowadays.",
    helpful: 31,
    avatar: "VA"
  }
]

const Ratings = () => {
  const [filter, setFilter] = useState('All')
  
  const filteredReviews = filter === 'All' 
    ? MOCK_REVIEWS 
    : MOCK_REVIEWS.filter(r => r.rating === parseInt(filter))

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-dark">Customer Reviews</h1>
          <p className="text-sm text-muted mt-1">See what our customers are saying about their experience.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Edit3 className="w-4 h-4" />
          Write a Review
        </button>
      </motion.div>

      {/* Overview Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Main Score */}
        <div className="bg-card p-6 rounded-3xl border border-border flex flex-col justify-center items-center gap-4 shadow-sm h-full">
          <div className="text-center w-full">
            <h2 className="text-6xl font-bold font-poppins text-dark">4.8</h2>
            <div className="flex items-center justify-center gap-1 mt-3 text-[#F4D03F]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-xs text-muted mt-2 font-medium">Based on 1,248 reviews</p>
          </div>
          <div className="w-full space-y-2 pt-4 border-t border-border">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="font-medium text-dark w-2">{star}</span>
                <Star className="w-3 h-3 text-[#F4D03F] fill-current" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#F4D03F] rounded-full" 
                    style={{ width: star === 5 ? '85%' : star === 4 ? '12%' : star === 3 ? '2%' : '0.5%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50/20 p-6 rounded-3xl border border-green-100/50 flex flex-col justify-center h-full">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 shadow-sm shadow-green-200/50">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Top Rated Quality</h3>
            <p className="text-sm text-gray-500 leading-relaxed">98% of customers rated our food quality as excellent or very good.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/20 p-6 rounded-3xl border border-blue-100/50 flex flex-col justify-center h-full">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 shadow-sm shadow-blue-200/50">
              <ThumbsUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Highly Recommended</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Customers frequently praise our quick delivery and warm packaging.</p>
          </div>
        </div>
      </motion.div>

      {/* Filter and Reviews */}
      <div className="space-y-6 pt-4 border-t border-border">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-semibold text-muted flex items-center gap-1.5 whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filter by:
          </span>
          {['All', '5', '4', '3', '2', '1'].map((val) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                filter === val 
                  ? 'bg-dark text-white shadow-md' 
                  : 'bg-white border border-border text-dark hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {val !== 'All' && <Star className={`w-3.5 h-3.5 ${filter === val ? 'text-[#F4D03F] fill-current' : 'text-muted'}`} />}
              {val === 'All' ? 'All Reviews' : `${val} Stars`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, idx) => (
              <ReviewCard key={review.id} review={review} index={idx} />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredReviews.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center bg-card rounded-3xl border border-border border-dashed flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-dark">No reviews found</h3>
            <p className="text-sm text-muted mt-1 max-w-sm">There are no reviews matching your selected rating. Try changing your filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Ratings
