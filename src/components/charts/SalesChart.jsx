/**
 * SalesChart - Displays sales data with Daily/Weekly/Monthly views.
 * Shows Total Orders, Total Sales, and Average Order Value as KPIs.
 * Uses SVG bar chart with animated bars and interactive filters.
 */
import { useState, useMemo } from 'react';
import { ShoppingCart, Package, DollarSign, BarChart3 } from 'lucide-react';
import ChartContainer from './ChartContainer';
import {
  AnimatedBar,
  GridLines,
  XAxisLabels,
  YAxisLabels,
  StatCard,
  ChartLegend,
} from './SVGChartPrimitives';
import {
  CHART_COLORS,
  PERIOD_FILTERS,
  DAY_LABELS,
  WEEK_LABELS,
  MONTH_LABELS,
  formatCurrency,
  formatNumber,
  calculateTrend,
} from './chartConfig';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_DATA = {
  daily: { sales: [3200, 4100, 3800, 5200, 4700, 6100, 5500], labels: DAY_LABELS },
  weekly: { sales: [22400, 28700, 25300, 31200], labels: WEEK_LABELS },
  monthly: {
    sales: [45000, 52000, 48000, 61000, 57000, 68000, 72000, 65000, 78000, 82000, 75000, 91000],
    labels: MONTH_LABELS,
  },
};

const SUMMARY = { totalOrders: 1284, totalSales: 682500, avgOrderValue: 531 };

// ─── Chart SVG Dimensions ───────────────────────────────────────────────────
const SVG_WIDTH = 600;
const SVG_HEIGHT = 220;
const PADDING = { top: 20, right: 20, bottom: 30, left: 55 };

const SalesChart = ({ className = '' }) => {
  const [period, setPeriod] = useState('daily');

  // Compute bar positions from active data
  const { bars, maxVal } = useMemo(() => {
    const { sales } = MOCK_DATA[period];
    const max = Math.max(...sales);
    const usableW = SVG_WIDTH - PADDING.left - PADDING.right;
    const usableH = SVG_HEIGHT - PADDING.top - PADDING.bottom;
    const gap = 8;
    const barW = Math.min(36, (usableW - gap * (sales.length - 1)) / sales.length);
    const totalBarsWidth = barW * sales.length + gap * (sales.length - 1);
    const offsetX = PADDING.left + (usableW - totalBarsWidth) / 2;

    const computed = sales.map((val, i) => {
      const h = (val / max) * usableH;
      return {
        x: offsetX + i * (barW + gap),
        y: PADDING.top + usableH - h,
        width: barW,
        height: h,
        value: val,
      };
    });
    return { bars: computed, maxVal: max };
  }, [period]);

  const trend = calculateTrend(MOCK_DATA[period].sales);

  return (
    <ChartContainer
      title="Sales Overview"
      subtitle="Track your daily, weekly & monthly sales"
      icon={ShoppingCart}
      accentColor={CHART_COLORS.sales.primary}
      filters={{ daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' }}
      activeFilter={period}
      onFilterChange={setPeriod}
      trend={trend}
      className={className}
    >
      {/* ─── KPI Summary Cards ─────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <StatCard label="Total Orders" value={formatNumber(SUMMARY.totalOrders)} color={CHART_COLORS.sales.primary} icon={Package} />
        <StatCard label="Total Sales" value={formatCurrency(SUMMARY.totalSales)} color={CHART_COLORS.revenue.primary} icon={DollarSign} />
        <StatCard label="Avg Order" value={formatCurrency(SUMMARY.avgOrderValue)} color={CHART_COLORS.profit.primary} icon={BarChart3} />
      </div>

      {/* ─── Bar Chart ─────────────────────────────────────────────── */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height="auto"
          style={{ display: 'block', minWidth: '320px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid */}
          <GridLines count={5} width={SVG_WIDTH} height={SVG_HEIGHT - PADDING.bottom} padding={PADDING.top} />

          {/* Y-Axis */}
          <YAxisLabels
            min={0}
            max={maxVal}
            count={5}
            height={SVG_HEIGHT - PADDING.bottom}
            padding={PADDING.top}
            formatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
          />

          {/* Bars */}
          {bars.map((bar, i) => (
            <AnimatedBar
              key={`${period}-${i}`}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={CHART_COLORS.sales.primary}
              radius={5}
              index={i}
              opacity={0.85}
            />
          ))}

          {/* Bar value labels */}
          {bars.map((bar, i) => (
            <text
              key={`label-${period}-${i}`}
              x={bar.x + bar.width / 2}
              y={bar.y - 6}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={CHART_COLORS.sales.primary}
            >
              {formatCurrency(bar.value)}
            </text>
          ))}

          {/* X-Axis Labels */}
          <XAxisLabels
            labels={MOCK_DATA[period].labels}
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            padding={PADDING.left}
          />
        </svg>
      </div>

      <ChartLegend items={[{ label: 'Sales Revenue', color: CHART_COLORS.sales.primary }]} />
    </ChartContainer>
  );
};

export default SalesChart;
