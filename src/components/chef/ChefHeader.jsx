import { Bell, Search, ChefHat } from 'lucide-react'

const ChefHeader = () => {
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
              placeholder="Search orders, inventory..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green transition-all"
              readOnly
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl hover:bg-green/10 transition-colors">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green rounded-full" />
          </button>
          <button className="w-9 h-9 rounded-xl bg-green/10 flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-green" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default ChefHeader
