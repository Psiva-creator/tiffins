import { createBrowserRouter } from 'react-router-dom'

// Auth Components
import Login from './auth/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import RoleGuard from './auth/RoleGuard'

// Layouts
import PublicLayout from './components/layouts/PublicLayout'
import CustomerLayout from './components/layouts/CustomerLayout'
import ChefLayout from './components/layouts/ChefLayout'
import OwnerLayout from './components/layouts/OwnerLayout'

// Public Pages
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard'
import CustomerMenu from './pages/customer/CustomerMenu'
import PlaceOrder from './pages/customer/PlaceOrder'
import OrderHistory from './pages/customer/OrderHistory'
import Ratings from './pages/customer/Ratings'
import CustomerProfile from './pages/customer/CustomerProfile'

// Chef Pages
import ChefDashboard from './pages/chef/ChefDashboard'
import OrderQueue from './pages/chef/OrderQueue'
import ScheduleManagement from './pages/chef/ScheduleManagement'
import InventoryManagement from './pages/chef/InventoryManagement'
import FoodWastage from './pages/chef/FoodWastage'

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard'
import Sales from './pages/owner/Sales'
import Revenue from './pages/owner/Revenue'
import ProfitLoss from './pages/owner/ProfitLoss'
import Inventory from './pages/owner/Inventory'
import Employees from './pages/owner/Employees'
import Analytics from './pages/owner/Analytics'

const router = createBrowserRouter([
  // ─── Public Website ──────────────────────────
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'gallery', element: <GalleryPage /> },
    ],
  },

  // ─── Auth ────────────────────────────────────
  {
    path: '/login',
    element: <Login />,
  },

  // ─── Customer Panel ──────────────────────────
  {
    path: '/customer',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['customer']}>
          <CustomerLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CustomerDashboard /> },
      { path: 'menu', element: <CustomerMenu /> },
      { path: 'order', element: <PlaceOrder /> },
      { path: 'orders', element: <OrderHistory /> },
      { path: 'reviews', element: <Ratings /> },
      { path: 'profile', element: <CustomerProfile /> },
    ],
  },

  // ─── Chef Panel ──────────────────────────────
  {
    path: '/chef',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['chef']}>
          <ChefLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ChefDashboard /> },
      { path: 'orders', element: <OrderQueue /> },
      { path: 'schedule', element: <ScheduleManagement /> },
      { path: 'inventory', element: <InventoryManagement /> },
      { path: 'wastage', element: <FoodWastage /> },
    ],
  },

  // ─── Owner Panel ─────────────────────────────
  {
    path: '/owner',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['owner']}>
          <OwnerLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <OwnerDashboard /> },
      { path: 'dashboard', element: <OwnerDashboard /> },
      { path: 'sales', element: <Sales /> },
      { path: 'revenue', element: <Revenue /> },
      { path: 'profit-loss', element: <ProfitLoss /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'employees', element: <Employees /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
])

export default router
