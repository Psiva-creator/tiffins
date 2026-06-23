import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Heart,
  Leaf,
  Clock,
  Award,
  Users,
  Star,
  MapPin,
  ChefHat,
  UtensilsCrossed,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

const milestones = [
  { year: '2012', title: 'The Beginning', desc: 'Sri Sai Darshini opened its doors in Hyderabad with a small 10-table tiffin centre.' },
  { year: '2015', title: 'Expanding the Menu', desc: 'Introduced Indo-Chinese starters & noodles alongside our signature South Indian tiffins.' },
  { year: '2018', title: '5,000+ Daily Customers', desc: 'Became one of the most visited breakfast spots in the neighbourhood.' },
  { year: '2021', title: 'Digital Ordering', desc: 'Launched QR-based ordering and our own digital platform for dine-in convenience.' },
  { year: '2024', title: '100+ Menu Items', desc: 'Expanded to a full-day menu with tiffins, meals, snacks, and beverages.' },
]

const values = [
  {
    icon: Leaf,
    title: '100% Vegetarian',
    desc: 'Every dish is purely vegetarian, prepared in a kitchen that has never served non-veg.',
    color: '#2E7D32',
    bg: '#E8F5E9',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    desc: 'Traditional recipes passed through generations, cooked with genuine care for every customer.',
    color: '#D94841',
    bg: '#FEE2E2',
  },
  {
    icon: Clock,
    title: 'Fresh Every Day',
    desc: 'No leftovers, no frozen ingredients. Everything is prepared fresh from scratch daily.',
    color: '#F59E0B',
    bg: '#FEF9E7',
  },
  {
    icon: Award,
    title: 'Quality First',
    desc: 'We source the finest ingredients — pure ghee, cold-pressed oils, and organic spices.',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
]

const teamHighlights = [
  { icon: ChefHat, value: '15+', label: 'Expert Chefs' },
  { icon: Users, value: '10K+', label: 'Happy Customers' },
  { icon: UtensilsCrossed, value: '100+', label: 'Menu Items' },
  { icon: Star, value: '12+', label: 'Years of Service' },
]

const testimonials = [
  {
    name: 'Ravi Kumar',
    role: 'Regular Customer',
    quote: 'The best masala dosa in Hyderabad! I\'ve been coming here for 5 years and the quality never drops.',
    rating: 5,
  },
  {
    name: 'Priya Reddy',
    role: 'Food Blogger',
    quote: 'Sri Sai Darshini is a hidden gem. Their filter coffee and ghee idli combo is absolutely divine.',
    rating: 5,
  },
  {
    name: 'Suresh Babu',
    role: 'Family Customer',
    quote: 'Perfect place for family breakfast. Affordable, clean, and the food tastes just like home-cooked meals.',
    rating: 5,
  },
]

const AboutPage = () => {
  return (
    <div>
      {/* ─── Hero Section ──────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FEE2E2 0%, #FFF8F0 50%, #E8F5E9 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #D94841 1px, transparent 1px), radial-gradient(circle at 75% 50%, #2E7D32 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] text-dark leading-tight mb-4">
              About <span className="text-primary">Sri Sai Darshini</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              A journey of passion, tradition, and authentic South Indian flavours — serving Hyderabad since 2012.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Our Story ──────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-sm font-medium text-dark mb-4">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Est. 2012</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-6">
                From a Small Tiffin Centre to Hyderabad's Favourite
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  What started as a humble 10-table tiffin centre in the heart of Hyderabad has grown into one of the city's most-loved breakfast and meals destinations. <strong className="text-dark">Sri Sai Darshini</strong> was born from a simple belief — that great food doesn't need to be expensive.
                </p>
                <p>
                  Founded by a family with deep roots in traditional Telugu and South Indian cooking, every recipe at Sri Sai Darshini carries the warmth of home. From our signature crispy masala dosas to the softest idlis in town, each dish is crafted with <strong className="text-dark">pure ghee, fresh ingredients, and generations of culinary wisdom</strong>.
                </p>
                <p>
                  Today, with 100+ items on our menu, 15+ skilled chefs, and over 10,000 happy customers, we continue our mission — to bring authentic, affordable, and soul-satisfying vegetarian food to every table.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-muted">Hyderabad, Telangana, India</span>
              </div>
            </motion.div>

            {/* Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                  <img src="/images/menu/masala_dosa.png" alt="Masala Dosa" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img src="/images/menu/filter_coffee.png" alt="Filter Coffee" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img src="/images/menu/idli.png" alt="Idli" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-lg">
                  <img src="/images/menu/gobi_manchurian.png" alt="Gobi Manchuria" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ──────────────────── */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #D94841, #C13D36)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamHighlights.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-7 h-7 text-white/80 mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-white">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Values ──────────────────── */}
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-4">
              What We <span className="text-primary">Stand For</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Every plate that leaves our kitchen carries these core values.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: value.bg }}
                >
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-dark mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Journey Timeline ──────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-4">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Key milestones that shaped who we are today.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-green" />

            {milestones.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-10 md:mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────── */}
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-4">
              What Our Customers <span className="text-primary">Say</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Real stories from our regulars who keep coming back for more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-dark text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────── */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-white mb-4">
              Come Visit Us Today
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Experience authentic South Indian hospitality and food that feels like home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors"
              >
                <span>View Our Menu</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white hover:border-white/40 font-semibold rounded-xl transition-colors"
              >
                Get Directions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
