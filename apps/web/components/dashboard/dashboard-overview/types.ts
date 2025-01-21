export interface MetricsData {
  totalSubscriptions: number;
  atRiskCount: number;
  healthScore: number;
}

export interface TrendData {
  month: string;
  active: number;
  churn: number;
}