import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Main Content */}
        <Card className="p-8 shadow-lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Policy Content */}
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing and using RapidContent ("the Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Service Description
                </h2>
                <p className="leading-relaxed">
                  RapidContent is an AI-powered content generation platform that provides users with the ability to 
                  create various types of content using artificial intelligence technology. The service operates on a 
                  credit-based system and subscription model.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  User Accounts
                </h2>
                <p className="leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to 
                  accept responsibility for all activities that occur under your account or password. RapidContent reserves 
                  the right to refuse service, terminate accounts, or remove or edit content in its sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Payment Terms
                </h2>
                <p className="leading-relaxed">
                  Subscription fees and credit purchases are processed through Razorpay. All payments are non-refundable 
                  as outlined in our Refund Policy. You agree to provide current, complete, and accurate purchase and 
                  account information for all purchases made at our store.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Content Generation and Usage
                </h2>
                <p className="leading-relaxed">
                  Users are responsible for the content they generate using our AI tools. You agree not to use the service 
                  to generate content that is illegal, harmful, offensive, or violates any third-party rights. RapidContent 
                  is not responsible for the accuracy, quality, or appropriateness of AI-generated content.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Intellectual Property
                </h2>
                <p className="leading-relaxed">
                  The service and its original content, features, and functionality are owned by RapidContent and are 
                  protected by international copyright, trademark, and other intellectual property laws. You retain ownership 
                  of content you generate, but grant us a license to use and improve our AI models.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Prohibited Activities
                </h2>
                <p className="leading-relaxed">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Generate content that violates laws or regulations</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated tools to access the service excessively</li>
                  <li>Resell or redistribute our service without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Service Availability
                </h2>
                <p className="leading-relaxed">
                  We strive to maintain service availability but do not guarantee uninterrupted access. We may update, 
                  modify, or discontinue the service at any time without notice. We are not liable for any loss or damage 
                  resulting from service interruptions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  In no event shall RapidContent, its directors, employees, partners, agents, suppliers, or affiliates be 
                  liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, 
                  data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Privacy Policy
                </h2>
                <p className="leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                  to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Changes to Terms
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these terms at any time. If we make material changes, we will notify you by 
                  email or by posting a notice on our site prior to the change becoming effective.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Contact Information
                </h2>
                <p className="leading-relaxed">
                  Questions about the Terms of Service should be sent to:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> support@rapidcontent.vercel.app</p>
                  <p><strong>Website:</strong> https://rapidcontent.vercel.app</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>
                By using RapidContent, you acknowledge that you have read and understood these Terms of Service.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
