import { motion } from 'framer-motion'
import { UtensilsCrossed, ChefHat, Star, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Authentic South Indian Cuisine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-dark leading-tight mb-6">
              Welcome to <br />
              <span className="text-primary">Sri Sai Darshini</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Freshly prepared tiffins, meals & snacks every day. Experience the authentic taste of South India.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/menu"
                className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors"
              >
                View Menu
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: UtensilsCrossed, label: 'Dishes', value: '100+' },
              { icon: ChefHat, label: 'Expert Chefs', value: '15+' },
              { icon: Star, label: 'Happy Customers', value: '10K+' },
              { icon: Clock, label: 'Years of Service', value: '12+' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl border border-border"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-4">
            Ready to Order?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Scan the QR code at our restaurant or explore our full menu online.
          </p>
          <Link
            to="/customer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green hover:bg-green/90 text-white font-semibold rounded-xl transition-colors"
          >
            <span>Order Now</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
