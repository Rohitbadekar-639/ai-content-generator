import Templates, { getTemplatesForUser } from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { useUser } from "@clerk/nextjs";
import UpgradeModal from "@/components/ui/upgrade-modal";

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
  const [templateList, setTemplateList] = useState<TEMPLATE[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Define niche categories
  const categories = [
    "All",
    "Blog",
    "Social Media", 
    "Marketing",
    "SEO",
    "Rewriting Tool",
    "Writing Assistant",
    "Coding",
    "YouTube Tools"
  ];

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
        setError('Failed to check subscription status');
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  // Filter templates based on search, category, and premium status
  useEffect(() => {
    const availableTemplates = getTemplatesForUser(isPremium || isAdmin);
    
    let filteredData = availableTemplates;
    
    // Filter by category first
    if (selectedCategory !== "All") {
      filteredData = filteredData.filter((item) =>
        item.category === selectedCategory
      );
    }
    
    // Then filter by search
    if (userSearchInput) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
    }
    
    setTemplateList(filteredData);
  }, [userSearchInput, selectedCategory, isPremium, loading, isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
          <p className="text-red-600 text-sm mb-4">
            We couldn't load the templates. Please refresh the page and try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-4">
        {/* Premium Banner for Free Users (not shown to admin) */}
        {!isPremium && !isAdmin && (
          <div className="mx-8 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Unlock Premium Features</h3>
                    <p className="text-sm text-blue-100">Get all 20+ templates & 100,000 credits</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Upgrade - ₹99
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="px-8 py-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 pb-8">
          {templateList.length > 0 ? (
            templateList.map((items: TEMPLATE, index: number) => (
              <TemplateCard key={index} {...items} isPremium={isPremium} isAdmin={isAdmin} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No templates found</h3>
              <p className="text-gray-600 text-sm mb-4">
                {selectedCategory === "All" 
                  ? "No templates available. Please try refreshing the page."
                  : `No templates found in "${selectedCategory}" category. Try selecting "All" to see all available templates.`
                }
              </p>
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View All Templates
                </button>
              )}
            </div>
          )}
          
          {/* Show upgrade prompt for free users if they have fewer templates (not shown to admin) */}
          {!isPremium && !isAdmin && templateList.length < 20 && (
            <div className="col-span-full">
              <div className="mx-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✨</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {20 - templateList.length} More Templates Available
                  </h4>
                </div>
                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    You're currently seeing {templateList.length} free templates. Upgrade to Premium and unlock all 20+ professional templates.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">Instagram Tools</span>
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">YouTube Tools</span>
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">Writing Assistant</span>
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">Advanced Coding</span>
                    <span className="bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">+ More</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">₹99</div>
                    <div className="text-xs text-gray-500 line-through">₹399</div>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View All Premium Features
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentTemplates={templateList.length}
        totalTemplates={20}
      />
    </>
  );
}

export default TemplateListSection;
