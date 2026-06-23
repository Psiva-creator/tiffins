import { createContext, useState, useEffect, useCallback, useMemo } from 'react'

export const OrderContext = createContext(null)

// ─── Helpers ──────────────────────────────────
const STORAGE_KEY = 'ssd_order_store'

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return null
}

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch { /* ignore */ }
}

let orderCounter = Date.now()
const nextOrderId = () => `ORD-${(++orderCounter).toString(36).toUpperCase().slice(-6)}`

// ─── Provider ─────────────────────────────────
export const OrderProvider = ({ children }) => {
  const stored = loadFromStorage()

  const [cart, setCart] = useState(stored?.cart ?? [])
  const [orders, setOrders] = useState(stored?.orders ?? [])
  const [inventory, setInventory] = useState(stored?.inventory ?? null) // null = use defaults
  const [wastageLog, setWastageLog] = useState(stored?.wastageLog ?? [])

  // Persist on every change
  useEffect(() => {
    saveToStorage({ cart, orders, inventory, wastageLog })
  }, [cart, orders, inventory, wastageLog])

  // ─── Cart actions ──────────────────────────
  const addToCart = useCallback((menuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === menuItem.id)
      if (existing) {
        return prev.map(c => c.id === menuItem.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...menuItem, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(c => c.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(c => c.id !== itemId))
      return
    }
    setCart(prev => prev.map(c => c.id === itemId ? { ...c, qty } : c))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = useMemo(() => cart.reduce((sum, c) => sum + c.price * c.qty, 0), [cart])
  const cartCount = useMemo(() => cart.reduce((sum, c) => sum + c.qty, 0), [cart])

  // ─── Order actions ─────────────────────────
  const placeOrder = useCallback((customerEmail) => {
    if (cart.length === 0) return null
    const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
    const tax = Math.round(subtotal * 0.05)
    const total = subtotal + tax
    const order = {
      id: nextOrderId(),
      items: [...cart],
      subtotal,
      tax,
      total,
      status: 'pending',
      customerEmail: customerEmail || 'customer@cafe.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setOrders(prev => [order, ...prev])
    setCart([])
    return order
  }, [cart])

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId
        ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
        : o
    ))
  }, [])

  const getOrdersByStatus = useCallback((status) => {
    return orders.filter(o => o.status === status)
  }, [orders])

  // ─── Revenue stats (derived) ───────────────
  const revenueStats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const delivered = orders.filter(o => o.status === 'delivered')
    const todayDelivered = delivered.filter(o => o.createdAt?.slice(0, 10) === today)
    const totalRevenue = delivered.reduce((sum, o) => sum + o.total, 0)
    const todayRevenue = todayDelivered.reduce((sum, o) => sum + o.total, 0)

    // Top selling items
    const itemCounts = {}
    delivered.forEach(o => {
      o.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty
      })
    })
    const topItems = Object.entries(itemCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    return {
      totalRevenue,
      todayRevenue,
      totalOrders: delivered.length,
      todayOrders: todayDelivered.length,
      avgOrderValue: delivered.length > 0 ? Math.round(totalRevenue / delivered.length) : 0,
      topItems,
      pendingCount: orders.filter(o => o.status === 'pending').length,
      preparingCount: orders.filter(o => o.status === 'preparing').length,
      readyCount: orders.filter(o => o.status === 'ready').length,
    }
  }, [orders])

  // ─── Inventory actions ─────────────────────
  const updateInventoryStock = useCallback((itemId, newStock) => {
    setInventory(prev => {
      const current = prev || []
      const exists = current.find(i => i.id === itemId)
      if (exists) {
        return current.map(i => i.id === itemId ? { ...i, stock: newStock } : i)
      }
      return current
    })
  }, [])

  const initInventory = useCallback((defaults) => {
    if (!inventory) setInventory(defaults)
  }, [inventory])

  // ─── Wastage actions ───────────────────────
  const addWastageEntry = useCallback((entry) => {
    setWastageLog(prev => [{
      id: `w-${Date.now()}`,
      ...entry,
      date: new Date().toISOString(),
    }, ...prev])
  }, [])

  // ─── Context value ─────────────────────────
  const value = useMemo(() => ({
    // Cart
    cart, cartTotal, cartCount,
    addToCart, removeFromCart, updateQuantity, clearCart,
    // Orders
    orders, placeOrder, updateOrderStatus, getOrdersByStatus,
    // Revenue
    revenueStats,
    // Inventory
    inventory, updateInventoryStock, initInventory,
    // Wastage
    wastageLog, addWastageEntry,
  }), [
    cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart,
    orders, placeOrder, updateOrderStatus, getOrdersByStatus,
    revenueStats,
    inventory, updateInventoryStock, initInventory,
    wastageLog, addWastageEntry,
  ])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
