/**
 * DashboardWidget - Reusable dashboard card/KPI component.
 * Used across Customer, Chef, and Owner dashboards for consistent
 * visual presentation of key metrics.
 *
 * Props:
 *   title    - Widget heading text
 *   value    - Primary KPI value to display
 *   icon     - Lucide icon component
 *   trend    - Percentage trend value (+/- number)
 *   color    - Accent color (hex string)
 *   loading  - Boolean to show skeleton loading state
 *   subtitle - Optional secondary text below value
 *   onClick  - Optional click handler
 *   className - Additional CSS classes
 */
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const DashboardWidget = ({
  title,
  value,
  icon: Icon,
  trend = null,
  color = '#3B82F6',
  loading = false,
  subtitle = '',
  onClick = null,
  index = 0,
  className = '',
}) => {
  // Determine trend display
  const trendDirection = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';
  const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #E5E7EB',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        flex: '1 1 220px',
        minWidth: '200px',
      }}
      className={className}
    >
      {/* Decorative gradient accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* ─── Header Row ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        {/* Icon Badge */}
        {Icon && (
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `${color}12`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon style={{ width: '22px', height: '22px', color }} />
          </div>
        )}

        {/* Trend Badge */}
        {trend !== null && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.08 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              padding: '3px 8px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              background: trendDirection === 'up' ? '#DCFCE7' : trendDirection === 'down' ? '#FEE2E2' : '#F3F4F6',
              color: trendDirection === 'up' ? '#166534' : trendDirection === 'down' ? '#991B1B' : '#6B7280',
            }}
          >
            <TrendIcon size={13} />
            {trend > 0 ? '+' : ''}{typeof trend === 'number' ? `${trend.toFixed(1)}%` : trend}
          </motion.div>
        )}
      </div>

      {/* ─── Value Display ─────────────────────────────────────────── */}
      {loading ? (
        /* Skeleton Loading State */
        <div>
          <div style={{ width: '60%', height: '28px', borderRadius: '8px', background: '#F3F4F6', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
          <div style={{ width: '40%', height: '14px', borderRadius: '6px', background: '#F3F4F6', animation: 'pulse 1.5s infinite' }} />
        </div>
      ) : (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1F2937',
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.2,
              marginBottom: '4px',
            }}
          >
            {value}
          </motion.p>

          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500, lineHeight: 1.4 }}>
            {title}
          </p>

          {subtitle && (
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{subtitle}</p>
          )}
        </>
      )}

      {/* Pulse animation keyframes (injected once) */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </motion.div>
  );
};

export default DashboardWidget;
