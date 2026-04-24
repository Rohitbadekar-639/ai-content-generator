"use client";
import React, { useContext, useState, use } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
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

  // Set maxWords based on subscription status with consistent initial value
  const maxWords = userSubscription ? 1000000 : 100000; // 10,00,000 paid, 1,00,000 free

  const GenerateAIContent = async (formData: any) => {
    if (!selectedTemplate) {
      return;
    }

    // Check usage limits before generation
    const maxWords = userSubscription ? 1000000 : 100000; // Updated limits
    if (totalUsage >= maxWords) {
      const planName = userSubscription ? "Professional" : "Free";
      alert(`You've reached your ${planName} plan limit of ${maxWords.toLocaleString()} words. Please upgrade to continue generating content.`);
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

  return (
    <div className="p-4">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
