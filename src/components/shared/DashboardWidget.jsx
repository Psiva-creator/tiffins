import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const DashboardWidget = ({ widget, index = 0 }) => {
  const { title, description, icon: Icon, path, color, lightColor, stats } = widget
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link 
        to={path || '#'}
        className="block h-full bg-card border border-border rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group overflow-hidden relative"
      >
        {/* Top Highlight line */}
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="flex justify-between items-start mb-5">
          <div className={`w-14 h-14 rounded-2xl ${lightColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            {Icon && <Icon className="w-7 h-7" />}
          </div>
          {stats && (
            <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg group-hover:bg-dark group-hover:text-white transition-colors">
              {stats}
            </span>
          )}
        </div>
        
        <div>
          <h3 className="font-bold font-[family-name:var(--font-poppins)] text-dark text-lg mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Open <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </Link>
    </motion.div>
  )
}

export default DashboardWidget
