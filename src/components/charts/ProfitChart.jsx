/**
 * ProfitChart - Displays Revenue, Expenses, and Net Profit.
 * Supports toggling between Line and Bar chart views.
 * Uses SVG rendering with animated transitions.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, BarChart3, LineChart } from 'lucide-react';
import ChartContainer from './ChartContainer';
import {
  AnimatedBar,
  AnimatedLinePath,
  GridLines,
  XAxisLabels,
  YAxisLabels,
  DataDot,
  StatCard,
  ChartLegend,
} from './SVGChartPrimitives';
import {
  CHART_COLORS,
  MONTH_LABELS,
  formatCurrency,
  calculateTrend,
} from './chartConfig';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const REVENUE =  [145000, 162000, 158000, 181000, 177000, 198000, 215000, 205000, 228000, 242000, 235000, 261000];
const EXPENSES = [98000, 105000, 112000, 118000, 109000, 125000, 132000, 128000, 138000, 145000, 140000, 155000];
const PROFIT = REVENUE.map((r, i) => r - EXPENSES[i]);

// ─── Chart SVG Dimensions ───────────────────────────────────────────────────
const SVG_WIDTH = 600;
const SVG_HEIGHT = 240;
const PAD = { top: 20, right: 20, bottom: 30, left: 55 };
const CHART_W = SVG_WIDTH - PAD.left - PAD.right;
const CHART_H = SVG_HEIGHT - PAD.top - PAD.bottom;

const ProfitChart = ({ className = '' }) => {
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'line'

  const totalRevenue = REVENUE.reduce((a, b) => a + b, 0);
  const totalExpenses = EXPENSES.reduce((a, b) => a + b, 0);
  const totalProfit = PROFIT.reduce((a, b) => a + b, 0);
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);
  const trend = calculateTrend(PROFIT);

  // Bar chart computations
  const allMax = Math.max(...REVENUE);
  const barGroupGap = 6;
  const barWidth = Math.min(14, (CHART_W - barGroupGap * (12 - 1)) / (12 * 3) - 2);
  const groupWidth = barWidth * 3 + 4;

  const getBarY = (val) => PAD.top + CHART_H - (val / allMax) * CHART_H;
  const getBarH = (val) => (val / allMax) * CHART_H;

  // Line chart paths
  const linePaths = useMemo(() => {
    const stepX = CHART_W / 11;
    const toY = (v) => PAD.top + CHART_H - (v / allMax) * CHART_H;
    const toX = (i) => PAD.left + i * stepX;

    const makePath = (arr) =>
      arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

    const makeDots = (arr, color) =>
      arr.map((v, i) => ({ cx: toX(i), cy: toY(v), color }));

    return {
      revenue: makePath(REVENUE),
      expenses: makePath(EXPENSES),
      profit: makePath(PROFIT),
      revenueDots: makeDots(REVENUE, CHART_COLORS.revenue.primary),
      expenseDots: makeDots(EXPENSES, '#EF4444'),
      profitDots: makeDots(PROFIT, CHART_COLORS.profit.primary),
    };
  }, [allMax]);

  // Toggle button for chart type
  const chartTypeToggle = (
    <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '8px', padding: '2px' }}>
      <button
        onClick={() => setChartType('bar')}
        style={{
          padding: '4px 10px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          background: chartType === 'bar' ? CHART_COLORS.profit.primary : 'transparent',
          color: chartType === 'bar' ? '#FFF' : '#6B7280',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        <BarChart3 size={14} /> Bar
      </button>
      <button
        onClick={() => setChartType('line')}
        style={{
          padding: '4px 10px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          background: chartType === 'line' ? CHART_COLORS.profit.primary : 'transparent',
          color: chartType === 'line' ? '#FFF' : '#6B7280',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        <LineChart size={14} /> Line
      </button>
    </div>
  );

  return (
    <ChartContainer
      title="Profit Analysis"
      subtitle="Revenue vs Expenses breakdown"
      icon={Wallet}
      accentColor={CHART_COLORS.profit.primary}
      trend={trend}
      headerRight={chartTypeToggle}
      className={className}
    >
      {/* ─── KPI Summary ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <StatCard label="Revenue" value={formatCurrency(totalRevenue)} color={CHART_COLORS.revenue.primary} icon={TrendingUp} />
        <StatCard label="Expenses" value={formatCurrency(totalExpenses)} color="#EF4444" icon={TrendingDown} />
        <StatCard label="Net Profit" value={formatCurrency(totalProfit)} color={CHART_COLORS.profit.primary} icon={Wallet} />
        <StatCard label="Margin" value={`${profitMargin}%`} color={CHART_COLORS.analytics.primary} />
      </div>

      {/* ─── Chart Area ────────────────────────────────────────────── */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height="auto"
          style={{ display: 'block', minWidth: '360px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid */}
          <GridLines count={5} width={SVG_WIDTH - PAD.right} height={SVG_HEIGHT - PAD.bottom} padding={PAD.top} />
          <YAxisLabels min={0} max={allMax} count={5} height={SVG_HEIGHT - PAD.bottom} padding={PAD.top} formatter={(v) => `${(v / 1000).toFixed(0)}K`} />

          {chartType === 'bar' ? (
            /* ── Bar Chart Mode ──────────────────────────────────── */
            <>
              {MONTH_LABELS.map((_, i) => {
                const groupX = PAD.left + (CHART_W / 12) * i + (CHART_W / 12 - groupWidth) / 2;
                return (
                  <g key={i}>
                    <AnimatedBar x={groupX} y={getBarY(REVENUE[i])} width={barWidth} height={getBarH(REVENUE[i])} fill={CHART_COLORS.revenue.primary} index={i} radius={3} />
                    <AnimatedBar x={groupX + barWidth + 2} y={getBarY(EXPENSES[i])} width={barWidth} height={getBarH(EXPENSES[i])} fill="#EF4444" index={i} radius={3} opacity={0.75} />
                    <AnimatedBar x={groupX + (barWidth + 2) * 2} y={getBarY(PROFIT[i])} width={barWidth} height={getBarH(PROFIT[i])} fill={CHART_COLORS.profit.primary} index={i} radius={3} opacity={0.85} />
                  </g>
                );
              })}
            </>
          ) : (
            /* ── Line Chart Mode ─────────────────────────────────── */
            <>
              <AnimatedLinePath d={linePaths.revenue} stroke={CHART_COLORS.revenue.primary} strokeWidth={2.5} />
              <AnimatedLinePath d={linePaths.expenses} stroke="#EF4444" strokeWidth={2} />
              <AnimatedLinePath d={linePaths.profit} stroke={CHART_COLORS.profit.primary} strokeWidth={2.5} />
              {linePaths.profitDots.map((dot, i) => (
                <DataDot key={i} cx={dot.cx} cy={dot.cy} fill={CHART_COLORS.profit.primary} r={3.5} index={i} />
              ))}
            </>
          )}

          {/* X-Axis Labels */}
          {MONTH_LABELS.map((label, i) => (
            <text
              key={i}
              x={PAD.left + (CHART_W / 12) * i + CHART_W / 24}
              y={SVG_HEIGHT - 4}
              textAnchor="middle"
              fontSize="10"
              fill="#9CA3AF"
              fontFamily="'Inter', sans-serif"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>

      <ChartLegend
        items={[
          { label: 'Revenue', color: CHART_COLORS.revenue.primary },
          { label: 'Expenses', color: '#EF4444' },
          { label: 'Net Profit', color: CHART_COLORS.profit.primary },
        ]}
      />
    </ChartContainer>
  );
};

export default ProfitChart;
