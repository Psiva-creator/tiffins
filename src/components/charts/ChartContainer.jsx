/**
 * ChartContainer - Shared wrapper component for all chart cards.
 * Provides consistent card styling, header with filter controls,
 * and animated entry for a unified look across all dashboards.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CHART_CONTAINER_STYLE, formatPercent } from './chartConfig';

const ChartContainer = ({
  title,
  subtitle,
  icon: Icon,
  accentColor = '#3B82F6',
  filters = null,
  activeFilter,
  onFilterChange,
  trend = null,
  headerRight = null,
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`border border-border overflow-hidden ${className}`}
      style={{
        ...CHART_CONTAINER_STYLE,
        height: 'auto',
        minHeight: CHART_CONTAINER_STYLE.height,
      }}
    >
      {/* ─── Chart Header ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {Icon && (
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${accentColor}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon style={{ width: '20px', height: '20px', color: accentColor }} />
            </div>
          )}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1F2937', fontFamily: "'Poppins', sans-serif", lineHeight: 1.3 }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{subtitle}</p>
            )}
          </div>
          {/* Trend Badge */}
          {trend !== null && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                background: trend >= 0 ? '#DCFCE7' : '#FEE2E2',
                color: trend >= 0 ? '#166534' : '#991B1B',
              }}
            >
              {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {formatPercent(trend)}
            </div>
          )}
        </div>

        {/* ─── Filter Pills / Custom Header Right ─────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {filters &&
            Object.entries(filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onFilterChange?.(key)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: activeFilter === key ? accentColor : '#F3F4F6',
                  color: activeFilter === key ? '#FFFFFF' : '#6B7280',
                }}
              >
                {typeof label === 'string' ? label : label.label || label}
              </button>
            ))}
          {headerRight}
        </div>
      </div>

      {/* ─── Chart Body ────────────────────────────────────────────── */}
      {children}
    </motion.div>
  );
};

export default ChartContainer;
