import { UserButton } from "@clerk/nextjs";
import { Search, Settings, Crown } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user } = useUser();
  
  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // If we're on dashboard page, we can trigger the search
    // Otherwise, navigate to dashboard with search query
    if (window.location.pathname === "/dashboard") {
      // Trigger search on current page
      const event = new CustomEvent('dashboardSearch', { detail: value });
      window.dispatchEvent(event);
    } else {
      // Navigate to dashboard with search query
      router.push(`/dashboard?search=${encodeURIComponent(value)}`);
    }
  };
  return (
    <div className="px-6 py-4 shadow-sm border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 hover:bg-white hover:border-gray-400"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
              >
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      
      {/* Right Section */}
      <div className="flex gap-4 items-center">
        {/* Admin Button - Only for admin users */}
        {isAdmin && (
          <Link href="/admin">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300">
              <Settings className="w-4 h-4" />
              Admin
            </Button>
          </Link>
        )}
        
        {/* Legal Button - Only for admin users */}
        {isAdmin && (
          <div className="relative group">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Legal
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link href="/privacy-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Privacy Policy</Link>
              <Link href="/terms-of-service" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Terms of Service</Link>
              <Link href="/refund-policy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Refund Policy</Link>
            </div>
          </div>
        )}
        
        {/* Premium Button - Only for non-admin users */}
        {!isAdmin && (
          <button 
            onClick={() => window.location.href = '/dashboard/billing'}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Get Premium for ₹99
          </button>
        )}
        
        <UserButton />
      </div>
      </div>
    </div>
  );
}

export default Header;
