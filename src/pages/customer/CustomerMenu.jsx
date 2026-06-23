import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Sparkles, Star, ChevronRight, Flame, X } from 'lucide-react'
import FoodCard from '../../components/customer/FoodCard'

// ═══════════════════════════════════════════════
// MENU DATA — Sri Sai Darshini
// ═══════════════════════════════════════════════

const menuItems = [
  // ─── Tiffins ──────────────────
  { name: 'Idly (2 Pcs)', price: 50, category: 'Tiffins', rating: 4.5, isVeg: true },
  { name: 'Idly (3 Pcs)', price: 60, category: 'Tiffins', rating: 4.5, isVeg: true },
  { name: 'Sambar Idly', price: 60, category: 'Tiffins', rating: 4.6, isVeg: true },
  { name: 'Ghee Idly', price: 75, category: 'Tiffins', rating: 4.7, isVeg: true },
  { name: 'Wada (2 Pcs)', price: 70, category: 'Tiffins', rating: 4.4, isVeg: true },
  { name: 'Sambar Wada (2 Pcs)', price: 80, category: 'Tiffins', rating: 4.6, isVeg: true },
  { name: 'Dahi Wada (2 Pcs)', price: 85, category: 'Tiffins', rating: 4.5, isVeg: true },
  { name: 'Mysore Bajji', price: 60, category: 'Tiffins', rating: 4.3, isVeg: true },
  { name: 'Onion Bonda', price: 60, category: 'Tiffins', rating: 4.4, isVeg: true },
  { name: 'Upma', price: 55, category: 'Tiffins', rating: 4.2, isVeg: true },
  { name: 'Tomato Bath', price: 60, category: 'Tiffins', rating: 4.3, isVeg: true },
  { name: 'Poori', price: 70, category: 'Tiffins', rating: 4.5, isVeg: true },
  { name: 'Chapathi', price: 70, category: 'Tiffins', rating: 4.4, isVeg: true },
  { name: 'Parota', price: 70, category: 'Tiffins', rating: 4.5, isVeg: true },
  { name: 'Rice Pongal', price: 80, category: 'Tiffins', rating: 4.6, isVeg: true },

  // ─── Dosas ──────────────────
  { name: 'Plain Dosa', price: 60, category: 'Dosas', rating: 4.4, isVeg: true },
  { name: 'Onion Dosa', price: 70, category: 'Dosas', rating: 4.5, isVeg: true },
  { name: 'Masala Dosa', price: 70, category: 'Dosas', rating: 4.8, isVeg: true },
  { name: 'Upma Dosa', price: 75, category: 'Dosas', rating: 4.5, isVeg: true },
  { name: 'Plain Pesarattu', price: 65, category: 'Dosas', rating: 4.3, isVeg: true },
  { name: 'Onion Pesarattu', price: 75, category: 'Dosas', rating: 4.5, isVeg: true },
  { name: 'Masala Pesarattu', price: 75, category: 'Dosas', rating: 4.6, isVeg: true },
  { name: 'Plain Ragi Dosa', price: 60, category: 'Dosas', rating: 4.3, isVeg: true },
  { name: 'Onion Ragi Dosa', price: 75, category: 'Dosas', rating: 4.4, isVeg: true },
  { name: 'Masala Ragi Dosa', price: 75, category: 'Dosas', rating: 4.5, isVeg: true },
  { name: 'Plain Rava Dosa', price: 75, category: 'Dosas', rating: 4.4, isVeg: true },
  { name: 'Onion Rava Dosa', price: 85, category: 'Dosas', rating: 4.6, isVeg: true },
  { name: 'Onion Uttappa', price: 80, category: 'Dosas', rating: 4.5, isVeg: true },
  { name: 'Set Dosa', price: 80, category: 'Dosas', rating: 4.4, isVeg: true },

  // ─── Special Dosas ──────────────────
  { name: 'Paneer Dosa', price: 95, category: 'Special Dosas', rating: 4.8, isVeg: true },
  { name: 'Ghee Plain Dosa', price: 80, category: 'Special Dosas', rating: 4.6, isVeg: true },
  { name: 'Ghee Masala Dosa', price: 95, category: 'Special Dosas', rating: 4.8, isVeg: true },
  { name: 'Ghee Onion Dosa', price: 95, category: 'Special Dosas', rating: 4.7, isVeg: true },
  { name: 'Ghee Karam Dosa', price: 95, category: 'Special Dosas', rating: 4.6, isVeg: true },
  { name: 'Butter Onion Dosa', price: 90, category: 'Special Dosas', rating: 4.7, isVeg: true },
  { name: 'Butter Masala Dosa', price: 90, category: 'Special Dosas', rating: 4.8, isVeg: true },
  { name: '70MM Dosa', price: 100, category: 'Special Dosas', rating: 4.9, isVeg: true },

  // ─── Rice Items ──────────────────
  { name: 'Tomato Rice', price: 80, category: 'Rice Items', rating: 4.4, isVeg: true },
  { name: 'Gongura Rice', price: 80, category: 'Rice Items', rating: 4.5, isVeg: true },
  { name: 'Lemon Rice', price: 80, category: 'Rice Items', rating: 4.4, isVeg: true },
  { name: 'Sambar Rice', price: 80, category: 'Rice Items', rating: 4.3, isVeg: true },
  { name: 'Curd Rice', price: 80, category: 'Rice Items', rating: 4.5, isVeg: true },
  { name: 'Veg Biryani', price: 95, category: 'Rice Items', rating: 4.7, isVeg: true },
  { name: 'Veg Fried Rice', price: 120, category: 'Rice Items', rating: 4.5, isVeg: true },
  { name: 'Jeera Fried Rice', price: 120, category: 'Rice Items', rating: 4.4, isVeg: true },
  { name: 'Veg Manchurian Fried Rice', price: 130, category: 'Rice Items', rating: 4.6, isVeg: true },
  { name: 'Gobi Manchurian Fried Rice', price: 130, category: 'Rice Items', rating: 4.6, isVeg: true },
  { name: 'Schezwan Fried Rice', price: 130, category: 'Rice Items', rating: 4.5, isVeg: true },
  { name: 'Paneer Fried Rice', price: 160, category: 'Rice Items', rating: 4.7, isVeg: true },
  { name: 'Mushroom Fried Rice', price: 160, category: 'Rice Items', rating: 4.6, isVeg: true },

  // ─── Noodles ──────────────────
  { name: 'Veg Noodles', price: 110, category: 'Noodles', rating: 4.4, isVeg: true },
  { name: 'Schezwan Noodles', price: 120, category: 'Noodles', rating: 4.5, isVeg: true },
  { name: 'Veg Manchurian Noodles', price: 120, category: 'Noodles', rating: 4.5, isVeg: true },
  { name: 'Gobi Manchurian Noodles', price: 120, category: 'Noodles', rating: 4.5, isVeg: true },
  { name: 'Paneer Noodles', price: 160, category: 'Noodles', rating: 4.6, isVeg: true },
  { name: 'Mushroom Noodles', price: 150, category: 'Noodles', rating: 4.6, isVeg: true },

  // ─── Starters ──────────────────
  { name: 'Veg Manchuria', price: 130, category: 'Starters', rating: 4.5, isVeg: true },
  { name: 'Gobi Manchuria', price: 130, category: 'Starters', rating: 4.7, isVeg: true },
  { name: 'Mushroom Manchuria', price: 150, category: 'Starters', rating: 4.6, isVeg: true },
  { name: 'Babycorn Manchuria', price: 150, category: 'Starters', rating: 4.5, isVeg: true },
  { name: 'Gobi 65', price: 130, category: 'Starters', rating: 4.6, isVeg: true },
  { name: 'Mushroom 65', price: 150, category: 'Starters', rating: 4.6, isVeg: true },
  { name: 'Paneer 65', price: 170, category: 'Starters', rating: 4.7, isVeg: true },
  { name: 'Paneer Chilli', price: 170, category: 'Starters', rating: 4.7, isVeg: true },
  { name: 'Mushroom Chilli', price: 150, category: 'Starters', rating: 4.5, isVeg: true },
  { name: 'Crispy Babycorn', price: 140, category: 'Starters', rating: 4.5, isVeg: true },

  // ─── Tea & Beverages ──────────────────
  { name: 'Single Tea', price: 15, category: 'Tea & Beverages', rating: 4.3, isVeg: true },
  { name: 'Full Tea', price: 25, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { name: 'Allam Tea', price: 20, category: 'Tea & Beverages', rating: 4.5, isVeg: true },
  { name: 'Bru Coffee Single', price: 20, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { name: 'Bru Coffee Full', price: 30, category: 'Tea & Beverages', rating: 4.7, isVeg: true },
  { name: 'Lemon Tea', price: 25, category: 'Tea & Beverages', rating: 4.3, isVeg: true },
  { name: 'Green Tea', price: 25, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { name: 'Badam Tea', price: 20, category: 'Tea & Beverages', rating: 4.3, isVeg: true },
  { name: 'Boost', price: 30, category: 'Tea & Beverages', rating: 4.5, isVeg: true },
  { name: 'Horlicks', price: 30, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { name: 'Milk', price: 25, category: 'Tea & Beverages', rating: 4.3, isVeg: true },

  // ─── Snacks ──────────────────
  { name: 'Mirchi Bajji', price: 50, category: 'Snacks', rating: 4.5, isVeg: true },
  { name: 'Punugu', price: 50, category: 'Snacks', rating: 4.4, isVeg: true },
  { name: 'Masala Vada', price: 50, category: 'Snacks', rating: 4.5, isVeg: true },
  { name: 'Onion Pakoda', price: 50, category: 'Snacks', rating: 4.4, isVeg: true },
  { name: 'Aloo Samosa', price: 15, category: 'Snacks', rating: 4.6, isVeg: true },
  { name: 'Mirchi (2 Pcs)', price: 30, category: 'Snacks', rating: 4.3, isVeg: true },
  { name: 'Single Punugu', price: 30, category: 'Snacks', rating: 4.3, isVeg: true },
]

const categories = [
  'All',
  'Tiffins',
  'Dosas',
  'Special Dosas',
  'Rice Items',
  'Noodles',
  'Starters',
  'Tea & Beverages',
  'Snacks',
]

const categoryEmojis = {
  All: '🍽️',
  Tiffins: '🍛',
  Dosas: '🥞',
  'Special Dosas': '✨',
  'Rice Items': '🍚',
  Noodles: '🍜',
  Starters: '🍿',
  'Tea & Beverages': '☕',
  Snacks: '🌶️',
}

const quickFilters = [
  { label: 'Under ₹50', filter: (item) => item.price <= 50 },
  { label: 'Under ₹100', filter: (item) => item.price <= 100 },
  { label: '₹100+', filter: (item) => item.price >= 100 },
  { label: 'Top Rated', filter: (item) => item.rating >= 4.6 },
]

const featuredNames = ['Masala Dosa', 'Paneer Dosa', 'Veg Biryani', 'Gobi Manchuria', 'Bru Coffee Full']

const getItemImage = (name, category) => {
  const lowerName = name.toLowerCase()
  
  if (lowerName.includes('idly') || lowerName.includes('idli')) {
    return '/images/menu/idli.png'
  }
  if (lowerName.includes('wada') || lowerName.includes('vada')) {
    return '/images/menu/vada.png'
  }
  if (lowerName.includes('pesarattu')) {
    return '/images/menu/pesarattu.png'
  }
  if (lowerName.includes('masala dosa')) {
    return '/images/menu/masala_dosa.png'
  }
  if (lowerName.includes('ghee')) {
    return '/images/menu/ghee_dosa.png'
  }
  if (lowerName.includes('dosa') || lowerName.includes('uttappa') || lowerName.includes('uttapam')) {
    return '/images/menu/masala_dosa.png'
  }
  if (lowerName.includes('upma')) {
    return '/images/menu/upma.png'
  }
  if (lowerName.includes('poori') || lowerName.includes('puri') || lowerName.includes('chapathi') || lowerName.includes('parota')) {
    return '/images/menu/puri.png'
  }
  if (lowerName.includes('biryani') || lowerName.includes('pongal')) {
    return '/images/menu/veg_biryani.png'
  }
  if (lowerName.includes('fried rice') || lowerName.includes('rice')) {
    return '/images/menu/fried_rice.png'
  }
  if (lowerName.includes('noodles')) {
    return '/images/menu/veg_noodles.png'
  }
  if (lowerName.includes('manchuria') || lowerName.includes('chilli') || lowerName.includes('chili')) {
    return '/images/menu/gobi_manchurian.png'
  }
  if (lowerName.includes('65')) {
    return '/images/menu/paneer_65.png'
  }
  if (lowerName.includes('coffee')) {
    return '/images/menu/filter_coffee.png'
  }
  if (lowerName.includes('tea') || lowerName.includes('chai')) {
    return '/images/menu/masala_tea.png'
  }
  
  // Category fallbacks
  if (category === 'Tea & Beverages') {
    return '/images/menu/filter_coffee.png'
  }
  if (category === 'Snacks') {
    return '/images/menu/samosa.png'
  }
  if (category === 'Starters') {
    return '/images/menu/paneer_65.png'
  }
  if (category === 'Rice Items') {
    return '/images/menu/fried_rice.png'
  }
  if (category === 'Noodles') {
    return '/images/menu/veg_noodles.png'
  }
  if (category === 'Dosas' || category === 'Special Dosas') {
    return '/images/menu/masala_dosa.png'
  }
  if (category === 'Tiffins') {
    return '/images/menu/idli.png'
  }
  
  return null
}

const CustomerMenu = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [activeQuickFilter, setActiveQuickFilter] = useState(null)

  // Featured items
  const featuredItems = useMemo(
    () => menuItems.filter((item) => featuredNames.includes(item.name)),
    []
  )

  // Filtered & sorted items
  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesQuickFilter = activeQuickFilter === null || quickFilters[activeQuickFilter].filter(item)
      return matchesCategory && matchesSearch && matchesQuickFilter
    })

    items.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return a.name.localeCompare(b.name)
    })

    return items
  }, [activeCategory, searchQuery, sortBy, activeQuickFilter])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length }
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = menuItems.filter((i) => i.category === cat).length
      }
    })
    return counts
  }, [])

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-gray-900 flex items-center gap-2">
            Our Menu
            <span
              className="text-sm font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #C5972C)', color: '#fff' }}
            >
              {menuItems.length} items
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Authentic South Indian delicacies & more — <span className="font-medium" style={{ color: '#8B0000' }}>100% Vegetarian</span>
          </p>
        </div>
      </motion.div>

      {/* ─── Featured Items ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #C5972C)' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base font-bold font-[family-name:var(--font-poppins)] text-gray-900">
            Chef's Picks
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent ml-2" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="bg-white rounded-xl p-3 flex items-center gap-3 border border-amber-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
              style={{ boxShadow: '0 1px 4px rgba(212, 175, 55, 0.12)' }}
            >
              <div
                className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform bg-gray-50 border border-amber-50"
              >
                {getItemImage(item.name, item.category) ? (
                  <img
                    src={getItemImage(item.name, item.category)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="select-none">
                    {categoryEmojis[item.category] || '🍽️'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-gray-500 font-medium">{item.rating}</span>
                  <span className="text-[10px] text-gray-300 mx-0.5">•</span>
                  <span className="text-[10px] font-bold" style={{ color: '#8B0000' }}>₹{item.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Search + Sort ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for dosas, tiffins, starters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm transition-all duration-300 focus:outline-none"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 0, 0, 0.1)'
              e.currentTarget.style.borderColor = '#8B0000'
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-9 pr-8 py-3 rounded-xl border border-gray-200 bg-white text-sm appearance-none cursor-pointer focus:outline-none transition-all"
            style={{ minWidth: '170px' }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8B0000'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 0, 0, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </motion.div>

      {/* ─── Category Tabs ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setActiveQuickFilter(null) }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-250 border shrink-0"
            style={
              activeCategory === cat
                ? {
                    background: 'linear-gradient(135deg, #8B0000, #B22222)',
                    color: '#fff',
                    borderColor: 'transparent',
                    boxShadow: '0 4px 12px rgba(139, 0, 0, 0.3)',
                  }
                : {
                    backgroundColor: '#fff',
                    color: '#6b7280',
                    borderColor: '#e5e7eb',
                  }
            }
          >
            <span className="text-sm">{categoryEmojis[cat]}</span>
            <span>{cat}</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
              style={
                activeCategory === cat
                  ? { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }
                  : { backgroundColor: '#f3f4f6', color: '#9ca3af' }
              }
            >
              {categoryCounts[cat]}
            </span>
          </button>
        ))}
      </motion.div>

      {/* ─── Quick Filter Chips ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center gap-2 flex-wrap"
      >
        <Flame className="w-4 h-4 text-gray-400 shrink-0" />
        <span className="text-xs text-gray-400 font-medium mr-1">Quick:</span>
        {quickFilters.map((qf, i) => (
          <button
            key={qf.label}
            onClick={() => setActiveQuickFilter(activeQuickFilter === i ? null : i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200"
            style={
              activeQuickFilter === i
                ? { borderColor: '#D4AF37', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#B8960C' }
                : { borderColor: '#e5e7eb', backgroundColor: '#fff', color: '#6b7280' }
            }
          >
            {qf.label}
          </button>
        ))}
        {activeQuickFilter !== null && (
          <button
            onClick={() => setActiveQuickFilter(null)}
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors ml-1 flex items-center gap-0.5"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </motion.div>

      {/* ─── Results Info ──────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> items
          {activeCategory !== 'All' && (
            <span>
              {' '}in <span className="font-semibold" style={{ color: '#8B0000' }}>{activeCategory}</span>
            </span>
          )}
          {activeQuickFilter !== null && (
            <span>
              {' '}• <span className="font-semibold" style={{ color: '#D4AF37' }}>{quickFilters[activeQuickFilter].label}</span>
            </span>
          )}
        </p>
      </div>

      {/* ─── Menu Grid ──────────────────── */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredItems.map((item, i) => (
            <FoodCard
              key={`${item.name}-${item.category}`}
              {...item}
              image={getItemImage(item.name, item.category)}
              index={i}
              isFeatured={featuredNames.includes(item.name)}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-4xl border border-gray-100">
            🔍
          </div>
          <p className="text-gray-600 font-semibold text-lg">No dishes found</p>
          <p className="text-sm text-gray-400 mt-1">Try a different search term or category</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('All')
              setActiveQuickFilter(null)
            }}
            className="mt-4 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            style={{ color: '#8B0000', backgroundColor: 'rgba(139, 0, 0, 0.06)' }}
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default CustomerMenu
