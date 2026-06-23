/**
 * Centralized Chart Configuration
 * Shared styling, colors, and utilities for all chart components
 * in the restaurant management design system.
 */

// ─── Chart Color Palette ────────────────────────────────────────────────────
export const CHART_COLORS = {
  revenue: { primary: '#22C55E', light: '#DCFCE7', gradient: 'rgba(34, 197, 94, 0.15)' },
  sales: { primary: '#3B82F6', light: '#DBEAFE', gradient: 'rgba(59, 130, 246, 0.15)' },
  profit: { primary: '#A855F7', light: '#F3E8FF', gradient: 'rgba(168, 85, 247, 0.15)' },
  inventory: { primary: '#F97316', light: '#FFF7ED', gradient: 'rgba(249, 115, 22, 0.15)' },
  analytics: { primary: '#06B6D4', light: '#ECFEFF', gradient: 'rgba(6, 182, 212, 0.15)' },
  customers: { primary: '#EC4899', light: '#FCE7F3', gradient: 'rgba(236, 72, 153, 0.15)' },
};

// ─── Shared Chart Dimensions ────────────────────────────────────────────────
export const CHART_DIMENSIONS = {
  height: 350,
  borderRadius: 12,
  padding: 20,
  background: '#FFFFFF',
};

// ─── Shared Chart Styles (inline styles for the chart container) ────────────
export const CHART_CONTAINER_STYLE = {
  height: `${CHART_DIMENSIONS.height}px`,
  borderRadius: `${CHART_DIMENSIONS.borderRadius}px`,
  padding: `${CHART_DIMENSIONS.padding}px`,
  background: CHART_DIMENSIONS.background,
};

// ─── Status Badge Colors ────────────────────────────────────────────────────
export const STATUS_COLORS = {
  success: { bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' },
  warning: { bg: '#FEF9C3', text: '#854D0E', border: '#FDE68A' },
  danger: { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
  info: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
  neutral: { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' },
};

// ─── Time Period Filters ────────────────────────────────────────────────────
export const TIME_FILTERS = {
  '7d': { label: '7 Days', days: 7 },
  '30d': { label: '30 Days', days: 30 },
  '90d': { label: '90 Days', days: 90 },
  '1y': { label: '1 Year', days: 365 },
};

export const PERIOD_FILTERS = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

// ─── Chart Type Options ─────────────────────────────────────────────────────
export const CHART_TYPES = {
  line: 'Line',
  bar: 'Bar',
  area: 'Area',
};

// ─── Utility: Generate SVG path from data points ───────────────────────────
export const generateLinePath = (points, width, height, padding = 0) => {
  if (!points || points.length === 0) return '';
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);
  const range = maxVal - minVal || 1;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;
  const stepX = usableWidth / (points.length - 1);

  return points
    .map((val, i) => {
      const x = padding + i * stepX;
      const y = padding + usableHeight - ((val - minVal) / range) * usableHeight;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
};

// ─── Utility: Generate SVG area path (closed path for fill) ────────────────
export const generateAreaPath = (points, width, height, padding = 0) => {
  if (!points || points.length === 0) return '';
  const linePath = generateLinePath(points, width, height, padding);
  const usableWidth = width - padding * 2;
  const bottomY = height - padding;
  const startX = padding;
  const endX = padding + usableWidth;

  return `${linePath} L ${endX.toFixed(1)} ${bottomY} L ${startX.toFixed(1)} ${bottomY} Z`;
};

// ─── Utility: Format numbers for display ────────────────────────────────────
export const formatCurrency = (value) => {
  if (value >= 1_000_000) return `₹${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value}`;
};

export const formatNumber = (value) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
};

export const formatPercent = (value) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

// ─── Utility: Generate mock data for demos ──────────────────────────────────
export const generateMockData = (count, min, max) => {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// ─── Utility: Calculate trend from data points ─────────────────────────────
export const calculateTrend = (data) => {
  if (!data || data.length < 2) return 0;
  const recent = data.slice(-Math.ceil(data.length / 2));
  const older = data.slice(0, Math.floor(data.length / 2));
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
  return olderAvg === 0 ? 0 : ((recentAvg - olderAvg) / olderAvg) * 100;
};

// ─── Day/Month Labels ───────────────────────────────────────────────────────
export const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const WEEK_LABELS = ['W1', 'W2', 'W3', 'W4'];
