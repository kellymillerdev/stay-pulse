import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle, Activity } from 'lucide-react';
import { type MetricsData } from './types';

interface MetricsCardsProps {
  metrics: MetricsData;
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalSubscriptions}</div>
          <p className="text-xs text-gray-500">Active subscribers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">At Risk</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.atRiskCount}</div>
          <p className="text-xs text-gray-500">Subscribers needing attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          <Activity className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.healthScore}%</div>
          <p className="text-xs text-gray-500">Overall portfolio health</p>
        </CardContent>
      </Card>
    </div>
  );
};