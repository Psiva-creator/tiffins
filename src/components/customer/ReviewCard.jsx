import { motion } from 'framer-motion'
import { Star, ThumbsUp, MoreHorizontal, CheckCircle2 } from 'lucide-react'

const ReviewCard = ({ review, index = 0 }) => {
  if (!review) return null

  // Format Date
  const dateObj = new Date(review.date)
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-3xl border border-border p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 text-primary font-bold font-poppins shadow-sm">
            {review.avatar}
          </div>
          <div>
            <h4 className="font-bold text-dark text-sm flex items-center gap-1.5">
              {review.author}
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            </h4>
            <span className="text-[11px] font-medium text-muted block mt-0.5">Verified Customer</span>
          </div>
        </div>
        <button className="p-1.5 text-muted hover:text-dark hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1 text-[#F4D03F]">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} 
            />
          ))}
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <span className="text-xs font-semibold text-gray-500">
          {formattedDate}
        </span>
      </div>

      <div className="flex-1 mb-5">
        <h3 className="font-bold text-gray-900 mb-2 font-poppins text-base">{review.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          "{review.content}"
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted font-medium">Was this review helpful?</span>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 rounded-xl transition-all active:scale-95">
          <ThumbsUp className="w-3.5 h-3.5" />
          Helpful ({review.helpful})
        </button>
      </div>
    </motion.div>
  )
}

export default ReviewCard
