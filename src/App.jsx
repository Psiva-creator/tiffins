import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { OrderProvider } from './context/OrderProvider'
import router from './router'
import './styles/globals.css'

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <RouterProvider router={router} />
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
