"use client";
import React, { useState, useEffect } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import { RefreshCw, Crown } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { useLoading } from "@/app/(context)/LoadingContext";
import { useContext } from "react";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const { setLoading } = useLoading();

  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';

  // Admin reset credits function
  const resetCredits = async () => {
    if (!isAdmin || !user?.id) return;

    try {
      setLoading(true, "Resetting credits...");
      
      const response = await fetch('/api/admin/reset-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          targetUserId: user.id,
          targetUserEmail: user?.primaryEmailAddress?.emailAddress
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Reset the total usage in context
        setTotalUsage(0);
        // Trigger update to refetch data from database
        setUpdateCreditUsage(Date.now());
      }
    } catch (error) {
      console.error("Error resetting credits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for search events from header
    const handleHeaderSearch = (event: CustomEvent) => {
      setUserSearchInput(event.detail);
    };

    window.addEventListener('dashboardSearch', handleHeaderSearch as EventListener);
    
    // Check for URL search parameter on load
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = urlParams.get('search');
    if (searchFromUrl) {
      setUserSearchInput(searchFromUrl);
    }

    return () => {
      window.removeEventListener('dashboardSearch', handleHeaderSearch as EventListener);
    };
  }, []);

  return (
    <div>
      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex justify-end mb-4 px-4">
          <div className="flex gap-2">
            <Button 
              onClick={resetCredits}
              className="bg-red-600 hover:bg-red-700 text-white"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Credits
            </Button>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              <Crown className="w-4 h-4" />
              Admin Mode
            </div>
          </div>
        </div>
      )}
      
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
