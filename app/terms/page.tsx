"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/landing" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: January 2026</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using RapidContent, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Use License</h2>
          <p className="text-gray-600 mb-4">
            Permission is granted to temporarily download one copy of the materials on RapidContent 
            for personal, non-commercial transitory viewing only.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Subscription Plans</h2>
          <p className="text-gray-600 mb-4">
            We offer both free and paid subscription plans. Paid plans provide additional features 
            and higher usage limits. Subscriptions are billed monthly and can be canceled at any time.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Content Guidelines</h2>
          <p className="text-gray-600 mb-4">
            Users are responsible for the content they generate. You must not use our service to 
            create harmful, illegal, or inappropriate content.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
            support@rapidcontent.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}
