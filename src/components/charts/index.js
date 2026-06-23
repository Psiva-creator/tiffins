/**
 * Charts - Barrel export for all chart components.
 * Provides a single import point for the design system charts.
 */

// ─── Chart Components ───────────────────────────────────────────────────────
export { default as SalesChart } from './SalesChart';
export { default as RevenueChart } from './RevenueChart';
export { default as ProfitChart } from './ProfitChart';
export { default as InventoryChart } from './InventoryChart';
export { default as AnalyticsChart } from './AnalyticsChart';
export { default as CustomerGrowthChart } from './CustomerGrowthChart';

// ─── Shared Chart Infrastructure ────────────────────────────────────────────
export { default as ChartContainer } from './ChartContainer';
export * from './chartConfig';
export * from './SVGChartPrimitives';
