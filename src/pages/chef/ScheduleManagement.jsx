import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Sun, Sunset, Moon, Star } from 'lucide-react'
import { SCHEDULE_DATA } from '../../data'

const shiftIcons = { Morning: Sun, Afternoon: Sunset, Evening: Moon, 'Weekend Special': Star }
const shiftColors = {
  Morning: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: 'text-amber-500' },
  Afternoon: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', icon: 'text-orange-500' },
  Evening: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', icon: 'text-indigo-500' },
  'Weekend Special': { bg: 'bg-pink-50', border: 'border-pink-200', badge: 'bg-pink-100 text-pink-700', icon: 'text-pink-500' },
}

const ScheduleManagement = () => {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">Schedule</h1>
        <p className="text-muted text-sm mb-6">Kitchen shifts and staff assignments</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHEDULE_DATA.map((sch, i) => {
          const c = shiftColors[sch.shift] || shiftColors.Morning
          const Icon = shiftIcons[sch.shift] || Calendar
          return (
            <motion.div key={sch.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`rounded-2xl ${c.bg} border ${c.border} p-5 hover:shadow-md transition-shadow`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl ${c.badge} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-dark">{sch.shift}</h3>
                  <p className="text-xs text-muted">{sch.day}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3 text-xs text-dark">
                <Clock className="w-3.5 h-3.5 text-muted" />
                <span className="font-medium">{sch.time}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3.5 h-3.5 text-muted" />
                <span className="text-xs text-muted">Staff ({sch.staff.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sch.staff.map(name => (
                  <span key={name} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/70 text-dark border border-white/50">{name}</span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ScheduleManagement
