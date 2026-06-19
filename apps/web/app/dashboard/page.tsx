'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api';

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  change?: { value: number; positive: boolean };
  icon: React.ElementType;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              {change && (
                <div className="flex items-center gap-1 text-xs">
                  {change.positive ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-error" />
                  )}
                  <span className={change.positive ? 'text-success' : 'text-error'}>
                    {change.value}%
                  </span>
                  <span className="text-muted-foreground">vs yesterday</span>
                </div>
              )}
            </div>
            <div className={`rounded-full p-3 ${color} bg-opacity-10`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiClient('/api/v1/dashboard/stats'),
  });

  const stats = data || {
    healthScore: 97,
    openIncidents: 3,
    errorRate: 1.2,
    uptime: 99.97,
  };

  if (isLoading) {
    return <div className="grid gap-4 md:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-20 bg-muted rounded" />
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time overview of your system health and performance.
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Zap className="h-3 w-3" />
          Live
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Health Score"
          value={stats.healthScore}
          icon={CheckCircle}
          color="text-brand"
        />
        <StatCard
          title="Open Incidents"
          value={stats.openIncidents}
          change={{ value: 2, positive: false }}
          icon={AlertTriangle}
          color="text-error"
        />
        <StatCard
          title="Error Rate"
          value={`${stats.errorRate}%`}
          change={{ value: 0.5, positive: true }}
          icon={Activity}
          color="text-warning"
        />
        <StatCard
          title="Uptime"
          value={`${stats.uptime}%`}
          icon={Clock}
          color="text-success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Error Rate Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {/* Chart implementation with Recharts */}
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Chart placeholder - Error rate over time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Slowest Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Chart placeholder - Endpoint latency
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}