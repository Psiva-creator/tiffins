import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Images, X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react'

// Gallery items using existing menu images + generated images
const galleryItems = [
  {
    id: 1,
    src: '/images/menu/masala_dosa.png',
    title: 'Masala Dosa',
    category: 'Signature Dishes',
    description: 'Our crispy golden masala dosa served with sambar and chutneys',
  },
  {
    id: 2,
    src: '/images/menu/idli.png',
    title: 'Soft Idli Platter',
    category: 'Tiffins',
    description: 'Fluffy steamed idlis garnished with curry leaves and mustard',
  },
  {
    id: 3,
    src: '/images/menu/veg_biryani.png',
    title: 'Veg Biryani',
    category: 'Rice Specials',
    description: 'Fragrant basmati rice cooked with fresh vegetables and aromatic spices',
  },
  {
    id: 4,
    src: '/images/menu/gobi_manchurian.png',
    title: 'Gobi Manchuria',
    category: 'Starters',
    description: 'Crispy cauliflower tossed in a tangy Indo-Chinese sauce',
  },
  {
    id: 5,
    src: '/images/menu/filter_coffee.png',
    title: 'Filter Coffee',
    category: 'Beverages',
    description: 'Traditional South Indian filter kaapi — frothy and aromatic',
  },
  {
    id: 6,
    src: '/images/menu/ghee_dosa.png',
    title: 'Ghee Dosa',
    category: 'Signature Dishes',
    description: 'Paper-thin dosa drizzled with pure ghee for an irresistible crispness',
  },
  {
    id: 7,
    src: '/images/menu/vada.png',
    title: 'Medu Vada',
    category: 'Tiffins',
    description: 'Crispy and golden urad dal vadas — crunchy outside, soft inside',
  },
  {
    id: 8,
    src: '/images/menu/paneer_65.png',
    title: 'Paneer 65',
    category: 'Starters',
    description: 'Spiced paneer cubes deep-fried to perfection with curry leaves',
  },
  {
    id: 9,
    src: '/images/menu/fried_rice.png',
    title: 'Veg Fried Rice',
    category: 'Rice Specials',
    description: 'Wok-tossed rice with crunchy vegetables and Indo-Chinese flavours',
  },
  {
    id: 10,
    src: '/images/menu/pesarattu.png',
    title: 'Pesarattu',
    category: 'Signature Dishes',
    description: 'Protein-packed green moong dal dosa — an Andhra speciality',
  },
  {
    id: 11,
    src: '/images/menu/upma.png',
    title: 'Upma',
    category: 'Tiffins',
    description: 'Light and flavorful semolina upma with cashews and mustard seeds',
  },
  {
    id: 12,
    src: '/images/menu/veg_noodles.png',
    title: 'Veg Noodles',
    category: 'Indo-Chinese',
    description: 'Stir-fried noodles loaded with fresh vegetables and soy sauce',
  },
  {
    id: 13,
    src: '/images/menu/puri.png',
    title: 'Poori',
    category: 'Tiffins',
    description: 'Fluffy deep-fried whole wheat bread served with aloo curry',
  },
  {
    id: 14,
    src: '/images/menu/samosa.png',
    title: 'Samosa',
    category: 'Snacks',
    description: 'Crispy triangular pastry stuffed with spiced potato filling',
  },
  {
    id: 15,
    src: '/images/menu/masala_tea.png',
    title: 'Masala Chai',
    category: 'Beverages',
    description: 'Aromatic spiced tea brewed with cardamom, ginger and fresh milk',
  },
]

const galleryCategories = ['All', 'Signature Dishes', 'Tiffins', 'Starters', 'Rice Specials', 'Indo-Chinese', 'Beverages', 'Snacks']

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const goNext = () => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  const goPrev = () => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)

  return (
    <div>
      {/* ─── Hero Banner ──────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FEF9E7 0%, #FFF8F0 50%, #FEE2E2 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #F4D03F 1px, transparent 1px), radial-gradient(circle at 70% 60%, #D94841 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-dark text-sm font-medium mb-6">
              <Camera className="w-4 h-4 text-accent" />
              <span>A Visual Feast</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-dark leading-tight mb-4">
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Take a peek at our signature dishes, vibrant flavours, and the love we pour into every plate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Category Filter ──────────────────── */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0"
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
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Grid ──────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(i)}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div className="text-white">
                        <p className="text-sm font-medium text-accent mb-1">{item.category}</p>
                        <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)]">{item.title}</h3>
                        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Info (visible by default) */}
                  <div className="p-4 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{item.category}</span>
                    <h3 className="text-base font-semibold text-dark mt-2 font-[family-name:var(--font-poppins)]">{item.title}</h3>
                    <p className="text-sm text-muted mt-1 line-clamp-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Images className="w-16 h-16 text-muted/30 mb-4" />
              <p className="text-dark font-semibold text-lg">No photos in this category</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-sm font-semibold px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                View All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Lightbox Modal ──────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex]?.src}
                alt={filteredItems[lightboxIndex]?.title}
                className="w-full max-h-[70vh] object-contain rounded-2xl"
              />
              <div className="text-center mt-6">
                <span className="text-sm text-accent font-medium">{filteredItems[lightboxIndex]?.category}</span>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)] mt-1">
                  {filteredItems[lightboxIndex]?.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
                  {filteredItems[lightboxIndex]?.description}
                </p>
                <p className="text-xs text-gray-500 mt-3">{lightboxIndex + 1} / {filteredItems.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryPage
