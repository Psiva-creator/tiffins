import { Link } from 'react-router-dom'
import { UtensilsCrossed, MapPin, Phone, Mail, Globe, MessageCircle, Share2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                Sri Sai Darshini
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Authentic South Indian Tiffins, Meals & Snacks. Freshly Prepared Every Day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-[family-name:var(--font-poppins)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold font-[family-name:var(--font-poppins)] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <span>hello@srisaidarshini.com</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold font-[family-name:var(--font-poppins)] mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Sri Sai Darshini Tiffins & Meals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
