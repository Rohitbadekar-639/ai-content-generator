"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState<number>(10000); // Default to 10,000, will update based on subscription
  const [isHydrated, setIsHydrated] = useState(false);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    user && GetData();
    user && isUserSubscribed();
  }, [user]);

  // Update maxWords after subscription status is determined
  useEffect(() => {
    if (userSubscription?.active && userSubscription?.plan === "Professional") {
      setMaxWords(1000000); // 1,000,000 for paid plan
    } else {
      setMaxWords(10000); // 10,000 for free plan
    }
  }, [userSubscription]);

  useEffect(() => {
    user && GetData();
  }, [updateCreditUsage && user]);

  const GetData = async () => {
    const result: HISTORY[] = await db
      .select()
      .from(AIOutput)
      .where(
        eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || "")
      );
    GetTotalusage(result);
  };

  const isUserSubscribed = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) return;
    
    const result = await db
      .select()
      .from(UserSubscription)
      .where(
        eq(UserSubscription.email, userEmail)
      );
    
    // Check if user has active subscription
    if (result && result.length > 0) {
      const subscription = result[0];
      const isActive = subscription.active && subscription.plan === "Professional";
      setUserSubscription(isActive);
      
      // Set maxWords based on actual credits from database
      if (subscription.credits) {
        setMaxWords(subscription.credits);
      }
    } else {
      setUserSubscription(false);
      // Set default free plan credits
      setMaxWords(10000);
    }
  };

  const GetTotalusage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length);
    });
    setTotalUsage(total);
  };

  // Don't render until hydrated to prevent mismatch
  if (!isHydrated) {
    return (
      <div className="m-4">
        <div className="bg-primary p-3 text-white rounded-lg">
          <h2 className="font-medium">Word Credits</h2>
          <div className="h-2 bg-[#9981f9] mt-2 rounded-full w-full">
            <div className="h-2 bg-white rounded-full" style={{ width: "0%" }}></div>
          </div>
          <h2 className="text-sm my-2">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4">
      <div className="bg-primary p-3 text-white rounded-lg">
        <h2 className="font-medium">Word Credits</h2>
        <div className="h-2 bg-[#9981f9] mt-2 rounded-full w-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: Math.min((totalUsage / maxWords) * 100, 100) + "%" }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {isHydrated ? totalUsage.toLocaleString() : totalUsage.toString()}/{isHydrated ? maxWords.toLocaleString() : maxWords.toString()} words used
        </h2>
        {totalUsage >= maxWords * 0.8 && (
          <p className="text-xs text-yellow-200">
            {totalUsage >= maxWords ? "Limit reached!" : `Only ${isHydrated ? (maxWords - totalUsage).toLocaleString() : (maxWords - totalUsage).toString()} words left`}
          </p>
        )}
      </div>
      <Button 
        variant={"link"} 
        className="my-4 w-full font-bold text-primary hover:text-primary/80"
        onClick={() => window.location.href = '/dashboard/billing'}
      >
        {totalUsage >= maxWords ? "Upgrade Now" : "Upgrade Plan"}
      </Button>
    </div>
  );
}

export default UsageTrack;
