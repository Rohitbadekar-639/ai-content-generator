"use client";
import { useState, useCallback } from "react";
import { useContext } from "react";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useUser } from "@clerk/nextjs";

interface UseCreditLimitProps {
  onCreditsExhausted?: () => void;
}

export function useCreditLimit({ onCreditsExhausted }: UseCreditLimitProps = {}) {
  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { user } = useUser();
  const [showCreditsExhaustedModal, setShowCreditsExhaustedModal] = useState(false);

  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';

  // Check if user is premium
  const isPremiumUser = userSubscription?.active && userSubscription?.plan === "Professional";

  // Get max credits based on user type
  const getMaxCredits = useCallback(() => {
    if (isAdmin) return 999999999; // Admin gets unlimited
    if (isPremiumUser) return 100000; // Premium gets 100k
    return 10000; // Free gets 10k
  }, [isAdmin, isPremiumUser]);

  // Check if user has reached credit limit
  const hasReachedLimit = useCallback(() => {
    const maxCredits = getMaxCredits();
    return !isAdmin && totalUsage >= maxCredits;
  }, [totalUsage, getMaxCredits, isAdmin]);

  // Get remaining credits
  const getRemainingCredits = useCallback(() => {
    const maxCredits = getMaxCredits();
    return Math.max(0, maxCredits - totalUsage);
  }, [totalUsage, getMaxCredits]);

  // Get credit usage percentage
  const getUsagePercentage = useCallback(() => {
    const maxCredits = getMaxCredits();
    return Math.min(100, (totalUsage / maxCredits) * 100);
  }, [totalUsage, getMaxCredits]);

  // Handle credit limit check
  const checkCreditLimit = useCallback(() => {
    if (hasReachedLimit()) {
      setShowCreditsExhaustedModal(true);
      onCreditsExhausted?.();
      return false;
    }
    return true;
  }, [hasReachedLimit, onCreditsExhausted]);

  // Close modal
  const closeCreditsModal = useCallback(() => {
    setShowCreditsExhaustedModal(false);
  }, []);

  return {
    // State
    showCreditsExhaustedModal,
    
    // Computed values
    maxCredits: getMaxCredits(),
    remainingCredits: getRemainingCredits(),
    usagePercentage: getUsagePercentage(),
    hasReachedLimit: hasReachedLimit(),
    isPremiumUser,
    isAdmin,
    
    // Actions
    checkCreditLimit,
    closeCreditsModal,
    setShowCreditsExhaustedModal,
  };
}
