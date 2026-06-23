/**
 * CustomerGrowthChart - Displays new customers, returning customers,
 * growth rate with Area and Line chart toggle.
 * Uses SVG area/line chart with animated paths.
 */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserCheck, TrendingUp, AreaChart, LineChart } from 'lucide-react';
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
  MONTH_LABELS,
  formatNumber,
  formatPercent,
  calculateTrend,
} from './chartConfig';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const NEW_CUSTOMERS = [120, 145, 132, 168, 155, 189, 201, 195, 218, 234, 226, 258];
const RETURNING = [85, 92, 98, 105, 110, 118, 125, 130, 138, 145, 150, 162];
const TOTAL = NEW_CUSTOMERS.map((n, i) => n + RETURNING[i]);

// ─── Chart Dimensions ───────────────────────────────────────────────────────
const SVG_WIDTH = 600;
const SVG_HEIGHT = 230;
const PAD = { top: 20, right: 20, bottom: 30, left: 50 };
const CHART_W = SVG_WIDTH - PAD.left - PAD.right;
const CHART_H = SVG_HEIGHT - PAD.top - PAD.bottom;

const CustomerGrowthChart = ({ className = '' }) => {
  const [chartType, setChartType] = useState('area'); // 'area' | 'line'

  const totalNew = NEW_CUSTOMERS.reduce((a, b) => a + b, 0);
  const totalReturning = RETURNING.reduce((a, b) => a + b, 0);
  const growthRate = calculateTrend(TOTAL);
  const totalAll = TOTAL.reduce((a, b) => a + b, 0);

  // Compute paths for all three series
  const { newPath, returningPath, totalPath, newArea, returningArea, newDots, returningDots, totalDots, maxVal } = useMemo(() => {
    const allVals = [...NEW_CUSTOMERS, ...RETURNING, ...TOTAL];
    const max = Math.max(...allVals);
    const min = 0;
    const range = max - min || 1;
    const stepX = CHART_W / (12 - 1);

    const toY = (v) => PAD.top + CHART_H - ((v - min) / range) * CHART_H;
    const toX = (i) => PAD.left + i * stepX;

    const makePath = (arr) =>
      arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

    const makeArea = (arr) => {
      const pathStr = makePath(arr);
      return `${pathStr} L ${toX(arr.length - 1).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} L ${toX(0).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} Z`;
    };

    const makeDots = (arr) => arr.map((v, i) => ({ cx: toX(i), cy: toY(v) }));

    return {
      newPath: makePath(NEW_CUSTOMERS),
      returningPath: makePath(RETURNING),
      totalPath: makePath(TOTAL),
      newArea: makeArea(NEW_CUSTOMERS),
      returningArea: makeArea(RETURNING),
      newDots: makeDots(NEW_CUSTOMERS),
      returningDots: makeDots(RETURNING),
      totalDots: makeDots(TOTAL),
      maxVal: max,
    };
  }, []);

  // Toggle button for chart type
  const chartTypeToggle = (
    <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '8px', padding: '2px' }}>
      <button
        onClick={() => setChartType('area')}
        style={{
          padding: '4px 10px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          background: chartType === 'area' ? CHART_COLORS.customers.primary : 'transparent',
          color: chartType === 'area' ? '#FFF' : '#6B7280',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        <AreaChart size={14} /> Area
      </button>
      <button
        onClick={() => setChartType('line')}
        style={{
          padding: '4px 10px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          background: chartType === 'line' ? CHART_COLORS.customers.primary : 'transparent',
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
      title="Customer Growth"
      subtitle="New vs returning customers over time"
      icon={Users}
      accentColor={CHART_COLORS.customers.primary}
      trend={growthRate}
      headerRight={chartTypeToggle}
      className={className}
    >
      {/* ─── KPI Summary ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <StatCard label="Total Customers" value={formatNumber(totalAll)} color={CHART_COLORS.customers.primary} icon={Users} />
        <StatCard label="New Customers" value={formatNumber(totalNew)} color={CHART_COLORS.sales.primary} icon={UserPlus} />
        <StatCard label="Returning" value={formatNumber(totalReturning)} color={CHART_COLORS.revenue.primary} icon={UserCheck} />
        <StatCard label="Growth Rate" value={formatPercent(growthRate)} color={CHART_COLORS.profit.primary} icon={TrendingUp} />
      </div>

      {/* ─── Chart Area ────────────────────────────────────────────── */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height="auto"
          style={{ display: 'block', minWidth: '340px' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="newCustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.sales.primary} stopOpacity={0.2} />
              <stop offset="100%" stopColor={CHART_COLORS.sales.primary} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="retCustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.revenue.primary} stopOpacity={0.2} />
              <stop offset="100%" stopColor={CHART_COLORS.revenue.primary} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <GridLines count={5} width={SVG_WIDTH - PAD.right} height={SVG_HEIGHT - PAD.bottom} padding={PAD.top} />
          <YAxisLabels min={0} max={maxVal} count={5} height={SVG_HEIGHT - PAD.bottom} padding={PAD.top} formatter={formatNumber} />

          {/* Area fills (only in area mode) */}
          {chartType === 'area' && (
            <>
              <AnimatedAreaFill d={newArea} fill="url(#newCustGrad)" opacity={1} />
              <AnimatedAreaFill d={returningArea} fill="url(#retCustGrad)" opacity={1} />
            </>
          )}

          {/* Lines */}
          <AnimatedLinePath d={totalPath} stroke={CHART_COLORS.customers.primary} strokeWidth={2} />
          <AnimatedLinePath d={newPath} stroke={CHART_COLORS.sales.primary} strokeWidth={2.5} />
          <AnimatedLinePath d={returningPath} stroke={CHART_COLORS.revenue.primary} strokeWidth={2} />

          {/* Dots */}
          {newDots.map((dot, i) => (
            <DataDot key={`new-${i}`} cx={dot.cx} cy={dot.cy} fill={CHART_COLORS.sales.primary} r={3} index={i} />
          ))}
          {returningDots.map((dot, i) => (
            <DataDot key={`ret-${i}`} cx={dot.cx} cy={dot.cy} fill={CHART_COLORS.revenue.primary} r={3} index={i} />
          ))}

          {/* X-Axis */}
          <XAxisLabels labels={MONTH_LABELS} width={SVG_WIDTH} height={SVG_HEIGHT} padding={PAD.left} />
        </svg>
      </div>

      <ChartLegend
        items={[
          { label: 'New Customers', color: CHART_COLORS.sales.primary },
          { label: 'Returning', color: CHART_COLORS.revenue.primary },
          { label: 'Total', color: CHART_COLORS.customers.primary },
        ]}
      />
    </ChartContainer>
  );
};

export default CustomerGrowthChart;
