import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  PhoneCall,
  Sparkles,
  Award
} from 'lucide-react'
import EmployeeCard from '../../components/owner/EmployeeCard'

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  // Initial staff state in React state for full interactive attendance testing
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Ramesh Kumar', role: 'Chef (Head)', email: 'ramesh.k@srisaidarshini.com', phone: '+91 98765 43210', status: 'Present', checkIn: '08:15 AM', rating: 4.8, efficiency: '96%' },
    { id: 2, name: 'Suresh V.', role: 'Cashier', email: 'suresh.v@srisaidarshini.com', phone: '+91 98765 43211', status: 'Present', checkIn: '08:45 AM', rating: 4.6, efficiency: '92%' },
    { id: 3, name: 'Anitha Rao', role: 'Chef (South Indian)', email: 'anitha.r@srisaidarshini.com', phone: '+91 98765 43212', status: 'Present', checkIn: '08:05 AM', rating: 4.9, efficiency: '98%' },
    { id: 4, name: 'Balaji Naidu', role: 'Chef (Tandoor)', email: 'balaji.n@srisaidarshini.com', phone: '+91 98765 43213', status: 'On Break', checkIn: '09:00 AM', rating: 4.5, efficiency: '90%' },
    { id: 5, name: 'Ganesh Das', role: 'Waiter (Senior)', email: 'ganesh.d@srisaidarshini.com', phone: '+91 98765 43214', status: 'Present', checkIn: '08:30 AM', rating: 4.7, efficiency: '95%' },
    { id: 6, name: 'Lakshmi Prasanna', role: 'Waiter', email: 'lakshmi.p@srisaidarshini.com', phone: '+91 98765 43215', status: 'Present', checkIn: '08:40 AM', rating: 4.8, efficiency: '97%' },
    { id: 7, name: 'Vikram Singh', role: 'Waiter', email: 'vikram.s@srisaidarshini.com', phone: '+91 98765 43216', status: 'Absent', checkIn: '--', rating: 4.2, efficiency: '85%' },
    { id: 8, name: 'Meena Kumari', role: 'Kitchen Helper', email: 'meena.k@srisaidarshini.com', phone: '+91 98765 43217', status: 'Present', checkIn: '08:10 AM', rating: 4.5, efficiency: '91%' },
    { id: 9, name: 'Mohammad Ali', role: 'Store Keeper', email: 'mohammad.a@srisaidarshini.com', phone: '+91 98765 43218', status: 'Present', checkIn: '08:20 AM', rating: 4.7, efficiency: '94%' },
    { id: 10, name: 'Ravi Teja', role: 'Kitchen Helper', email: 'ravi.t@srisaidarshini.com', phone: '+91 98765 43219', status: 'Absent', checkIn: '--', rating: 4.3, efficiency: '88%' }
  ])

  // Toggle status cycling callback
  const handleStatusCycle = (name) => {
    setStaffList(prevList =>
      prevList.map(member => {
        if (member.name === name) {
          let nextStatus = 'Present'
          let nextCheckIn = member.checkIn
          if (member.status === 'Present') {
            nextStatus = 'On Break'
          } else if (member.status === 'On Break') {
            nextStatus = 'Absent'
            nextCheckIn = '--'
          } else {
            nextStatus = 'Present'
            nextCheckIn = '09:15 AM' // Default mock check-in when checking back in
          }
          return { ...member, status: nextStatus, checkIn: nextCheckIn }
        }
        return member
      })
    )
  }

  // Filter calculations
  const filteredStaff = staffList.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All' ||
                        (roleFilter === 'Chefs' && member.role.toLowerCase().includes('chef')) ||
                        (roleFilter === 'Waiters' && member.role.toLowerCase().includes('waiter')) ||
                        (roleFilter === 'Cashiers' && member.role.toLowerCase().includes('cashier')) ||
                        (roleFilter === 'Helpers' && member.role.toLowerCase().includes('helper'))
    return matchesSearch && matchesRole
  })

  // Staff summary calculations
  const totalStaffCount = staffList.length
  const presentCount = staffList.filter(m => m.status === 'Present').length
  const onBreakCount = staffList.filter(m => m.status === 'On Break').length
  const absentCount = staffList.filter(m => m.status === 'Absent').length
  const attendanceRate = Math.round(((presentCount + onBreakCount) / totalStaffCount) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-dark mb-1">
            Employee Directory
          </h1>
          <p className="text-[#888] text-xs md:text-sm font-medium">Sri Sai Darshini — Operational roster and attendance records</p>
        </div>

        <button
          onClick={() => alert('Add Staff form modal is disabled in this mockup. Adding staff functionality.')}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-[#B71C1C] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/10 transition-all self-start sm:self-center cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-white" />
          <span>Add Employee</span>
        </button>
      </motion.div>

      {/* Attendance Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-semibold">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Total Strength</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">{totalStaffCount} staff</p>
          <span className="text-[10px] text-muted bg-[#F5F5F5] border border-[#E0E0E0] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            Permanent team members
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Present Today</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-green mt-1">
            {presentCount} <span className="text-xs text-muted font-normal">({onBreakCount} on break)</span>
          </p>
          <span className="text-[10px] text-green font-bold bg-[rgba(198,40,40,0.06)] px-2 py-0.5 rounded-full mt-2.5 inline-block">
            Active in kitchen/dining
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Absent Today</p>
          <p className={`text-2xl font-bold font-[family-name:var(--font-poppins)] mt-1 ${absentCount > 0 ? 'text-primary' : 'text-dark'}`}>
            {absentCount} absent
          </p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2.5 inline-block ${
            absentCount > 0 ? 'bg-[rgba(198,40,40,0.08)] text-primary border border-[#C62828]/20' : 'bg-[rgba(198,40,40,0.06)] text-green'
          }`}>
            {absentCount > 0 ? 'Replacements assigned' : 'No leaves today'}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="bg-white rounded-2xl border border-[#F5F5F5] p-5 hover:shadow-md transition-shadow"
        >
          <p className="text-xs text-muted uppercase tracking-wider">Attendance Rate</p>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-dark mt-1">{attendanceRate}%</p>
          <div className="mt-3.5 h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full animate-pulse" style={{ width: `${attendanceRate}%` }} />
          </div>
        </motion.div>
      </div>

      {/* Roster & Employee Cards List Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white border border-[#F5F5F5] rounded-2xl p-5 md:p-6 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold font-[family-name:var(--font-poppins)] text-base text-dark flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C62828]" />
              Restaurant Staff Roster
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">Click any employee attendance badge to cycle their status!</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full xs:w-56">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <input
                type="text"
                placeholder="Search staff name/role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#F5F5F5] bg-background rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold"
              />
            </div>

            {/* Role Filter tabs */}
            <div className="flex bg-[#F5F5F5] border border-[#E0E0E0] p-1 rounded-xl items-center flex-wrap">
              {['All', 'Chefs', 'Waiters', 'Cashiers', 'Helpers'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    roleFilter === role
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted hover:text-dark'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Employees Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
          {filteredStaff.map((member, idx) => (
            <EmployeeCard
              key={member.id}
              name={member.name}
              role={member.role}
              email={member.email}
              phone={member.phone}
              status={member.status}
              checkIn={member.checkIn}
              rating={member.rating}
              efficiency={member.efficiency}
              onStatusToggle={handleStatusCycle}
              index={idx}
            />
          ))}
          {filteredStaff.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted font-medium text-xs">
              No matching employees found for the filter criteria.
            </div>
          )}
        </div>

        {/* Attendance checklist panel */}
        <div className="border-t border-[#F5F5F5]/60 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-bold text-xs text-dark uppercase tracking-wider">Attendance Checklist Audit</h4>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green bg-[rgba(198,40,40,0.06)] px-2 py-0.5 rounded-full border border-[#C62828]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive attendance: Adjust employee status to update dashboard counts instantly.</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#F5F5F5]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-[#F5F5F5]/80 text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="p-4">Staff Member</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4 text-center">Duty Check-In</th>
                  <th className="p-4 text-center">Attendance Status</th>
                  <th className="p-4 text-center">Checklist Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5] text-xs font-semibold text-[#1A1A1A]">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F5F5F5]/40 transition-colors">
                    <td className="p-4 font-bold text-[#1A1A1A]">{member.name}</td>
                    <td className="p-4 text-[#888]">{member.role}</td>
                    <td className="p-4 text-muted font-mono">{member.phone}</td>
                    <td className="p-4 text-center font-mono font-medium">{member.checkIn}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        member.status === 'Present' ? 'bg-[rgba(198,40,40,0.06)] text-green border border-[#C62828]/20' :
                        member.status === 'On Break' ? 'bg-[#FEF3C7] text-[#D97706] border border-[#F59E0B]/20' :
                        'bg-[rgba(198,40,40,0.08)] text-primary border border-[#C62828]/20'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        {['Present', 'On Break', 'Absent'].map((stat) => (
                          <button
                            key={stat}
                            onClick={() => {
                              setStaffList(prevList =>
                                prevList.map(m => {
                                  if (m.id === member.id) {
                                    return {
                                      ...m,
                                      status: stat,
                                      checkIn: stat === 'Absent' ? '--' : m.checkIn === '--' ? '09:15 AM' : m.checkIn
                                    }
                                  }
                                  return m
                                })
                              )
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                              member.status === stat
                                ? stat === 'Present' ? 'bg-green text-white border-green' :
                                  stat === 'On Break' ? 'bg-[#D97706] text-white border-[#D97706]' :
                                  'bg-primary text-white border-primary'
                                : 'bg-background hover:bg-[#F5F5F5] text-muted border-border'
                            }`}
                          >
                            {stat.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Employees
