'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type TrendData } from './types';

interface TrendChartProps {
  data: TrendData[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Subscription Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="active" stroke="#2563eb" name="Active" />
            <Line type="monotone" dataKey="churn" stroke="#dc2626" name="Churn Risk" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};