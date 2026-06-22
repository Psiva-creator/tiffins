import { Outlet } from 'react-router-dom'
import OwnerSidebar from '../owner/OwnerSidebar'
import OwnerHeader from '../owner/OwnerHeader'

const OwnerLayout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <OwnerHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
        <footer className="px-6 py-4 border-t border-border text-center">
          <p className="text-xs text-muted">© 2026 Sri Sai Darshini — Owner Panel</p>
        </footer>
      </div>
    </div>
  )
}

export default OwnerLayout
