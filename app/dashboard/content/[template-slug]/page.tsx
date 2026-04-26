"use client";
import React, { useContext, useState, use } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates, { getTemplatesForUser } from "@/app/(data)/Templates";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation"; // Corrected import
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useLoading } from "@/app/(context)/LoadingContext";

interface PROPS {
  params: Promise<{ "template-slug": string }>; // params is now a Promise
}

function CreateNewContent(props: PROPS) {
  const params = use(props.params); // Unwrap the Promise
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === params["template-slug"]
  );

  const [loading, setLocalLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setLoading } = useLoading();

  // Check if user is admin
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com';

  // Check if user has access to this template (admin bypasses all restrictions)
  const availableTemplates = getTemplatesForUser(userSubscription ? true : false);
  const hasAccess = isAdmin || (selectedTemplate && availableTemplates.some(t => t.slug === selectedTemplate.slug));

  // Set maxWords based on subscription status (admin gets unlimited)
  const maxWords = isAdmin ? 999999999 : (userSubscription ? 1000000 : 100000); // Admin unlimited, paid 10L, free 1L

  const GenerateAIContent = async (formData: any) => {
    if (!selectedTemplate) {
      return;
    }

    // Check usage limits before generation (admin bypasses)
    const maxWordsForGeneration = isAdmin ? 999999999 : (userSubscription ? 1000000 : 100000);
    if (!isAdmin && totalUsage >= maxWordsForGeneration) {
      const planName = userSubscription ? "Professional" : "Free";
      alert(`You've reached your ${planName} plan limit of ${maxWordsForGeneration.toLocaleString()} words. Please upgrade to continue generating content.`);
      return;
    }

    setLocalLoading(true);
    setLoading(true, "Generating AI content...");
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
    
    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: FinalAIPrompt,
          model: 'llama-3.1-8b-instant'
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const result = data.response;
        setAiOutput(result);
        await SaveInDb(formData, selectedTemplate?.slug, result);
      } else {
        setAiOutput(data.error || "Failed to generate content. Please try again.");
      }
    } catch (error) {
      setAiOutput("Network error. Please check your connection and try again.");
    }
    
    setLocalLoading(false);
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug || "",
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
      createdAt: moment().format("DD/MM/YYYY"),
    });
    console.log(result);
  };

  // Show access denied message if user doesn't have access
  if (!hasAccess) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m8-10V6a4 4 0 00-8 0v4h8zm-4 10a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Template</h2>
          <p className="text-gray-600 mb-6">
            This template is only available for premium users. Upgrade to unlock all {Templates.length.toString()}+ professional templates.
          </p>
          <div className="space-y-3">
            <Link href="/dashboard/billing">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Upgrade to Premium - ₹99 Once
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <Link href="/dashboard">
        <Button className="bg-white hover:bg-gray-50 border shadow-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="lg:col-span-1">
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: any) => GenerateAIContent(v)}
            loading={loading}
          />
        </div>
        <div className="lg:col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
