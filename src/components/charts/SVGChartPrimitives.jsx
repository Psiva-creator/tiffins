/**
 * SVGChartPrimitives - Reusable SVG chart rendering primitives.
 * These are building blocks used by all chart components to render
 * bars, lines, areas, grid lines, and axis labels without any
 * external charting library dependency.
 */
import { motion } from 'framer-motion';

// ─── Animated Bar ───────────────────────────────────────────────────────────
export const AnimatedBar = ({
  x, y, width, height, fill, radius = 4, index = 0, opacity = 1, hoverFill,
}) => (
  <motion.rect
    x={x}
    y={y}
    width={width}
    rx={radius}
    ry={radius}
    fill={fill}
    opacity={opacity}
    initial={{ height: 0, y: y + height }}
    animate={{ height, y }}
    transition={{ duration: 0.6, delay: index * 0.04, ease: 'easeOut' }}
    style={{ cursor: 'pointer' }}
  >
    {hoverFill && <set attributeName="fill" to={hoverFill} begin="mouseover" end="mouseout" />}
  </motion.rect>
);

// ─── Animated Line Path ─────────────────────────────────────────────────────
export const AnimatedLinePath = ({ d, stroke, strokeWidth = 2.5, fill = 'none' }) => (
  <motion.path
    d={d}
    stroke={stroke}
    strokeWidth={strokeWidth}
    fill={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
  />
);

// ─── Animated Area Fill ─────────────────────────────────────────────────────
export const AnimatedAreaFill = ({ d, fill, opacity = 0.15 }) => (
  <motion.path
    d={d}
    fill={fill}
    opacity={opacity}
    stroke="none"
    initial={{ opacity: 0 }}
    animate={{ opacity }}
    transition={{ duration: 0.8, delay: 0.4 }}
  />
);

// ─── Data Point Dots ────────────────────────────────────────────────────────
export const DataDot = ({ cx, cy, fill, r = 4, index = 0 }) => (
  <motion.circle
    cx={cx}
    cy={cy}
    r={r}
    fill="#FFFFFF"
    stroke={fill}
    strokeWidth={2.5}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
    style={{ cursor: 'pointer' }}
  />
);

// ─── Grid Lines ─────────────────────────────────────────────────────────────
export const GridLines = ({ count = 5, width, height, padding = 0 }) => {
  const lines = [];
  const usableHeight = height - padding * 2;
  for (let i = 0; i <= count; i++) {
    const y = padding + (usableHeight / count) * i;
    lines.push(
      <line
        key={i}
        x1={padding}
        y1={y}
        x2={width - padding}
        y2={y}
        stroke="#F3F4F6"
        strokeWidth={1}
        strokeDasharray={i === count ? '0' : '4 4'}
      />
    );
  }
  return <g>{lines}</g>;
};

// ─── X-Axis Labels ──────────────────────────────────────────────────────────
export const XAxisLabels = ({ labels, width, height, padding = 0 }) => {
  if (!labels || labels.length === 0) return null;
  const usableWidth = width - padding * 2;
  const step = usableWidth / (labels.length - 1 || 1);

  return (
    <g>
      {labels.map((label, i) => (
        <text
          key={i}
          x={padding + i * step}
          y={height - 4}
          textAnchor="middle"
          fontSize="11"
          fill="#9CA3AF"
          fontFamily="'Inter', sans-serif"
        >
          {label}
        </text>
      ))}
    </g>
  );
};

// ─── Y-Axis Labels ──────────────────────────────────────────────────────────
export const YAxisLabels = ({ min, max, count = 5, height, padding = 0, formatter = (v) => v }) => {
  const labels = [];
  const usableHeight = height - padding * 2;
  const range = max - min || 1;

  for (let i = 0; i <= count; i++) {
    const value = max - (range / count) * i;
    const y = padding + (usableHeight / count) * i;
    labels.push(
      <text
        key={i}
        x={padding - 8}
        y={y + 4}
        textAnchor="end"
        fontSize="11"
        fill="#9CA3AF"
        fontFamily="'Inter', sans-serif"
      >
        {formatter(Math.round(value))}
      </text>
    );
  }
  return <g>{labels}</g>;
};

// ─── Legend Item ─────────────────────────────────────────────────────────────
export const ChartLegend = ({ items }) => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px', justifyContent: 'center' }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6B7280' }}>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: item.shape === 'line' ? '2px' : '50%',
            background: item.color,
            display: 'inline-block',
          }}
        />
        {item.label}
      </div>
    ))}
  </div>
);

// ─── Stat Card (mini KPI inside chart components) ───────────────────────────
export const StatCard = ({ label, value, color, icon: Icon }) => (
  <div
    style={{
      flex: '1 1 0',
      minWidth: '100px',
      padding: '12px 14px',
      borderRadius: '10px',
      background: `${color}08`,
      border: `1px solid ${color}20`,
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
      {Icon && <Icon size={14} style={{ color }} />}
      <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>{label}</span>
    </div>
    <span style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937', fontFamily: "'Poppins', sans-serif" }}>
      {value}
    </span>
  </div>
);

// ─── Tooltip (simple static tooltip for chart points) ───────────────────────
export const ChartTooltip = ({ x, y, label, value, color, visible }) => {
  if (!visible) return null;
  return (
    <g>
      <rect
        x={x - 40}
        y={y - 38}
        width={80}
        height={28}
        rx={6}
        fill="#1F2937"
        opacity={0.9}
      />
      <text x={x} y={y - 20} textAnchor="middle" fontSize="11" fontWeight="600" fill="#FFFFFF">
        {value}
      </text>
    </g>
  );
};
