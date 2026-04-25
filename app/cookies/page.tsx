"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/landing" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: January 2026</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Are Cookies</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us improve your experience and provide essential functionality.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Cookies</h2>
          <p className="text-gray-600 mb-4">
            We use cookies to:
          </p>
          <ul className="list-disc list-inside mt-2 mb-4 text-gray-600">
            <li>Remember your preferences</li>
            <li>Keep you logged in</li>
            <li>Analyze website traffic</li>
            <li>Provide personalized content</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookie Types</h2>
          <p className="text-gray-600 mb-4">
            <strong>Essential Cookies:</strong> Required for basic website functionality<br/>
            <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site<br/>
            <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Managing Cookies</h2>
          <p className="text-gray-600 mb-4">
            You can control and/or delete cookies through your browser settings. Please note that 
            disabling certain cookies may affect website functionality.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our Cookie Policy, please contact us at:
            support@rapidcontent.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}
