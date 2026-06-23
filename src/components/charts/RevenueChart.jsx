/**
 * RevenueChart - Displays revenue data with Daily/Weekly/Monthly/Yearly views.
 * Shows revenue growth percentage and previous period comparison.
 * Uses SVG line chart with gradient area fill.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
  DAY_LABELS,
  WEEK_LABELS,
  MONTH_LABELS,
  generateLinePath,
  generateAreaPath,
  formatCurrency,
  formatPercent,
  calculateTrend,
} from './chartConfig';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_DATA = {
  daily: {
    current: [12000, 15400, 13800, 18200, 16500, 21000, 19500],
    previous: [10500, 13200, 12100, 15800, 14700, 17500, 16200],
    labels: DAY_LABELS,
  },
  weekly: {
    current: [82000, 97000, 88500, 105000],
    previous: [74000, 85000, 79500, 92000],
    labels: WEEK_LABELS,
  },
  monthly: {
    current: [145000, 162000, 158000, 181000, 177000, 198000, 215000, 205000, 228000, 242000, 235000, 261000],
    previous: [128000, 144000, 135000, 159000, 152000, 171000, 183000, 176000, 195000, 208000, 201000, 225000],
    labels: MONTH_LABELS,
  },
  yearly: {
    current: [1850000, 2120000, 2450000, 2780000],
    previous: [1620000, 1850000, 2100000, 2350000],
    labels: ['2022', '2023', '2024', '2025'],
  },
};

// ─── Chart SVG Dimensions ───────────────────────────────────────────────────
const SVG_WIDTH = 600;
const SVG_HEIGHT = 220;
const PAD = { top: 20, right: 20, bottom: 30, left: 55 };
const CHART_W = SVG_WIDTH - PAD.left - PAD.right;
const CHART_H = SVG_HEIGHT - PAD.top - PAD.bottom;

const RevenueChart = ({ className = '' }) => {
  const [period, setPeriod] = useState('monthly');

  const data = MOCK_DATA[period];
  const trend = calculateTrend(data.current);
  const totalCurrent = data.current.reduce((a, b) => a + b, 0);
  const totalPrevious = data.previous.reduce((a, b) => a + b, 0);
  const growthPct = totalPrevious ? ((totalCurrent - totalPrevious) / totalPrevious) * 100 : 0;

  // Compute paths
  const { lineCurrent, linePrevious, areaCurrent, dots, maxVal } = useMemo(() => {
    const allVals = [...data.current, ...data.previous];
    const max = Math.max(...allVals);
    const min = Math.min(...allVals) * 0.85;
    const range = max - min || 1;
    const stepX = CHART_W / (data.current.length - 1 || 1);

    const toY = (v) => PAD.top + CHART_H - ((v - min) / range) * CHART_H;
    const toX = (i) => PAD.left + i * stepX;

    const makePathStr = (arr) =>
      arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

    const currentPath = makePathStr(data.current);
    const previousPath = makePathStr(data.previous);

    // Area path for current
    const areaStr = `${currentPath} L ${toX(data.current.length - 1).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} L ${toX(0).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} Z`;

    const dotPoints = data.current.map((v, i) => ({ cx: toX(i), cy: toY(v), value: v }));

    return { lineCurrent: currentPath, linePrevious: previousPath, areaCurrent: areaStr, dots: dotPoints, maxVal: max };
  }, [data]);

  return (
    <ChartContainer
      title="Revenue Trends"
      subtitle="Revenue performance with period comparison"
      icon={DollarSign}
      accentColor={CHART_COLORS.revenue.primary}
      filters={{ daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly' }}
      activeFilter={period}
      onFilterChange={setPeriod}
      trend={trend}
      className={className}
    >
      {/* ─── KPI Summary ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <StatCard label="Current Period" value={formatCurrency(totalCurrent)} color={CHART_COLORS.revenue.primary} icon={DollarSign} />
        <StatCard label="Previous Period" value={formatCurrency(totalPrevious)} color="#6B7280" icon={DollarSign} />
        <StatCard
          label="Growth"
          value={formatPercent(growthPct)}
          color={growthPct >= 0 ? CHART_COLORS.revenue.primary : '#EF4444'}
          icon={growthPct >= 0 ? ArrowUpRight : ArrowDownRight}
        />
      </div>

      {/* ─── Line Chart ────────────────────────────────────────────── */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height="auto"
          style={{ display: 'block', minWidth: '320px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.revenue.primary} stopOpacity={0.25} />
              <stop offset="100%" stopColor={CHART_COLORS.revenue.primary} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <GridLines count={5} width={SVG_WIDTH - PAD.right} height={SVG_HEIGHT - PAD.bottom} padding={PAD.top} />

          {/* Y-Axis */}
          <YAxisLabels
            min={0}
            max={maxVal}
            count={5}
            height={SVG_HEIGHT - PAD.bottom}
            padding={PAD.top}
            formatter={(v) => formatCurrency(v).replace('₹', '')}
          />

          {/* Area fill */}
          <AnimatedAreaFill d={areaCurrent} fill="url(#revenueGrad)" opacity={1} />

          {/* Previous period line (dashed) */}
          <motion.path
            d={linePrevious}
            stroke="#D1D5DB"
            strokeWidth={2}
            fill="none"
            strokeDasharray="6 4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Current period line */}
          <AnimatedLinePath d={lineCurrent} stroke={CHART_COLORS.revenue.primary} strokeWidth={2.5} />

          {/* Data dots */}
          {dots.map((dot, i) => (
            <DataDot key={`${period}-${i}`} cx={dot.cx} cy={dot.cy} fill={CHART_COLORS.revenue.primary} index={i} />
          ))}

          {/* X-Axis */}
          <XAxisLabels labels={data.labels} width={SVG_WIDTH} height={SVG_HEIGHT} padding={PAD.left} />
        </svg>
      </div>

      <ChartLegend
        items={[
          { label: 'Current Period', color: CHART_COLORS.revenue.primary },
          { label: 'Previous Period', color: '#D1D5DB' },
        ]}
      />
    </ChartContainer>
  );
};

export default RevenueChart;
