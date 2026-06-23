import { motion } from 'framer-motion'
import { ShoppingCart, Star, Plus, Minus, Sparkles } from 'lucide-react'
import { useState } from 'react'

const FoodCard = ({
  name = 'Masala Dosa',
  price = 80,
  category = 'Tiffins',
  rating = 4.5,
  isVeg = true,
  isFeatured = false,
  image = '',
  index = 0,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
}) => {
  const [isHovered, setIsHovered] = useState(false)



  // Category-based emoji & gradient
  const categoryStyles = {
    Tiffins: { emoji: '🍛', gradient: 'linear-gradient(135deg, #fff5f5 0%, #fecaca 100%)' },
    Dosas: { emoji: '🥞', gradient: 'linear-gradient(135deg, #fefce8 0%, #fde68a 100%)' },
    'Special Dosas': { emoji: '✨', gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)' },
    'Rice Items': { emoji: '🍚', gradient: 'linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)' },
    Noodles: { emoji: '🍜', gradient: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)' },
    Starters: { emoji: '🍿', gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' },
    'Tea & Beverages': { emoji: '☕', gradient: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)' },
    Snacks: { emoji: '🌶️', gradient: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)' },
  }

  const style = categoryStyles[category] || categoryStyles.Tiffins

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.5) }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden group relative"
      style={{
        border: isFeatured ? '2px solid #D4AF37' : '1px solid #f3f4f6',
        boxShadow: isHovered
          ? '0 20px 40px rgba(139, 0, 0, 0.1), 0 4px 12px rgba(0,0,0,0.05)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div
          className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #C5972C)' }}
        >
          <Sparkles className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Image Area */}
      <div
        className="h-36 relative overflow-hidden flex items-center justify-center bg-gray-50"
        style={{ background: style.gradient }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <span className="text-4xl select-none group-hover:scale-125 transition-transform duration-500">
            {style.emoji}
          </span>
        )}

        {/* Veg Badge */}
        <div className="absolute top-3 left-3">
          <div
            className="w-5 h-5 rounded border-2 flex items-center justify-center bg-white/80 backdrop-blur-sm"
            style={{ borderColor: isVeg ? '#16a34a' : '#dc2626' }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: isVeg ? '#16a34a' : '#dc2626' }}
            />
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-0 right-0">
          <div
            className="px-4 py-1.5 rounded-tl-xl text-white font-bold text-sm shadow-md"
            style={{ background: 'linear-gradient(135deg, #8B0000, #B22222)' }}
          >
            ₹{price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: '#8B0000', backgroundColor: 'rgba(139, 0, 0, 0.06)' }}
          >
            {category}
          </span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                style={{
                  fill: i < Math.floor(rating) ? '#D4AF37' : 'transparent',
                  color: i < Math.floor(rating) ? '#D4AF37' : '#d1d5db',
                }}
              />
            ))}
            <span className="text-[10px] font-semibold text-gray-500 ml-0.5">{rating}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold font-[family-name:var(--font-poppins)] text-gray-900 text-[14px] leading-snug mb-3">
          {name}
        </h3>

        {/* Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold font-[family-name:var(--font-poppins)]" style={{ color: '#8B0000' }}>
            ₹{price}
          </span>

          {quantity === 0 ? (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={onAdd}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold transition-all duration-300 hover:shadow-lg active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #B22222 100%)',
                boxShadow: '0 2px 8px rgba(139, 0, 0, 0.25)',
              }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </motion.button>
          ) : (
            <div
              className="flex items-center gap-0 rounded-xl overflow-hidden"
              style={{ border: '2px solid #8B0000' }}
            >
              <button onClick={onDecrement} className="p-1.5 hover:bg-red-50 transition-colors">
                <Minus className="w-3.5 h-3.5" style={{ color: '#8B0000' }} />
              </button>
              <span className="px-2.5 text-xs font-bold text-gray-900 min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={onIncrement}
                className="p-1.5 text-white transition-colors"
                style={{ backgroundColor: '#8B0000' }}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FoodCard
