/**
 * AnalyticsChart - Displays Visitors, Orders, Conversions, and Revenue
 * with time period filters (7d, 30d, 90d, 1y).
 * Uses multi-line SVG chart with toggleable metric visibility.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, ShoppingBag, Percent, DollarSign } from 'lucide-react';
import ChartContainer from './ChartContainer';
import {
  AnimatedLinePath,
  AnimatedAreaFill,
  DataDot,
  GridLines,
  XAxisLabels,
  YAxisLabels,
  StatCard,
  ChartLegend,
} from './SVGChartPrimitives';
import {
  CHART_COLORS,
  TIME_FILTERS,
  formatNumber,
  formatCurrency,
  formatPercent,
  calculateTrend,
} from './chartConfig';

// ─── Metric Definitions ─────────────────────────────────────────────────────
const METRICS = {
  visitors: { label: 'Visitors', color: CHART_COLORS.analytics.primary, icon: Eye },
  orders: { label: 'Orders', color: CHART_COLORS.sales.primary, icon: ShoppingBag },
  conversions: { label: 'Conversions', color: CHART_COLORS.profit.primary, icon: Percent },
  revenue: { label: 'Revenue', color: CHART_COLORS.revenue.primary, icon: DollarSign },
};

// ─── Mock Data for each filter period ───────────────────────────────────────
const generatePeriodData = (count) => ({
  visitors: Array.from({ length: count }, () => Math.floor(Math.random() * 800) + 200),
  orders: Array.from({ length: count }, () => Math.floor(Math.random() * 120) + 30),
  conversions: Array.from({ length: count }, () => Math.floor(Math.random() * 15) + 3),
  revenue: Array.from({ length: count }, () => Math.floor(Math.random() * 45000) + 10000),
});

const MOCK_DATA = {
  '7d': { data: generatePeriodData(7), labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  '30d': { data: generatePeriodData(8), labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] },
  '90d': { data: generatePeriodData(6), labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'] },
  '1y': { data: generatePeriodData(12), labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
};

// ─── Chart Dimensions ───────────────────────────────────────────────────────
const SVG_WIDTH = 600;
const SVG_HEIGHT = 220;
const PAD = { top: 20, right: 20, bottom: 30, left: 55 };
const CHART_W = SVG_WIDTH - PAD.left - PAD.right;
const CHART_H = SVG_HEIGHT - PAD.top - PAD.bottom;

const AnalyticsChart = ({ className = '' }) => {
  const [period, setPeriod] = useState('7d');
  const [activeMetrics, setActiveMetrics] = useState(['visitors', 'orders']);

  const currentData = MOCK_DATA[period];

  // Toggle a metric on/off
  const toggleMetric = (key) => {
    setActiveMetrics((prev) =>
      prev.includes(key) ? (prev.length > 1 ? prev.filter((m) => m !== key) : prev) : [...prev, key]
    );
  };

  // Compute summary totals
  const summaries = useMemo(() => {
    const sums = {};
    Object.keys(METRICS).forEach((key) => {
      const arr = currentData.data[key];
      sums[key] = {
        total: arr.reduce((a, b) => a + b, 0),
        trend: calculateTrend(arr),
      };
    });
    return sums;
  }, [period]);

  // Compute SVG paths for all active metrics (normalized independently)
  const paths = useMemo(() => {
    const result = {};
    activeMetrics.forEach((key) => {
      const arr = currentData.data[key];
      const max = Math.max(...arr);
      const min = Math.min(...arr) * 0.8;
      const range = max - min || 1;
      const stepX = CHART_W / (arr.length - 1 || 1);

      const toY = (v) => PAD.top + CHART_H - ((v - min) / range) * CHART_H;
      const toX = (i) => PAD.left + i * stepX;

      const pathStr = arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');
      const areaStr = `${pathStr} L ${toX(arr.length - 1).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} L ${toX(0).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} Z`;
      const dots = arr.map((v, i) => ({ cx: toX(i), cy: toY(v) }));

      result[key] = { path: pathStr, area: areaStr, dots, max };
    });
    return result;
  }, [period, activeMetrics]);

  return (
    <ChartContainer
      title="Analytics Overview"
      subtitle="Visitors, orders, conversions & revenue"
      icon={Activity}
      accentColor={CHART_COLORS.analytics.primary}
      filters={Object.fromEntries(Object.entries(TIME_FILTERS).map(([k, v]) => [k, v.label]))}
      activeFilter={period}
      onFilterChange={setPeriod}
      className={className}
    >
      {/* ─── KPI Summary ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {Object.entries(METRICS).map(([key, meta]) => (
          <StatCard
            key={key}
            label={meta.label}
            value={key === 'revenue' ? formatCurrency(summaries[key].total) : formatNumber(summaries[key].total)}
            color={meta.color}
            icon={meta.icon}
          />
        ))}
      </div>

      {/* ─── Metric Toggle Chips ───────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {Object.entries(METRICS).map(([key, meta]) => {
          const isActive = activeMetrics.includes(key);
          return (
            <button
              key={key}
              onClick={() => toggleMetric(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '20px',
                border: `1.5px solid ${isActive ? meta.color : '#E5E7EB'}`,
                background: isActive ? `${meta.color}10` : '#FFFFFF',
                color: isActive ? meta.color : '#9CA3AF',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isActive ? meta.color : '#D1D5DB' }} />
              {meta.label}
            </button>
          );
        })}
      </div>

      {/* ─── Multi-Line Chart ──────────────────────────────────────── */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height="auto"
          style={{ display: 'block', minWidth: '320px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <GridLines count={5} width={SVG_WIDTH - PAD.right} height={SVG_HEIGHT - PAD.bottom} padding={PAD.top} />

          {/* Area fills first (below lines) */}
          {activeMetrics.map((key) => (
            <AnimatedAreaFill key={`area-${key}`} d={paths[key].area} fill={METRICS[key].color} opacity={0.08} />
          ))}

          {/* Lines */}
          {activeMetrics.map((key) => (
            <AnimatedLinePath key={`line-${key}`} d={paths[key].path} stroke={METRICS[key].color} strokeWidth={2.5} />
          ))}

          {/* Dots for the first active metric only (to avoid clutter) */}
          {activeMetrics.length === 1 &&
            paths[activeMetrics[0]].dots.map((dot, i) => (
              <DataDot key={i} cx={dot.cx} cy={dot.cy} fill={METRICS[activeMetrics[0]].color} index={i} r={3.5} />
            ))}

          {/* X-Axis */}
          <XAxisLabels labels={currentData.labels} width={SVG_WIDTH} height={SVG_HEIGHT} padding={PAD.left} />
        </svg>
      </div>

      <ChartLegend
        items={activeMetrics.map((key) => ({
          label: METRICS[key].label,
          color: METRICS[key].color,
        }))}
      />
    </ChartContainer>
  );
};

export default AnalyticsChart;
