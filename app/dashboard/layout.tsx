"use client";
import React, { useState, useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";
import { useUser } from "@clerk/nextjs";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();
  const { user } = useUser();

  // Fetch user subscription data on mount
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      
      try {
        const response = await fetch('/api/check-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress || '',
          }),
        });
        
        const data = await response.json();
        setUserSubscription(data.subscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchSubscription();
  }, [user]);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider
        value={{ userSubscription, setUserSubscription }}
      >
        <UpdateCreditUsageContext.Provider
          value={{ updateCreditUsage, setUpdateCreditUsage }}
        >
          <div className="bg-slate-50 min-h-screen flex">
            <div className="md:w-64 hidden md:block fixed">
              <SideNav />
            </div>
            <div className="md:ml-64 flex-1">
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
            </div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default layout;
