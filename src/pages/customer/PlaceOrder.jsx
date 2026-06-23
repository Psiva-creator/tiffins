import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Star,
  Search,
  X,
  CheckCircle,
  ShoppingBag,
  CreditCard,
  MapPin,
  Clock,
} from 'lucide-react'

import { MENU_ITEMS as allItems } from '../../data'
import { useOrder } from '../../hooks/useOrder'
import { useNavigate } from 'react-router-dom'

const getItemImage = (name, category) => {
  const lowerName = name.toLowerCase()
  
  if (lowerName.includes('idly') || lowerName.includes('idli')) {
    return '/images/menu/idli.png'
  }
  if (lowerName.includes('wada') || lowerName.includes('vada')) {
    return '/images/menu/vada.png'
  }
  if (lowerName.includes('pesarattu')) {
    return '/images/menu/pesarattu.png'
  }
  if (lowerName.includes('masala dosa')) {
    return '/images/menu/masala_dosa.png'
  }
  if (lowerName.includes('ghee')) {
    return '/images/menu/ghee_dosa.png'
  }
  if (lowerName.includes('dosa') || lowerName.includes('uttappa') || lowerName.includes('uttapam')) {
    return '/images/menu/masala_dosa.png'
  }
  if (lowerName.includes('upma')) {
    return '/images/menu/upma.png'
  }
  if (lowerName.includes('poori') || lowerName.includes('puri') || lowerName.includes('chapathi') || lowerName.includes('parota')) {
    return '/images/menu/puri.png'
  }
  if (lowerName.includes('biryani') || lowerName.includes('pongal')) {
    return '/images/menu/veg_biryani.png'
  }
  if (lowerName.includes('fried rice') || lowerName.includes('rice') || lowerName.includes('thali')) {
    return '/images/menu/fried_rice.png'
  }
  if (lowerName.includes('noodles')) {
    return '/images/menu/veg_noodles.png'
  }
  if (lowerName.includes('manchuria') || lowerName.includes('chilli') || lowerName.includes('chili') || lowerName.includes('paneer') || lowerName.includes('dal')) {
    return '/images/menu/paneer_65.png'
  }
  if (lowerName.includes('65')) {
    return '/images/menu/paneer_65.png'
  }
  if (lowerName.includes('coffee')) {
    return '/images/menu/filter_coffee.png'
  }
  if (lowerName.includes('tea') || lowerName.includes('chai') || lowerName.includes('lassi')) {
    return '/images/menu/masala_tea.png'
  }
  
  // Category fallbacks
  if (category === 'Breakfast') return '/images/menu/idli.png'
  if (category === 'Lunch') return '/images/menu/veg_biryani.png'
  if (category === 'Dinner') return '/images/menu/paneer_65.png'
  if (category === 'Beverages') return '/images/menu/filter_coffee.png'
  if (category === 'Desserts') return '/images/menu/samosa.png'
  
  return null
}

const PlaceOrder = () => {
  const { cart, addToCart, updateQuantity, removeFromCart, placeOrder, cartTotal, cartCount, clearCart } = useOrder()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const deliveryFee = cartTotal > 300 ? 0 : 30
  const gst = Math.round(cartTotal * 0.05)
  const total = cartTotal + deliveryFee + gst

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    const orderData = {
      items: cart,
      subtotal: cartTotal,
      gst,
      deliveryFee,
      total,
      customerName: 'Siva',
      customerId: 'cust_1',
    }
    placeOrder(orderData)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      clearCart()
      navigate('/customer/orders')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-poppins)] text-gray-900">
          Place Order
        </h1>
        <p className="text-sm text-gray-400 mt-1">Select items and review your cart before ordering</p>
      </motion.div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-white rounded-2xl shadow-2xl border border-green-100"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Order Placed!</p>
              <p className="text-xs text-gray-400">Your order is being prepared</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Selection Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 0, 0, 0.1)'; e.currentTarget.style.borderColor = '#8B0000' }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#e5e7eb' }}
            />
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredItems.map((item, i) => {
              const inCart = cart.find((c) => c.id === item.id)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md transition-all duration-200 group"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {getItemImage(item.name, item.category) ? (
                      <img
                        src={getItemImage(item.name, item.category)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="select-none">{item.emoji}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded border flex items-center justify-center"
                        style={{ borderColor: item.isVeg ? '#16a34a' : '#dc2626' }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.isVeg ? '#16a34a' : '#dc2626' }} />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-bold" style={{ color: '#8B0000' }}>₹{item.price}</span>
                      <span className="text-[10px] text-gray-400">• {item.category}</span>
                    </div>
                  </div>
                  {inCart ? (
                    <div className="flex items-center gap-0 rounded-lg overflow-hidden border-2" style={{ borderColor: '#8B0000' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-red-50 transition-colors">
                        <Minus className="w-3 h-3" style={{ color: '#8B0000' }} />
                      </button>
                      <span className="px-2 text-xs font-bold min-w-[24px] text-center">{inCart.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-white" style={{ backgroundColor: '#8B0000' }}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 rounded-lg text-white transition-all hover:shadow-md active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #8B0000, #B22222)' }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            {/* Cart Header */}
            <div
              className="px-5 py-4 text-white flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #8B0000, #B22222)' }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-bold font-[family-name:var(--font-poppins)]">Your Cart</h2>
              </div>
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">
                {cartCount} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Your cart is empty</p>
                <p className="text-xs text-gray-300 mt-1">Add items from the menu</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="p-4 space-y-3 max-h-[40vh] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center text-lg shrink-0">
                        {getItemImage(item.name, item.category) ? (
                          <img
                            src={getItemImage(item.name, item.category)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="select-none">{item.emoji}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: '#8B0000' }}>
                          ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-500" />
                        </button>
                        <span className="text-xs font-bold min-w-[16px] text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded-md hover:bg-red-50 transition-colors ml-1"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-700">
                      Delivering to <span className="font-semibold">Kukatpally, Hyderabad</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <p className="text-xs text-blue-700">
                      Estimated delivery: <span className="font-semibold">25-35 min</span>
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="px-4 py-4 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-700">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>GST (5%)</span>
                    <span className="font-medium text-gray-700">₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span className="font-medium" style={{ color: deliveryFee === 0 ? '#16a34a' : '#6b7280' }}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <p className="text-[10px] text-green-600 font-medium">🎉 Free delivery on orders above ₹300</p>
                  )}
                  <div className="flex justify-between pt-3 border-t border-dashed border-gray-200">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold font-[family-name:var(--font-poppins)]" style={{ color: '#8B0000' }}>
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #8B0000 0%, #B22222 100%)',
                      boxShadow: '0 4px 15px rgba(139, 0, 0, 0.35)',
                    }}
                  >
                    <CreditCard className="w-4 h-4" />
                    Place Order — ₹{total}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlaceOrder
