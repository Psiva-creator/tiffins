/**
 * PagePlaceholder - Reusable empty-state / coming-soon component.
 * Used when a page has no data or is under construction.
 * Supports multiple use cases: orders, menu, analytics, customers, etc.
 *
 * Props:
 *   title         - Heading text
 *   description   - Descriptive paragraph text
 *   image         - Image URL or imported image (optional)
 *   icon          - Lucide icon component (used if no image provided)
 *   buttonText    - CTA button label (optional)
 *   onButtonClick - CTA button click handler (optional)
 *   variant       - Visual preset: 'default' | 'orders' | 'menu' | 'analytics' | 'customers'
 *   className     - Additional CSS classes
 */
import { motion } from 'framer-motion';
import {
  Construction,
  ShoppingBag,
  UtensilsCrossed,
  BarChart3,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// ─── Variant Presets ────────────────────────────────────────────────────────
const VARIANTS = {
  default: {
    icon: Construction,
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    pattern: '#FCD34D',
  },
  orders: {
    icon: ShoppingBag,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%)',
    pattern: '#60A5FA',
  },
  menu: {
    icon: UtensilsCrossed,
    color: '#D94841',
    gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)',
    pattern: '#F87171',
  },
  analytics: {
    icon: BarChart3,
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #ECFEFF 0%, #67E8F9 100%)',
    pattern: '#22D3EE',
  },
  customers: {
    icon: Users,
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #FCE7F3 0%, #F9A8D4 100%)',
    pattern: '#F472B6',
  },
};

const PagePlaceholder = ({
  title = 'Coming Soon',
  description = 'This page is currently under development. Check back soon for updates!',
  image = null,
  icon: CustomIcon = null,
  buttonText = null,
  onButtonClick = null,
  variant = 'default',
  className = '',
}) => {
  const preset = VARIANTS[variant] || VARIANTS.default;
  const DisplayIcon = CustomIcon || preset.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px 24px',
        textAlign: 'center',
      }}
      className={className}
    >
      {/* ─── Illustration Area ─────────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 200 }}
        style={{
          position: 'relative',
          marginBottom: '32px',
        }}
      >
        {image ? (
          /* Custom illustration image */
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: `0 20px 60px ${preset.color}20`,
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ) : (
          /* Icon-based illustration with animated decorative ring */
          <div style={{ position: 'relative' }}>
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                border: `2px dashed ${preset.color}30`,
                position: 'absolute',
                top: '-15px',
                left: '-15px',
              }}
            />

            {/* Main icon container */}
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '28px',
                background: preset.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 16px 48px ${preset.color}25`,
                position: 'relative',
              }}
            >
              <DisplayIcon
                style={{
                  width: '48px',
                  height: '48px',
                  color: preset.color,
                }}
              />

              {/* Sparkle accent */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                }}
              >
                <Sparkles size={20} style={{ color: preset.color }} />
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>

      {/* ─── Title ─────────────────────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{
          fontSize: 'clamp(24px, 5vw, 36px)',
          fontWeight: 700,
          color: '#1F2937',
          fontFamily: "'Poppins', sans-serif",
          marginBottom: '12px',
          lineHeight: 1.2,
          maxWidth: '500px',
        }}
      >
        {title}
      </motion.h1>

      {/* ─── Description ───────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          fontSize: '16px',
          color: '#6B7280',
          lineHeight: 1.6,
          maxWidth: '440px',
          marginBottom: '28px',
        }}
      >
        {description}
      </motion.p>

      {/* ─── CTA Button ────────────────────────────────────────────── */}
      {buttonText && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${preset.color}30` }}
          whileTap={{ scale: 0.97 }}
          onClick={onButtonClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            borderRadius: '12px',
            border: 'none',
            background: preset.color,
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.2s ease',
          }}
        >
          {buttonText}
          <ArrowRight size={18} />
        </motion.button>
      )}

      {/* ─── Status Pill ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '24px',
          background: `${preset.color}08`,
          border: `1px solid ${preset.color}20`,
          marginTop: buttonText ? '20px' : '0',
          fontSize: '13px',
          fontWeight: 500,
          color: '#6B7280',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: preset.color,
            animation: 'pulse-dot 2s infinite',
          }}
        />
        {variant === 'default' ? 'Under Development' : `${variant.charAt(0).toUpperCase() + variant.slice(1)} Module`}
      </motion.div>

      {/* Pulse animation for the status dot */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </motion.div>
  );
};

export default PagePlaceholder;
