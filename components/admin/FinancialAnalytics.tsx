"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  Calendar,
  RefreshCw,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  Filter,
  Eye,
  Receipt,
  Wallet,
  PiggyBank,
  Banknote,
  Calculator,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface FinancialMetrics {
  totalRevenue: number;
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  todayRevenue: number;
  averageRevenuePerUser: number;
  monthlyRecurringRevenue: number;
  annualRevenue: number;
  revenueGrowthRate: number;
  churnRate: number;
  customerLifetimeValue: number;
  averageOrderValue: number;
  refundRate: number;
  netProfit: number;
}

interface RevenueBreakdown {
  category: string;
  amount: number;
  percentage: number;
  growth: number;
  count: number;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  newCustomers: number;
  churnedCustomers: number;
  profit: number;
}

interface TopPayingCustomers {
  email: string;
  totalSpent: number;
  plan: string;
  joinDate: string;
  lastPayment: string;
  contentGenerated: number;
}

export default function FinancialAnalytics() {
  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics | null>(null);
  const [revenueBreakdown, setRevenueBreakdown] = useState<RevenueBreakdown[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopPayingCustomers[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6m');

  useEffect(() => {
    fetchFinancialData();
  }, [timeRange]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/live-data');
      const result = await response.json();
      
      if (result.success) {
        const data = result.data;
        const allUsers = data.allUsers || [];
        const paidUsers = allUsers.filter(user => user.active && user.plan === 'Professional');
        
        // Calculate financial metrics
        const totalRevenue = paidUsers.length * 99;
        const currentMonthRevenue = paidUsers.length * 99; // Simplified
        const lastMonthRevenue = Math.max(0, paidUsers.length * 99 - 99); // Mock growth
        const todayRevenue = paidUsers.length > 0 ? 99 : 0; // Today's revenue based on activity
        const averageRevenuePerUser = paidUsers.length > 0 ? totalRevenue / paidUsers.length : 0;
        const monthlyRecurringRevenue = currentMonthRevenue;
        const annualRevenue = currentMonthRevenue * 12;
        const revenueGrowthRate = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;
        const churnRate = paidUsers.length > 0 ? 5.2 : 0; // Mock churn rate
        const customerLifetimeValue = averageRevenuePerUser * 12; // Simplified
        const averageOrderValue = 99; // Single plan price
        const refundRate = 2.1; // Mock refund rate
        const netProfit = currentMonthRevenue * 0.85; // 85% profit margin
        
        setFinancialMetrics({
          totalRevenue,
          currentMonthRevenue,
          lastMonthRevenue,
          todayRevenue,
          averageRevenuePerUser,
          monthlyRecurringRevenue,
          annualRevenue,
          revenueGrowthRate,
          churnRate,
          customerLifetimeValue,
          averageOrderValue,
          refundRate,
          netProfit
        });
        
        // Revenue breakdown
        const breakdown: RevenueBreakdown[] = [
          {
            category: 'Professional Plan',
            amount: currentMonthRevenue,
            percentage: 100,
            growth: revenueGrowthRate,
            count: paidUsers.length
          },
          {
            category: 'Add-ons',
            amount: 0,
            percentage: 0,
            growth: 0,
            count: 0
          },
          {
            category: 'Enterprise',
            amount: 0,
            percentage: 0,
            growth: 0,
            count: 0
          }
        ];
        setRevenueBreakdown(breakdown);
        
        // Generate monthly revenue data
        const monthlyData: MonthlyRevenue[] = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const monthRevenue = Math.max(99, paidUsers.length * 99 - (i * 99)); // Decreasing growth
          monthlyData.push({
            month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            revenue: monthRevenue,
            newCustomers: Math.max(1, Math.floor(paidUsers.length / 6)),
            churnedCustomers: Math.max(0, Math.floor(paidUsers.length * 0.05)),
            profit: monthRevenue * 0.85
          });
        }
        setMonthlyRevenue(monthlyData);
        
        // Top paying customers
        const customers: TopPayingCustomers[] = paidUsers.slice(0, 10).map(user => ({
          email: user.email,
          totalSpent: 99,
          plan: user.plan,
          joinDate: user.joinDate,
          lastPayment: new Date().toISOString(),
          contentGenerated: 15 // Fixed content generated per customer
        }));
        setTopCustomers(customers);
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
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
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGrowthIcon = (rate: number) => {
    if (rate > 0) return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (rate < 0) return <ArrowDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getGrowthColor = (rate: number) => {
    if (rate > 0) return 'text-green-600';
    if (rate < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusColor = (rate: number, threshold: number, inverse = false) => {
    if (inverse) {
      if (rate < threshold) return 'text-green-600';
      if (rate > threshold * 2) return 'text-red-600';
      return 'text-yellow-600';
    }
    if (rate > threshold) return 'text-green-600';
    if (rate < threshold / 2) return 'text-red-600';
    return 'text-yellow-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Financial Metrics */}
      {financialMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialMetrics.totalRevenue)}</div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(financialMetrics.revenueGrowthRate)}
                <span className={`text-xs ${getGrowthColor(financialMetrics.revenueGrowthRate)}`}>
                  {financialMetrics.revenueGrowthRate.toFixed(1)}% growth
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialMetrics.currentMonthRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                MRR: {formatCurrency(financialMetrics.monthlyRecurringRevenue)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Revenue/User</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialMetrics.averageRevenuePerUser)}</div>
              <p className="text-xs text-muted-foreground">
                LTV: {formatCurrency(financialMetrics.customerLifetimeValue)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialMetrics.netProfit)}</div>
              <p className="text-xs text-muted-foreground">
                {((financialMetrics.netProfit / financialMetrics.currentMonthRevenue) * 100).toFixed(1)}% margin
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revenue Breakdown & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Revenue Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-gray-500">
                        {item.count} customers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {getGrowthIcon(item.growth)}
                      <span className={`font-bold ${getGrowthColor(item.growth)}`}>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Key Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Churn Rate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`font-bold ${getStatusColor(financialMetrics?.churnRate || 0, 5, true)}`}>
                    {financialMetrics?.churnRate.toFixed(1)}%
                  </span>
                  {financialMetrics && financialMetrics.churnRate < 5 && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <span>AOV</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-green-600">
                    {formatCurrency(financialMetrics?.averageOrderValue || 0)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-4 w-4 text-yellow-600" />
                  <span>Refund Rate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`font-bold ${getStatusColor(financialMetrics?.refundRate || 0, 3, true)}`}>
                    {financialMetrics?.refundRate.toFixed(1)}%
                  </span>
                  {financialMetrics && financialMetrics.refundRate < 3 && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span>Annual Revenue</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-purple-600">
                    {formatCurrency(financialMetrics?.annualRevenue || 0)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Trend */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5" />
              <span>Revenue Trend</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="3m">Last 3 months</option>
                <option value="6m">Last 6 months</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline" size="sm" onClick={fetchFinancialData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart visualization placeholder */}
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border">
              <div className="text-center">
                <LineChart className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">Revenue trend chart would be displayed here</p>
                <p className="text-xs text-gray-400">Showing monthly revenue, new customers, and profit trends</p>
              </div>
            </div>
            
            {/* Monthly revenue table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-900">Month</th>
                    <th className="text-left p-4 font-medium text-gray-900">Revenue</th>
                    <th className="text-left p-4 font-medium text-gray-900">New Customers</th>
                    <th className="text-left p-4 font-medium text-gray-900">Churned</th>
                    <th className="text-left p-4 font-medium text-gray-900">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRevenue.map((month, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">{month.month}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{formatCurrency(month.revenue)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{month.newCustomers}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <TrendingDown className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-600">{month.churnedCustomers}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <PiggyBank className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">{formatCurrency(month.profit)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Paying Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Banknote className="h-5 w-5" />
            <span>Top Paying Customers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{customer.plan}</Badge>
                      <span className="text-xs text-gray-500">
                        Joined: {formatDate(customer.joinDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{formatCurrency(customer.totalSpent)}</span>
                    <Badge variant="outline" className="text-xs">
                      {customer.contentGenerated} items
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Last payment: {formatDate(customer.lastPayment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
