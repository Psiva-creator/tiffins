import { Bell, Search, Crown } from 'lucide-react'

const OwnerHeader = () => {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left spacer for mobile menu button */}
        <div className="w-10 md:hidden" />

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search sales, employees..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
              readOnly
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl hover:bg-accent/10 transition-colors">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>
          <button className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Crown className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default OwnerHeader
