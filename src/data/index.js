// ─── Data Layer ────────────────────────────────

export const APP_NAME = 'Sri Sai Darshini'
export const APP_TAGLINE = 'Tiffins & Meals'

export const ROLES = {
  CUSTOMER: 'customer',
  CHEF: 'chef',
  OWNER: 'owner',
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

export const CATEGORIES = ['All', 'Tiffins', 'Dosas', 'Special Dosas', 'Rice Items', 'Noodles', 'Starters', 'Tea & Beverages', 'Snacks']

export const MENU_ITEMS = [
  // ─── Tiffins ──────────────────
  { id: 'm1', name: 'Idly (2 Pcs)', price: 50, category: 'Tiffins', rating: 4.5, isVeg: true },
  { id: 'm2', name: 'Idly (3 Pcs)', price: 60, category: 'Tiffins', rating: 4.5, isVeg: true },
  { id: 'm3', name: 'Sambar Idly', price: 60, category: 'Tiffins', rating: 4.6, isVeg: true },
  { id: 'm4', name: 'Ghee Idly', price: 75, category: 'Tiffins', rating: 4.7, isVeg: true },
  { id: 'm5', name: 'Wada (2 Pcs)', price: 70, category: 'Tiffins', rating: 4.4, isVeg: true },
  { id: 'm6', name: 'Sambar Wada (2 Pcs)', price: 80, category: 'Tiffins', rating: 4.6, isVeg: true },
  { id: 'm7', name: 'Dahi Wada (2 Pcs)', price: 85, category: 'Tiffins', rating: 4.5, isVeg: true },
  { id: 'm8', name: 'Mysore Bajji', price: 60, category: 'Tiffins', rating: 4.3, isVeg: true },
  { id: 'm9', name: 'Onion Bonda', price: 60, category: 'Tiffins', rating: 4.4, isVeg: true },
  { id: 'm10', name: 'Upma', price: 55, category: 'Tiffins', rating: 4.2, isVeg: true },
  { id: 'm11', name: 'Tomato Bath', price: 60, category: 'Tiffins', rating: 4.3, isVeg: true },
  { id: 'm12', name: 'Poori', price: 70, category: 'Tiffins', rating: 4.5, isVeg: true },
  { id: 'm13', name: 'Chapathi', price: 70, category: 'Tiffins', rating: 4.4, isVeg: true },
  { id: 'm14', name: 'Parota', price: 70, category: 'Tiffins', rating: 4.5, isVeg: true },
  { id: 'm15', name: 'Rice Pongal', price: 80, category: 'Tiffins', rating: 4.6, isVeg: true },

  // ─── Dosas ──────────────────
  { id: 'm16', name: 'Plain Dosa', price: 60, category: 'Dosas', rating: 4.4, isVeg: true },
  { id: 'm17', name: 'Onion Dosa', price: 70, category: 'Dosas', rating: 4.5, isVeg: true },
  { id: 'm18', name: 'Masala Dosa', price: 70, category: 'Dosas', rating: 4.8, isVeg: true },
  { id: 'm19', name: 'Upma Dosa', price: 75, category: 'Dosas', rating: 4.5, isVeg: true },
  { id: 'm20', name: 'Plain Pesarattu', price: 65, category: 'Dosas', rating: 4.3, isVeg: true },
  { id: 'm21', name: 'Onion Pesarattu', price: 75, category: 'Dosas', rating: 4.5, isVeg: true },
  { id: 'm22', name: 'Masala Pesarattu', price: 75, category: 'Dosas', rating: 4.6, isVeg: true },
  { id: 'm23', name: 'Plain Ragi Dosa', price: 60, category: 'Dosas', rating: 4.3, isVeg: true },
  { id: 'm24', name: 'Onion Ragi Dosa', price: 75, category: 'Dosas', rating: 4.4, isVeg: true },
  { id: 'm25', name: 'Masala Ragi Dosa', price: 75, category: 'Dosas', rating: 4.5, isVeg: true },
  { id: 'm26', name: 'Plain Rava Dosa', price: 75, category: 'Dosas', rating: 4.4, isVeg: true },
  { id: 'm27', name: 'Onion Rava Dosa', price: 85, category: 'Dosas', rating: 4.6, isVeg: true },
  { id: 'm28', name: 'Onion Uttappa', price: 80, category: 'Dosas', rating: 4.5, isVeg: true },
  { id: 'm29', name: 'Set Dosa', price: 80, category: 'Dosas', rating: 4.4, isVeg: true },

  // ─── Special Dosas ──────────────────
  { id: 'm30', name: 'Paneer Dosa', price: 95, category: 'Special Dosas', rating: 4.8, isVeg: true },
  { id: 'm31', name: 'Ghee Plain Dosa', price: 80, category: 'Special Dosas', rating: 4.6, isVeg: true },
  { id: 'm32', name: 'Ghee Masala Dosa', price: 95, category: 'Special Dosas', rating: 4.8, isVeg: true },
  { id: 'm33', name: 'Ghee Onion Dosa', price: 95, category: 'Special Dosas', rating: 4.7, isVeg: true },
  { id: 'm34', name: 'Ghee Karam Dosa', price: 95, category: 'Special Dosas', rating: 4.6, isVeg: true },
  { id: 'm35', name: 'Butter Onion Dosa', price: 90, category: 'Special Dosas', rating: 4.7, isVeg: true },
  { id: 'm36', name: 'Butter Masala Dosa', price: 90, category: 'Special Dosas', rating: 4.8, isVeg: true },
  { id: 'm37', name: '70MM Dosa', price: 100, category: 'Special Dosas', rating: 4.9, isVeg: true },

  // ─── Rice Items ──────────────────
  { id: 'm38', name: 'Tomato Rice', price: 80, category: 'Rice Items', rating: 4.4, isVeg: true },
  { id: 'm39', name: 'Gongura Rice', price: 80, category: 'Rice Items', rating: 4.5, isVeg: true },
  { id: 'm40', name: 'Lemon Rice', price: 80, category: 'Rice Items', rating: 4.4, isVeg: true },
  { id: 'm41', name: 'Sambar Rice', price: 80, category: 'Rice Items', rating: 4.3, isVeg: true },
  { id: 'm42', name: 'Curd Rice', price: 80, category: 'Rice Items', rating: 4.5, isVeg: true },
  { id: 'm43', name: 'Veg Biryani', price: 95, category: 'Rice Items', rating: 4.7, isVeg: true },
  { id: 'm44', name: 'Veg Fried Rice', price: 120, category: 'Rice Items', rating: 4.5, isVeg: true },
  { id: 'm45', name: 'Jeera Fried Rice', price: 120, category: 'Rice Items', rating: 4.4, isVeg: true },
  { id: 'm46', name: 'Veg Manchurian Fried Rice', price: 130, category: 'Rice Items', rating: 4.6, isVeg: true },
  { id: 'm47', name: 'Gobi Manchurian Fried Rice', price: 130, category: 'Rice Items', rating: 4.6, isVeg: true },
  { id: 'm48', name: 'Schezwan Fried Rice', price: 130, category: 'Rice Items', rating: 4.5, isVeg: true },
  { id: 'm49', name: 'Paneer Fried Rice', price: 160, category: 'Rice Items', rating: 4.7, isVeg: true },
  { id: 'm50', name: 'Mushroom Fried Rice', price: 160, category: 'Rice Items', rating: 4.6, isVeg: true },

  // ─── Noodles ──────────────────
  { id: 'm51', name: 'Veg Noodles', price: 110, category: 'Noodles', rating: 4.4, isVeg: true },
  { id: 'm52', name: 'Schezwan Noodles', price: 120, category: 'Noodles', rating: 4.5, isVeg: true },
  { id: 'm53', name: 'Veg Manchurian Noodles', price: 120, category: 'Noodles', rating: 4.5, isVeg: true },
  { id: 'm54', name: 'Gobi Manchurian Noodles', price: 120, category: 'Noodles', rating: 4.5, isVeg: true },
  { id: 'm55', name: 'Paneer Noodles', price: 160, category: 'Noodles', rating: 4.6, isVeg: true },
  { id: 'm56', name: 'Mushroom Noodles', price: 150, category: 'Noodles', rating: 4.6, isVeg: true },

  // ─── Starters ──────────────────
  { id: 'm57', name: 'Veg Manchuria', price: 130, category: 'Starters', rating: 4.5, isVeg: true },
  { id: 'm58', name: 'Gobi Manchuria', price: 130, category: 'Starters', rating: 4.7, isVeg: true },
  { id: 'm59', name: 'Mushroom Manchuria', price: 150, category: 'Starters', rating: 4.6, isVeg: true },
  { id: 'm60', name: 'Babycorn Manchuria', price: 150, category: 'Starters', rating: 4.5, isVeg: true },
  { id: 'm61', name: 'Gobi 65', price: 130, category: 'Starters', rating: 4.6, isVeg: true },
  { id: 'm62', name: 'Mushroom 65', price: 150, category: 'Starters', rating: 4.6, isVeg: true },
  { id: 'm63', name: 'Paneer 65', price: 170, category: 'Starters', rating: 4.7, isVeg: true },
  { id: 'm64', name: 'Paneer Chilli', price: 170, category: 'Starters', rating: 4.7, isVeg: true },
  { id: 'm65', name: 'Mushroom Chilli', price: 150, category: 'Starters', rating: 4.5, isVeg: true },
  { id: 'm66', name: 'Crispy Babycorn', price: 140, category: 'Starters', rating: 4.5, isVeg: true },

  // ─── Tea & Beverages ──────────────────
  { id: 'm67', name: 'Single Tea', price: 15, category: 'Tea & Beverages', rating: 4.3, isVeg: true },
  { id: 'm68', name: 'Full Tea', price: 25, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { id: 'm69', name: 'Allam Tea', price: 20, category: 'Tea & Beverages', rating: 4.5, isVeg: true },
  { id: 'm70', name: 'Bru Coffee Single', price: 20, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { id: 'm71', name: 'Bru Coffee Full', price: 30, category: 'Tea & Beverages', rating: 4.7, isVeg: true },
  { id: 'm72', name: 'Lemon Tea', price: 25, category: 'Tea & Beverages', rating: 4.3, isVeg: true },
  { id: 'm73', name: 'Green Tea', price: 25, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { id: 'm74', name: 'Badam Tea', price: 20, category: 'Tea & Beverages', rating: 4.3, isVeg: true },
  { id: 'm75', name: 'Boost', price: 30, category: 'Tea & Beverages', rating: 4.5, isVeg: true },
  { id: 'm76', name: 'Horlicks', price: 30, category: 'Tea & Beverages', rating: 4.4, isVeg: true },
  { id: 'm77', name: 'Milk', price: 25, category: 'Tea & Beverages', rating: 4.3, isVeg: true },

  // ─── Snacks ──────────────────
  { id: 'm78', name: 'Mirchi Bajji', price: 50, category: 'Snacks', rating: 4.5, isVeg: true },
  { id: 'm79', name: 'Punugu', price: 50, category: 'Snacks', rating: 4.4, isVeg: true },
  { id: 'm80', name: 'Masala Vada', price: 50, category: 'Snacks', rating: 4.5, isVeg: true },
  { id: 'm81', name: 'Onion Pakoda', price: 50, category: 'Snacks', rating: 4.4, isVeg: true },
  { id: 'm82', name: 'Aloo Samosa', price: 15, category: 'Snacks', rating: 4.6, isVeg: true },
  { id: 'm83', name: 'Mirchi (2 Pcs)', price: 30, category: 'Snacks', rating: 4.3, isVeg: true },
  { id: 'm84', name: 'Single Punugu', price: 30, category: 'Snacks', rating: 4.3, isVeg: true },
]

export const INVENTORY_ITEMS = [
  { id: 'inv1', name: 'Basmati Rice', category: 'Grains', unit: 'kg', stock: 45, minStock: 10 },
  { id: 'inv2', name: 'Urad Dal', category: 'Lentils', unit: 'kg', stock: 20, minStock: 5 },
  { id: 'inv3', name: 'Chana Dal', category: 'Lentils', unit: 'kg', stock: 15, minStock: 5 },
  { id: 'inv4', name: 'Cooking Oil', category: 'Oils', unit: 'litre', stock: 12, minStock: 5 },
  { id: 'inv5', name: 'Onions', category: 'Vegetables', unit: 'kg', stock: 8, minStock: 10 },
  { id: 'inv6', name: 'Tomatoes', category: 'Vegetables', unit: 'kg', stock: 6, minStock: 8 },
  { id: 'inv7', name: 'Potatoes', category: 'Vegetables', unit: 'kg', stock: 18, minStock: 10 },
  { id: 'inv8', name: 'Green Chillies', category: 'Vegetables', unit: 'kg', stock: 3, minStock: 2 },
  { id: 'inv9', name: 'Semolina (Rava)', category: 'Grains', unit: 'kg', stock: 10, minStock: 5 },
  { id: 'inv10', name: 'Flattened Rice (Poha)', category: 'Grains', unit: 'kg', stock: 8, minStock: 4 },
  { id: 'inv11', name: 'Chickpeas', category: 'Lentils', unit: 'kg', stock: 12, minStock: 5 },
  { id: 'inv12', name: 'Curd / Yogurt', category: 'Dairy', unit: 'litre', stock: 10, minStock: 5 },
  { id: 'inv13', name: 'Milk', category: 'Dairy', unit: 'litre', stock: 15, minStock: 8 },
  { id: 'inv14', name: 'Coffee Powder', category: 'Beverages', unit: 'kg', stock: 3, minStock: 1 },
  { id: 'inv15', name: 'Tea Leaves', category: 'Beverages', unit: 'kg', stock: 2, minStock: 1 },
  { id: 'inv16', name: 'Sugar', category: 'Essentials', unit: 'kg', stock: 20, minStock: 5 },
]

export const SCHEDULE_DATA = [
  { id: 'sch1', shift: 'Morning', time: '6:00 AM — 10:00 AM', staff: ['Ravi', 'Meena'], day: 'Mon–Sat' },
  { id: 'sch2', shift: 'Afternoon', time: '11:00 AM — 3:00 PM', staff: ['Suresh', 'Lakshmi', 'Kumar'], day: 'Mon–Sat' },
  { id: 'sch3', shift: 'Evening', time: '4:00 PM — 9:00 PM', staff: ['Ravi', 'Kumar'], day: 'Mon–Fri' },
  { id: 'sch4', shift: 'Weekend Special', time: '7:00 AM — 11:00 AM', staff: ['Meena', 'Lakshmi', 'Suresh', 'Ravi'], day: 'Sun' },
]
