import Templates, { getTemplatesForUser } from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { useUser } from "@clerk/nextjs";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

function TemplateListSection({ userSearchInput }: any) {
  const { user } = useUser();
  const [templateList, setTemplateList] = useState(Templates);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';

  // Check user subscription status (skip for admin)
  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
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
        setIsPremium(data.isSubscribed || false);
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  // Update template list based on subscription and search
  useEffect(() => {
    if (loading) return;

    // Admin gets all templates regardless of subscription
    const availableTemplates = isAdmin ? Templates : getTemplatesForUser(isPremium);
    
    if (userSearchInput) {
      const filteredData = availableTemplates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filteredData);
    } else {
      setTemplateList(availableTemplates);
    }
  }, [userSearchInput, isPremium, loading, isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Premium Banner for Free Users (not shown to admin) */}
      {!isPremium && !isAdmin && (
        <div className="mx-8 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🔒 Upgrade to Premium</h3>
              <p className="text-blue-100">
                Get access to all {Templates.length.toString()}+ templates and unlock unlimited content generation!
              </p>
            </div>
            <a href="/dashboard/billing" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Upgrade for ₹99
            </a>
          </div>
        </div>
      )}

      {/* Template Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
        {templateList.map((items: TEMPLATE, index: number) => (
          <TemplateCard key={index} {...items} />
        ))}
        
        {/* Show upgrade prompt for free users if they have fewer templates (not shown to admin) */}
        {!isPremium && !isAdmin && templateList.length < Templates.length && (
          <div className="col-span-full text-center p-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Want more templates?
              </h4>
              <p className="text-gray-600 mb-4">
                Upgrade to premium to unlock all {Templates.length.toString()}+ professional templates
              </p>
              <a href="/dashboard/billing" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Upgrade Now - ₹99 Once
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplateListSection;
