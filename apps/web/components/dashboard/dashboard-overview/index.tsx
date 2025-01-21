import { MetricsCards } from './metrics-cards';
import { TrendChart } from './trend-chart';
import type { MetricsData, TrendData } from './types';

const mockData = {
  metrics: {
    totalSubscriptions: 1245,
    atRiskCount: 42,
    healthScore: 89
  },
  trendData: [
    { month: 'Jan', active: 1200, churn: 15 },
    { month: 'Feb', active: 1220, churn: 18 },
    { month: 'Mar', active: 1245, churn: 22 }
  ]
};

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscription Health Dashboard</h1>
        <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
      </div>

      <MetricsCards metrics={mockData.metrics} />
      <TrendChart data={mockData.trendData} />
    </div>
  );
}