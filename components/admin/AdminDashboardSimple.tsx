"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Activity, 
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  Calendar,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Clock,
  Zap,
  Shield,
  Database,
  Server,
  Globe,
  RefreshCw,
  Home,
  LayoutDashboard
} from "lucide-react";
import UserManagement from "./UserManagement";
import ContentManagement from "./ContentManagement";
import AppAnalytics from "./AppAnalytics";
import FinancialAnalytics from "./FinancialAnalytics";

interface AdminData {
  metrics: {
    totalUsers: number;
    paidUsers: number;
    freeUsers: number;
    newUsers: number;
    totalRevenue: number;
    currentMonthRevenue: number;
    totalContent: number;
    recentContent: number;
  };
  financialSummary: {
    totalRevenue: number;
    currentMonthRevenue: number;
    averageRevenuePerUser: number;
    conversionRate: number;
    monthlyGrowthRate: number;
  };
  subscriptionGrowth: Array<{
    date: string;
    newUsers: number;
    paidUsers: number;
  }>;
  templateUsage: Array<{
    templateSlug: string;
    count: number;
  }>;
  recentActivities: Array<{
    email: string;
    templateSlug: string;
    createdAt: string;
    aiResponse: string;
  }>;
  topUsers: Array<{
    email: string;
    contentCount: number;
    lastActivity: string;
  }>;
  recentUsers: Array<{
    email: string;
    userName: string;
    active: boolean;
    plan: string;
    joinDate: string;
    paymentId: string;
  }>;
  systemHealth: {
    databaseStatus: string;
    lastDataUpdate: string;
    activeConnections: number;
    averageResponseTime: number;
  };
  timeframe: string;
  generatedAt: string;
}

export default function AdminDashboardSimple() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    fetchAdminData();
  }, []); // Only run once on mount

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching live admin data...');
      const response = await fetch('/api/admin/live-data');
      const result = await response.json();
      
      console.log('📊 Admin data response:', result);
      
      if (result.success) {
        console.log('✅ Admin data loaded successfully');
        console.log('📈 Metrics:', result.data.metrics);
        setData(result.data);
      } else {
        console.error('❌ Failed to fetch admin data:', result.error);
        console.error('🔍 Details:', result.details);
      }
    } catch (error) {
      console.error('💥 Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Failed to load admin data</h2>
          <Button onClick={fetchAdminData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'system', label: 'System', icon: Server },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Last updated: {formatDate(data.generatedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="outline" 
                size="sm"
              >
                <Home className="h-4 w-4 mr-2" />
                Landing
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard'} 
                variant="outline" 
                size="sm"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button onClick={fetchAdminData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.metrics.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{data.metrics.newUsers} new this period
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paid Users</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.metrics.paidUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    {data.financialSummary.conversionRate.toFixed(1)}% conversion rate
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(data.metrics.totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(data.metrics.currentMonthRevenue)} this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.metrics.totalContent}</div>
                  <p className="text-xs text-muted-foreground">
                    +{data.metrics.recentContent} this period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentActivities.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.email}</p>
                          <p className="text-xs text-gray-500">
                            Used {activity.templateSlug} template
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.topUsers.slice(0, 5).map((user, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            {user.contentCount} content items
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">
                          {formatDate(user.lastActivity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Section */}
        {activeSection === 'users' && <UserManagement />}

        {/* Content Section */}
        {activeSection === 'content' && <ContentManagement />}

        {/* Analytics Section */}
        {activeSection === 'analytics' && <AppAnalytics />}

        {/* Financial Section */}
        {activeSection === 'financial' && <FinancialAnalytics />}

        {/* System Section */}
        {activeSection === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4" />
                        <span>Database</span>
                      </div>
                      <Badge variant="default">{data.systemHealth.databaseStatus}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Server className="h-4 w-4" />
                        <span>Active Connections</span>
                      </div>
                      <span className="font-bold">{data.systemHealth.activeConnections}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Avg Response Time</span>
                      </div>
                      <span className="font-bold">{data.systemHealth.averageResponseTime}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>Last Update</span>
                      </div>
                      <span className="text-sm">{formatDate(data.systemHealth.lastDataUpdate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <Activity className="h-12 w-12 mr-2" />
                    System metrics chart would go here
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
