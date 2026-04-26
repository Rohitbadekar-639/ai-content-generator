"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  Calendar,
  Mail,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Users,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  Globe,
  Target,
  Layers,
  Database,
  Cpu,
  HardDrive
} from "lucide-react";

interface ContentItem {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
  userActive?: boolean;
  userPlan?: string;
}

interface ContentStats {
  totalContent: number;
  uniqueUsers: number;
  totalTemplates: number;
  avgContentPerUser: number;
  mostActiveUser: string;
  mostUsedTemplate: string;
}

interface TemplateUsage {
  templateSlug: string;
  count: number;
  uniqueUsers: number;
}

interface UserActivity {
  email: string;
  contentCount: number;
  lastActivity: string;
}

export default function ContentManagement() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [templateUsage, setTemplateUsage] = useState<TemplateUsage[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [templateFilter, setTemplateFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    fetchContentData();
  }, [searchTerm, templateFilter, userFilter, page]);

  const fetchContentData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/live-data');
      const result = await response.json();
      
      if (result.success) {
        const contentData = result.data.allContent || [];
        const templateData = result.data.templateUsage || [];
        const userData = result.data.topUsers || [];
        
        setAllContent(contentData);
        setTemplateUsage(templateData);
        setUserActivity(userData);
        
        // Calculate stats
        const uniqueUsers = new Set(contentData.map(c => c.createdBy)).size;
        const uniqueTemplates = new Set(contentData.map(c => c.templateSlug)).size;
        const avgContentPerUser = uniqueUsers > 0 ? contentData.length / uniqueUsers : 0;
        
        const mostActiveUser = userData.length > 0 ? userData[0].email : 'N/A';
        const mostUsedTemplate = templateData.length > 0 ? templateData[0].templateSlug : 'N/A';
        
        setStats({
          totalContent: contentData.length,
          uniqueUsers,
          totalTemplates: uniqueTemplates,
          avgContentPerUser,
          mostActiveUser,
          mostUsedTemplate
        });
        
        // Apply filters
        let filteredContent = contentData;
        
        if (searchTerm) {
          filteredContent = filteredContent.filter(item => 
            item.aiResponse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.templateSlug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.createdBy?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (templateFilter) {
          filteredContent = filteredContent.filter(item => item.templateSlug === templateFilter);
        }
        
        if (userFilter) {
          filteredContent = filteredContent.filter(item => item.createdBy === userFilter);
        }
        
        setContent(filteredContent);
      } else {
        console.error('Failed to fetch content data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching content data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentDelete = async (contentId: number) => {
    if (!confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/content?id=${contentId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchContentData(); // Refresh content
      } else {
        console.error('Failed to delete content:', result.error);
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
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

  const getTemplateName = (slug: string) => {
    return slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';
  };

  const totalPages = Math.ceil(content.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContent = content.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContent}</div>
              <p className="text-xs text-muted-foreground">Generated items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
              <p className="text-xs text-muted-foreground">Content creators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Templates Used</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTemplates}</div>
              <p className="text-xs text-muted-foreground">Different types</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg per User</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgContentPerUser.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Content items</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Template Usage Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Template Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templateUsage.slice(0, 8).map((template, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{getTemplateName(template.templateSlug)}</p>
                      <p className="text-sm text-gray-500">
                        {template.count} uses by {template.uniqueUsers} users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{template.count}</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (template.count / Math.max(...templateUsage.map(t => t.count))) * 100)}%` }}
                      />
                    </div>
                  </div>
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
            <div className="space-y-3">
              {userActivity.slice(0, 8).map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Last active: {formatDate(user.lastActivity)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.contentCount}</p>
                    <p className="text-xs text-gray-500">items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Content Management</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={fetchContentData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Templates</option>
                {templateUsage.map((template, index) => (
                  <option key={index} value={template.templateSlug}>
                    {getTemplateName(template.templateSlug)} ({template.count})
                  </option>
                ))}
              </select>
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All Users</option>
                {userActivity.slice(0, 20).map((user, index) => (
                  <option key={index} value={user.email}>
                    {user.email} ({user.contentCount})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Content Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-900">Content</th>
                    <th className="text-left p-4 font-medium text-gray-900">Template</th>
                    <th className="text-left p-4 font-medium text-gray-900">User</th>
                    <th className="text-left p-4 font-medium text-gray-900">Created</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-500 mt-2">Loading content...</p>
                      </td>
                    </tr>
                  ) : currentContent.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8">
                        <div className="text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-2" />
                          <p>No content found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentContent.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="max-w-xs">
                            <p className="text-sm font-medium line-clamp-2">
                              {item.aiResponse?.substring(0, 100) || 'No content'}...
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">
                            {getTemplateName(item.templateSlug)}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium">{item.createdBy}</p>
                            {item.userPlan && (
                              <Badge 
                                variant={item.userPlan === 'Professional' ? "default" : "secondary"}
                                className="text-xs mt-1"
                              >
                                {item.userPlan}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p>{formatDate(item.createdAt)}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleContentDelete(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, content.length)} of {content.length} items
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
