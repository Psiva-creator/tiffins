/**
 * InventoryChart - Displays stock levels, low stock alerts,
 * restock warnings, and status badges.
 * Uses horizontal bar chart for stock levels and color-coded status badges.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import ChartContainer from './ChartContainer';
import { StatCard } from './SVGChartPrimitives';
import { CHART_COLORS, STATUS_COLORS, formatNumber } from './chartConfig';

// ─── Mock Inventory Data ────────────────────────────────────────────────────
const INVENTORY_ITEMS = [
  { name: 'Basmati Rice', stock: 85, maxStock: 100, unit: 'kg', category: 'Grains' },
  { name: 'Chicken Breast', stock: 12, maxStock: 50, unit: 'kg', category: 'Meat' },
  { name: 'Tomatoes', stock: 35, maxStock: 40, unit: 'kg', category: 'Vegetables' },
  { name: 'Cooking Oil', stock: 8, maxStock: 30, unit: 'L', category: 'Oils' },
  { name: 'Onions', stock: 42, maxStock: 60, unit: 'kg', category: 'Vegetables' },
  { name: 'Paneer', stock: 5, maxStock: 25, unit: 'kg', category: 'Dairy' },
  { name: 'Flour (Atta)', stock: 60, maxStock: 80, unit: 'kg', category: 'Grains' },
  { name: 'Spice Mix', stock: 18, maxStock: 20, unit: 'kg', category: 'Spices' },
  { name: 'Yogurt', stock: 3, maxStock: 20, unit: 'L', category: 'Dairy' },
  { name: 'Ghee', stock: 22, maxStock: 25, unit: 'L', category: 'Oils' },
];

// ─── Status Helpers ─────────────────────────────────────────────────────────
const getStockStatus = (stock, maxStock) => {
  const pct = (stock / maxStock) * 100;
  if (pct <= 15) return { label: 'Critical', color: STATUS_COLORS.danger, icon: AlertCircle };
  if (pct <= 35) return { label: 'Low Stock', color: STATUS_COLORS.warning, icon: AlertTriangle };
  if (pct <= 70) return { label: 'Adequate', color: STATUS_COLORS.info, icon: RefreshCw };
  return { label: 'In Stock', color: STATUS_COLORS.success, icon: CheckCircle };
};

const getBarColor = (stock, maxStock) => {
  const pct = (stock / maxStock) * 100;
  if (pct <= 15) return '#EF4444';
  if (pct <= 35) return '#F59E0B';
  if (pct <= 70) return CHART_COLORS.inventory.primary;
  return CHART_COLORS.revenue.primary;
};

const InventoryChart = ({ className = '' }) => {
  const [filter, setFilter] = useState('all');

  // Compute summary stats
  const totalItems = INVENTORY_ITEMS.length;
  const lowStockItems = INVENTORY_ITEMS.filter((i) => (i.stock / i.maxStock) * 100 <= 35);
  const criticalItems = INVENTORY_ITEMS.filter((i) => (i.stock / i.maxStock) * 100 <= 15);
  const inStockItems = INVENTORY_ITEMS.filter((i) => (i.stock / i.maxStock) * 100 > 70);

  // Filter items
  const filteredItems = (() => {
    switch (filter) {
      case 'low': return INVENTORY_ITEMS.filter((i) => { const p = (i.stock / i.maxStock) * 100; return p > 15 && p <= 35; });
      case 'critical': return criticalItems;
      case 'instock': return inStockItems;
      default: return INVENTORY_ITEMS;
    }
  })();

  return (
    <ChartContainer
      title="Inventory Status"
      subtitle="Stock levels and restock alerts"
      icon={Package}
      accentColor={CHART_COLORS.inventory.primary}
      filters={{ all: 'All', low: 'Low Stock', critical: 'Critical', instock: 'In Stock' }}
      activeFilter={filter}
      onFilterChange={setFilter}
      className={className}
    >
      {/* ─── KPI Summary ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <StatCard label="Total Items" value={totalItems} color={CHART_COLORS.inventory.primary} icon={Package} />
        <StatCard label="Low Stock" value={lowStockItems.length} color="#F59E0B" icon={AlertTriangle} />
        <StatCard label="Critical" value={criticalItems.length} color="#EF4444" icon={AlertCircle} />
        <StatCard label="In Stock" value={inStockItems.length} color={CHART_COLORS.revenue.primary} icon={CheckCircle} />
      </div>

      {/* ─── Inventory List with Progress Bars ─────────────────────── */}
      <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
        {filteredItems.map((item, i) => {
          const pct = Math.round((item.stock / item.maxStock) * 100);
          const status = getStockStatus(item.stock, item.maxStock);
          const barColor = getBarColor(item.stock, item.maxStock);
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '6px',
                background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF',
                border: '1px solid #F3F4F6',
              }}
            >
              {/* Item name & category */}
              <div style={{ minWidth: '120px', flex: '0 0 auto' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', marginBottom: '2px' }}>{item.name}</p>
                <p style={{ fontSize: '11px', color: '#9CA3AF' }}>{item.category}</p>
              </div>

              {/* Progress bar */}
              <div style={{ flex: 1, minWidth: '80px' }}>
                <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#F3F4F6', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.04 }}
                    style={{ height: '100%', borderRadius: '4px', background: barColor }}
                  />
                </div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '3px' }}>
                  {item.stock} / {item.maxStock} {item.unit}
                </p>
              </div>

              {/* Status badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: status.color.bg,
                  color: status.color.text,
                  border: `1px solid ${status.color.border}`,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <StatusIcon size={12} />
                {status.label}
              </div>
            </motion.div>
          );
        })}

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF', fontSize: '14px' }}>
            No items match this filter.
          </div>
        )}
      </div>
    </ChartContainer>
  );
};

export default InventoryChart;
