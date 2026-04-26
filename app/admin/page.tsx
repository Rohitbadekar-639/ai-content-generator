"use client";
import { useUser } from "@clerk/nextjs";
import AdminDashboardSimple from "@/components/admin/AdminDashboardSimple";
import { XCircle } from "lucide-react";

export default function AdminPage() {
  const { user } = useUser();

  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <AdminDashboardSimple />;
}
