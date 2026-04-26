"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  Calendar,
  Shield,
  Crown,
  RefreshCw,
  UserPlus,
  Settings
} from "lucide-react";

interface User {
  email: string;
  userName: string;
  active: boolean;
  plan: string;
  joinDate: string;
  paymentId?: string;
  contentCount?: number;
  lastActivity?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  paidUsers: number;
  adminUsers: number;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filter, page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
        search: searchTerm,
        filter: filter
      });
      
      const response = await fetch(`/api/admin/users?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data.users);
        setStats(result.data.stats);
        setTotalPages(result.data.pagination.totalPages);
      } else {
        console.error('Failed to fetch users:', result.error);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async (userEmail: string, updates: Partial<User>) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          ...updates
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchUsers(); // Refresh user list
        setShowEditModal(false);
        setSelectedUser(null);
      } else {
        console.error('Failed to update user:', result.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUserDelete = async (userEmail: string) => {
    if (!confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users?email=${userEmail}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        await fetchUsers(); // Refresh user list
      } else {
        console.error('Failed to delete user:', result.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'active':
        return matchesSearch && user.active;
      case 'inactive':
        return matchesSearch && !user.active;
      case 'paid':
        return matchesSearch && user.active && user.plan === 'Professional';
      case 'free':
        return matchesSearch && (!user.active || user.plan === 'Free');
      default:
        return matchesSearch;
    }
  });

  const isAdmin = (email: string) => email === 'rohitbadekar555@gmail.com';

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Users</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.paidUsers}</div>
              <p className="text-xs text-muted-foreground">Premium subscribers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.adminUsers}</div>
              <p className="text-xs text-muted-foreground">System administrators</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Management</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={fetchUsers}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by email or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
            </div>
            
            {/* Users Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-900">User</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Plan</th>
                    <th className="text-left p-4 font-medium text-gray-900">Content</th>
                    <th className="text-left p-4 font-medium text-gray-900">Joined</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-500 mt-2">Loading users...</p>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8">
                        <div className="text-gray-500">
                          <Users className="h-12 w-12 mx-auto mb-2" />
                          <p>No users found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">{user.userName[0]?.toUpperCase()}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium">{user.userName}</p>
                                {isAdmin(user.email) && (
                                  <Badge variant="default" className="text-xs">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Admin
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-500">{user.email}</p>
                                {user.lastActivity && (
                                  <span className="text-xs text-gray-400">
                                    Last active: {formatDate(user.lastActivity)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={user.active ? "default" : "secondary"} className="flex items-center space-x-1 w-fit">
                            {user.active ? (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3" />
                                <span>Inactive</span>
                              </>
                            )}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={user.plan === 'Professional' ? "default" : "outline"}
                            className={user.plan === 'Professional' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {user.plan === 'Professional' ? (
                              <>
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </>
                            ) : (
                              'Free'
                            )}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="font-medium">{user.contentCount || 0}</p>
                            <p className="text-gray-500">items</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p>{formatDate(user.joinDate)}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowEditModal(true);
                              }}
                              disabled={isAdmin(user.email)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserDelete(user.email)}
                              disabled={isAdmin(user.email)}
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
                  Showing {filteredUsers.length} of {stats?.totalUsers} users
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

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={selectedUser.email} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input value={selectedUser.userName} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={selectedUser.active ? 'active' : 'inactive'}
                  onChange={(e) => setSelectedUser({...selectedUser, active: e.target.value === 'active'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isAdmin(selectedUser.email)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Plan</label>
                <select
                  value={selectedUser.plan}
                  onChange={(e) => setSelectedUser({...selectedUser, plan: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isAdmin(selectedUser.email)}
                >
                  <option value="Free">Free</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleUserUpdate(selectedUser.email, {
                  active: selectedUser.active,
                  plan: selectedUser.plan
                })}
                disabled={isAdmin(selectedUser.email)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
