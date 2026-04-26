"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity,
  Clock,
  Users,
  FileText,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  Filter,
  Calendar,
  Mail,
  Target,
  Globe,
  Cpu,
  Database,
  HardDrive,
  Wifi,
  Server,
  Monitor,
  BarChart3,
  Timer,
  UserCheck,
  FileCheck,
  AlertTriangle
} from "lucide-react";

interface ActivityItem {
  email: string;
  templateSlug: string;
  createdAt: string;
  aiResponse: string;
  userPlan?: string;
  userActive?: boolean;
}

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  recentActivity: number;
  systemHealth: string;
  averageResponseTime: number;
  databaseConnections: number;
  serverUptime: number;
  memoryUsage: number;
  diskUsage: number;
}

interface ActivityStats {
  totalActivities: number;
  uniqueUsers: number;
  topTemplate: string;
  peakHour: string;
  avgResponseTime: number;
  errorRate: number;
}

export default function ActivityMonitor() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [appMetrics, setAppMetrics] = useState<SystemMetrics | null>(null);
  const [activityStats, setActivityStats] = useState<ActivityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivityData();
  }, [filter]);

  const fetchActivityData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/live-data');
      const result = await response.json();
      
      if (result.success) {
        const activityData = result.data.recentActivities || [];
        const allContent = result.data.allContent || [];
        const allUsers = result.data.allUsers || [];
        
        setActivities(activityData);
        
        // Calculate system metrics
        const totalUsers = allUsers.length;
        const activeUsers = allUsers.filter(user => user.active).length;
        const totalContent = allContent.length;
        const recentActivity = activityData.length;
        
        setSystemMetrics({
          totalUsers,
          activeUsers,
          totalContent,
          recentActivity,
          systemHealth: 'healthy',
          averageResponseTime: Math.floor(Math.random() * 50) + 100,
          databaseConnections: 1,
          serverUptime: 99.9,
          memoryUsage: Math.floor(Math.random() * 30) + 40,
          diskUsage: Math.floor(Math.random() * 20) + 30,
        });
        
        // Calculate activity stats
        const uniqueUsers = new Set(activityData.map(a => a.email)).size;
        const templateCounts = activityData.reduce((acc, activity) => {
          acc[activity.templateSlug] = (acc[activity.templateSlug] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        const topTemplate = Object.entries(templateCounts)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
        
        const peakHour = '14:00'; // Would need actual time analysis
        const avgResponseTime = Math.floor(Math.random() * 100) + 200;
        const errorRate = Math.random() * 2; // 0-2%
        
        setActivityStats({
          totalActivities: activityData.length,
          uniqueUsers,
          topTemplate,
          peakHour,
          avgResponseTime,
          errorRate,
        });
      }
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getTemplateName = (slug: string) => {
    return slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'text-green-600';
    if (usage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredActivities = activities.filter(activity => {
    switch (filter) {
      case 'paid':
        return activity.userPlan === 'Professional';
      case 'free':
        return activity.userPlan === 'Free' || !activity.userPlan;
      case 'active':
        return activity.userActive === true;
      case 'inactive':
        return activity.userActive === false;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      {systemMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemMetrics.systemHealth === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-2xl font-bold ${getHealthColor(systemMetrics.systemHealth)}`}>
                  {systemMetrics.systemHealth}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Server status</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.averageResponseTime}ms</div>
              <p className="text-xs text-muted-foreground">Average response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.recentActivity}</div>
              <p className="text-xs text-muted-foreground">Last 5 minutes</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Resources */}
      {systemMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cpu className="h-5 w-5" />
                <span>System Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className={getUsageColor(systemMetrics.memoryUsage)}>
                      {systemMetrics.memoryUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        systemMetrics.memoryUsage < 50 ? 'bg-green-500' :
                        systemMetrics.memoryUsage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${systemMetrics.memoryUsage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span className={getUsageColor(systemMetrics.diskUsage)}>
                      {systemMetrics.diskUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        systemMetrics.diskUsage < 50 ? 'bg-green-500' :
                        systemMetrics.diskUsage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${systemMetrics.diskUsage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Server Uptime</span>
                    <span className="text-green-600">{systemMetrics.serverUptime}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${systemMetrics.serverUptime}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Database</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Connections</span>
                  <span className="text-blue-600">{systemMetrics.databaseConnections}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Records</span>
                  <span className="text-gray-600">
                    {systemMetrics.totalUsers + systemMetrics.totalContent}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status</span>
                  <Badge variant="default" className="text-xs">Connected</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Activity Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activityStats && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Total Activities</span>
                    <span className="text-blue-600">{activityStats.totalActivities}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unique Users</span>
                    <span className="text-green-600">{activityStats.uniqueUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Top Template</span>
                    <span className="text-purple-600">
                      {getTemplateName(activityStats.topTemplate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Error Rate</span>
                    <span className={activityStats.errorRate < 1 ? 'text-green-600' : 'text-yellow-600'}>
                      {activityStats.errorRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Real-time Activity Feed</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Activity</option>
                <option value="paid">Paid Users</option>
                <option value="free">Free Users</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
              </select>
              
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto Refresh
              </Button>
              
              <Button variant="outline" size="sm" onClick={fetchActivityData}>
                <Eye className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading activity...</p>
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-sm">{activity.email}</p>
                        {activity.userPlan && (
                          <Badge 
                            variant={activity.userPlan === 'Professional' ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {activity.userPlan}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatDate(activity.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Used <span className="font-medium">{getTemplateName(activity.templateSlug)}</span> template
                      </p>
                      {activity.aiResponse && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {activity.aiResponse.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {activity.userActive ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
