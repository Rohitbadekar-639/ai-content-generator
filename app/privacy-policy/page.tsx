import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
                Privacy Policy
              </h1>
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Policy Content */}
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Information We Collect
                </h2>
                <p className="leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This includes:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Payment information (processed securely through Razorpay)</li>
                  <li>Content you generate using our AI tools</li>
                  <li>Usage data and analytics</li>
                  <li>Device and browser information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect, investigate, and prevent security issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Content and Model Training
                </h2>
                <p className="leading-relaxed">
                  Content you generate may be used to improve our AI models. We implement measures to 
                  remove personal information from training data. Your generated content is not sold to 
                  third parties and is used solely for service improvement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Data Sharing and Disclosure
                </h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties. 
                  We may share information with:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Service providers (e.g., Razorpay for payment processing)</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Data Retention
                </h2>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services, 
                  comply with legal obligations, resolve disputes, and enforce our agreements. Generated 
                  content is retained according to your subscription plan and account settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Your Rights
                </h2>
                <p className="leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Request a copy of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Control your content generation settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Cookies and Tracking
                </h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service and 
                  hold certain information. You can instruct your browser to refuse all cookies or to indicate 
                  when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Third-Party Services
                </h2>
                <p className="leading-relaxed">
                  Our service integrates with third-party services including:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                  <li>Clerk for authentication and user management</li>
                  <li>Razorpay for payment processing</li>
                  <li>Google Analytics for usage tracking</li>
                  <li>AI providers (Google Gemini, Groq) for content generation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Children's Privacy
                </h2>
                <p className="leading-relaxed">
                  Our service is not intended for use by children under the age of 13. We do not knowingly 
                  collect personally identifiable information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  International Data Transfers
                </h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place for international data transfers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Contact Information
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
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
                This Privacy Policy is part of our commitment to protecting your privacy and data.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
