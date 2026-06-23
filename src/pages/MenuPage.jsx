import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Search, Star, Leaf, X, Sparkles, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// ═══════════════════════════════════════════════
// MENU DATA — Sri Sai Darshini (same as CustomerMenu)
// ═══════════════════════════════════════════════

const menuItems = [
  // ─── Tiffins ──────────────────
  { name: 'Idly (2 Pcs)', price: 50, category: 'Tiffins', rating: 4.5 },
  { name: 'Idly (3 Pcs)', price: 60, category: 'Tiffins', rating: 4.5 },
  { name: 'Sambar Idly', price: 60, category: 'Tiffins', rating: 4.6 },
  { name: 'Ghee Idly', price: 75, category: 'Tiffins', rating: 4.7 },
  { name: 'Wada (2 Pcs)', price: 70, category: 'Tiffins', rating: 4.4 },
  { name: 'Sambar Wada (2 Pcs)', price: 80, category: 'Tiffins', rating: 4.6 },
  { name: 'Dahi Wada (2 Pcs)', price: 85, category: 'Tiffins', rating: 4.5 },
  { name: 'Mysore Bajji', price: 60, category: 'Tiffins', rating: 4.3 },
  { name: 'Onion Bonda', price: 60, category: 'Tiffins', rating: 4.4 },
  { name: 'Upma', price: 55, category: 'Tiffins', rating: 4.2 },
  { name: 'Tomato Bath', price: 60, category: 'Tiffins', rating: 4.3 },
  { name: 'Poori', price: 70, category: 'Tiffins', rating: 4.5 },
  { name: 'Chapathi', price: 70, category: 'Tiffins', rating: 4.4 },
  { name: 'Parota', price: 70, category: 'Tiffins', rating: 4.5 },
  { name: 'Rice Pongal', price: 80, category: 'Tiffins', rating: 4.6 },

  // ─── Dosas ──────────────────
  { name: 'Plain Dosa', price: 60, category: 'Dosas', rating: 4.4 },
  { name: 'Onion Dosa', price: 70, category: 'Dosas', rating: 4.5 },
  { name: 'Masala Dosa', price: 70, category: 'Dosas', rating: 4.8 },
  { name: 'Upma Dosa', price: 75, category: 'Dosas', rating: 4.5 },
  { name: 'Plain Pesarattu', price: 65, category: 'Dosas', rating: 4.3 },
  { name: 'Onion Pesarattu', price: 75, category: 'Dosas', rating: 4.5 },
  { name: 'Masala Pesarattu', price: 75, category: 'Dosas', rating: 4.6 },
  { name: 'Plain Ragi Dosa', price: 60, category: 'Dosas', rating: 4.3 },
  { name: 'Onion Ragi Dosa', price: 75, category: 'Dosas', rating: 4.4 },
  { name: 'Masala Ragi Dosa', price: 75, category: 'Dosas', rating: 4.5 },
  { name: 'Plain Rava Dosa', price: 75, category: 'Dosas', rating: 4.4 },
  { name: 'Onion Rava Dosa', price: 85, category: 'Dosas', rating: 4.6 },
  { name: 'Onion Uttappa', price: 80, category: 'Dosas', rating: 4.5 },
  { name: 'Set Dosa', price: 80, category: 'Dosas', rating: 4.4 },

  // ─── Special Dosas ──────────────────
  { name: 'Paneer Dosa', price: 95, category: 'Special Dosas', rating: 4.8 },
  { name: 'Ghee Plain Dosa', price: 80, category: 'Special Dosas', rating: 4.6 },
  { name: 'Ghee Masala Dosa', price: 95, category: 'Special Dosas', rating: 4.8 },
  { name: 'Ghee Onion Dosa', price: 95, category: 'Special Dosas', rating: 4.7 },
  { name: 'Ghee Karam Dosa', price: 95, category: 'Special Dosas', rating: 4.6 },
  { name: 'Butter Onion Dosa', price: 90, category: 'Special Dosas', rating: 4.7 },
  { name: 'Butter Masala Dosa', price: 90, category: 'Special Dosas', rating: 4.8 },
  { name: '70MM Dosa', price: 100, category: 'Special Dosas', rating: 4.9 },

  // ─── Rice Items ──────────────────
  { name: 'Tomato Rice', price: 80, category: 'Rice Items', rating: 4.4 },
  { name: 'Gongura Rice', price: 80, category: 'Rice Items', rating: 4.5 },
  { name: 'Lemon Rice', price: 80, category: 'Rice Items', rating: 4.4 },
  { name: 'Sambar Rice', price: 80, category: 'Rice Items', rating: 4.3 },
  { name: 'Curd Rice', price: 80, category: 'Rice Items', rating: 4.5 },
  { name: 'Veg Biryani', price: 95, category: 'Rice Items', rating: 4.7 },
  { name: 'Veg Fried Rice', price: 120, category: 'Rice Items', rating: 4.5 },
  { name: 'Jeera Fried Rice', price: 120, category: 'Rice Items', rating: 4.4 },
  { name: 'Veg Manchurian Fried Rice', price: 130, category: 'Rice Items', rating: 4.6 },
  { name: 'Gobi Manchurian Fried Rice', price: 130, category: 'Rice Items', rating: 4.6 },
  { name: 'Schezwan Fried Rice', price: 130, category: 'Rice Items', rating: 4.5 },
  { name: 'Paneer Fried Rice', price: 160, category: 'Rice Items', rating: 4.7 },
  { name: 'Mushroom Fried Rice', price: 160, category: 'Rice Items', rating: 4.6 },

  // ─── Noodles ──────────────────
  { name: 'Veg Noodles', price: 110, category: 'Noodles', rating: 4.4 },
  { name: 'Schezwan Noodles', price: 120, category: 'Noodles', rating: 4.5 },
  { name: 'Veg Manchurian Noodles', price: 120, category: 'Noodles', rating: 4.5 },
  { name: 'Gobi Manchurian Noodles', price: 120, category: 'Noodles', rating: 4.5 },
  { name: 'Paneer Noodles', price: 160, category: 'Noodles', rating: 4.6 },
  { name: 'Mushroom Noodles', price: 150, category: 'Noodles', rating: 4.6 },

  // ─── Starters ──────────────────
  { name: 'Veg Manchuria', price: 130, category: 'Starters', rating: 4.5 },
  { name: 'Gobi Manchuria', price: 130, category: 'Starters', rating: 4.7 },
  { name: 'Mushroom Manchuria', price: 150, category: 'Starters', rating: 4.6 },
  { name: 'Babycorn Manchuria', price: 150, category: 'Starters', rating: 4.5 },
  { name: 'Gobi 65', price: 130, category: 'Starters', rating: 4.6 },
  { name: 'Mushroom 65', price: 150, category: 'Starters', rating: 4.6 },
  { name: 'Paneer 65', price: 170, category: 'Starters', rating: 4.7 },
  { name: 'Paneer Chilli', price: 170, category: 'Starters', rating: 4.7 },
  { name: 'Mushroom Chilli', price: 150, category: 'Starters', rating: 4.5 },
  { name: 'Crispy Babycorn', price: 140, category: 'Starters', rating: 4.5 },

  // ─── Tea & Beverages ──────────────────
  { name: 'Single Tea', price: 15, category: 'Tea & Beverages', rating: 4.3 },
  { name: 'Full Tea', price: 25, category: 'Tea & Beverages', rating: 4.4 },
  { name: 'Allam Tea', price: 20, category: 'Tea & Beverages', rating: 4.5 },
  { name: 'Bru Coffee Single', price: 20, category: 'Tea & Beverages', rating: 4.4 },
  { name: 'Bru Coffee Full', price: 30, category: 'Tea & Beverages', rating: 4.7 },
  { name: 'Lemon Tea', price: 25, category: 'Tea & Beverages', rating: 4.3 },
  { name: 'Green Tea', price: 25, category: 'Tea & Beverages', rating: 4.4 },
  { name: 'Badam Tea', price: 20, category: 'Tea & Beverages', rating: 4.3 },
  { name: 'Boost', price: 30, category: 'Tea & Beverages', rating: 4.5 },
  { name: 'Horlicks', price: 30, category: 'Tea & Beverages', rating: 4.4 },
  { name: 'Milk', price: 25, category: 'Tea & Beverages', rating: 4.3 },

  // ─── Snacks ──────────────────
  { name: 'Mirchi Bajji', price: 50, category: 'Snacks', rating: 4.5 },
  { name: 'Punugu', price: 50, category: 'Snacks', rating: 4.4 },
  { name: 'Masala Vada', price: 50, category: 'Snacks', rating: 4.5 },
  { name: 'Onion Pakoda', price: 50, category: 'Snacks', rating: 4.4 },
  { name: 'Aloo Samosa', price: 15, category: 'Snacks', rating: 4.6 },
  { name: 'Mirchi (2 Pcs)', price: 30, category: 'Snacks', rating: 4.3 },
  { name: 'Single Punugu', price: 30, category: 'Snacks', rating: 4.3 },
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

const getItemImage = (name, category) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('idly') || lowerName.includes('idli')) return '/images/menu/idli.png'
  if (lowerName.includes('wada') || lowerName.includes('vada')) return '/images/menu/vada.png'
  if (lowerName.includes('pesarattu')) return '/images/menu/pesarattu.png'
  if (lowerName.includes('masala dosa')) return '/images/menu/masala_dosa.png'
  if (lowerName.includes('ghee')) return '/images/menu/ghee_dosa.png'
  if (lowerName.includes('dosa') || lowerName.includes('uttappa')) return '/images/menu/masala_dosa.png'
  if (lowerName.includes('upma')) return '/images/menu/upma.png'
  if (lowerName.includes('poori') || lowerName.includes('puri') || lowerName.includes('chapathi') || lowerName.includes('parota')) return '/images/menu/puri.png'
  if (lowerName.includes('biryani') || lowerName.includes('pongal')) return '/images/menu/veg_biryani.png'
  if (lowerName.includes('fried rice') || lowerName.includes('rice')) return '/images/menu/fried_rice.png'
  if (lowerName.includes('noodles')) return '/images/menu/veg_noodles.png'
  if (lowerName.includes('manchuria') || lowerName.includes('chilli') || lowerName.includes('chili')) return '/images/menu/gobi_manchurian.png'
  if (lowerName.includes('65')) return '/images/menu/paneer_65.png'
  if (lowerName.includes('coffee')) return '/images/menu/filter_coffee.png'
  if (lowerName.includes('tea') || lowerName.includes('chai')) return '/images/menu/masala_tea.png'
  if (category === 'Tea & Beverages') return '/images/menu/filter_coffee.png'
  if (category === 'Snacks') return '/images/menu/samosa.png'
  if (category === 'Starters') return '/images/menu/paneer_65.png'
  if (category === 'Rice Items') return '/images/menu/fried_rice.png'
  if (category === 'Noodles') return '/images/menu/veg_noodles.png'
  if (category === 'Dosas' || category === 'Special Dosas') return '/images/menu/masala_dosa.png'
  if (category === 'Tiffins') return '/images/menu/idli.png'
  return null
}

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length }
    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = menuItems.filter((i) => i.category === cat).length
      }
    })
    return counts
  }, [])

  // Group items by category for display
  const groupedItems = useMemo(() => {
    if (activeCategory !== 'All') {
      return [{ category: activeCategory, items: filteredItems }]
    }
    const groups = []
    categories.slice(1).forEach((cat) => {
      const items = filteredItems.filter((i) => i.category === cat)
      if (items.length > 0) {
        groups.push({ category: cat, items })
      }
    })
    return groups
  }, [activeCategory, filteredItems])

  return (
    <div>
      {/* ─── Hero Banner ──────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FEE2E2 50%, #FEF9E7 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #D94841 1px, transparent 1px), radial-gradient(circle at 80% 50%, #D94841 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              <span>100% Pure Vegetarian</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-dark leading-tight mb-4">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Explore {menuItems.length}+ authentic South Indian dishes — tiffins, dosas, meals, starters & more, freshly prepared every day.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search for dosas, idli, biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-border bg-card text-dark text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <X className="w-4 h-4 text-muted" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Category Tabs ──────────────────── */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0"
                style={
                  activeCategory === cat
                    ? {
                        background: 'linear-gradient(135deg, #D94841, #C13D36)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(217, 72, 65, 0.3)',
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: '#6B7280',
                      }
                }
              >
                <span>{categoryEmojis[cat]}</span>
                <span>{cat}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={
                    activeCategory === cat
                      ? { backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff' }
                      : { backgroundColor: '#f3f4f6', color: '#9ca3af' }
                  }
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Menu Items ──────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 text-4xl">🔍</div>
              <p className="text-dark font-semibold text-lg">No dishes found</p>
              <p className="text-sm text-muted mt-1">Try a different search term or category</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
                className="mt-4 text-sm font-semibold px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {groupedItems.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: gi * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                      {categoryEmojis[group.category]}
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark">
                        {group.category}
                      </h2>
                      <p className="text-xs text-muted">{group.items.length} items</p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((item, i) => {
                      const imgSrc = getItemImage(item.name, item.category)
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                          className="group flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          {/* Food Image */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-section-alt shrink-0 group-hover:scale-105 transition-transform duration-300">
                            {imgSrc ? (
                              <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">
                                {categoryEmojis[item.category] || '🍽️'}
                              </div>
                            )}
                          </div>

                          {/* Item Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-3.5 h-3.5 rounded-sm border-2 border-green flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green" />
                                  </div>
                                  <h3 className="text-sm font-semibold text-dark truncate">{item.name}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-0.5">
                                    <Star className="w-3 h-3 fill-accent text-accent" />
                                    <span className="text-xs text-muted font-medium">{item.rating}</span>
                                  </div>
                                  <span className="text-xs text-border">•</span>
                                  <span className="text-xs text-muted">{item.category}</span>
                                </div>
                              </div>
                              <span className="text-base font-bold text-primary whitespace-nowrap">₹{item.price}</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Order CTA ──────────────────── */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-white mb-4">
              Hungry Already?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Log in to place your order directly. Scan the QR code at our restaurant or order online!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors"
              >
                <span>Order Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white hover:border-white/40 font-semibold rounded-xl transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MenuPage
