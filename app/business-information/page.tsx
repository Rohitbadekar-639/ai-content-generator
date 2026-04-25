import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Building, Mail, Phone, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';

export default function BusinessInformation() {
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
                Business Information
              </h1>
              <p className="text-gray-600">
                Official business details for RapidContent
              </p>
            </div>

            {/* Business Details */}
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Business Name:</strong> RapidContent</p>
                  <p><strong>Business Type:</strong> Software as a Service (SaaS)</p>
                  <p><strong>Industry:</strong> Artificial Intelligence & Content Creation</p>
                  <p><strong>Registration:</strong> Digital Service Provider</p>
                  <p><strong>Founded:</strong> 2026</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Online Presence
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Website:</strong> https://rapidcontent.vercel.app</p>
                  <p><strong>Service Type:</strong> Web-based AI Content Generation Platform</p>
                  <p><strong>Target Market:</strong> Global (English-speaking markets)</p>
                  <p><strong>Platform:</strong> Cloud-based SaaS solution</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Business Email:</strong> support@rapidcontent.vercel.app</p>
                  <p><strong>Support Email:</strong> support@rapidcontent.vercel.app</p>
                  <p><strong>Response Time:</strong> Within 24-48 hours</p>
                  <p><strong>Business Hours:</strong> 24/7 (Automated Support)</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Service Area
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Service Region:</strong> Global</p>
                  <p><strong>Primary Markets:</strong> India, United States, United Kingdom, Canada, Australia</p>
                  <p><strong>Currency:</strong> Indian Rupees (INR) for Indian customers</p>
                  <p><strong>Language:</strong> English (with multi-language content generation)</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Service Description
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Primary Service:</strong> AI-powered content generation platform</p>
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>50+ content templates (articles, blogs, marketing copy, etc.)</li>
                    <li>AI-powered writing assistance</li>
                    <li>Multi-language content generation</li>
                    <li>Plagiarism-free content creation</li>
                    <li>SEO-optimized content</li>
                    <li>Unlimited downloads and exports</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment & Pricing
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Payment Processor:</strong> Razorpay</p>
                  <p><strong>Pricing Model:</strong> Subscription-based (₹99/month)</p>
                  <p><strong>Free Plan:</strong> Available (1,00,000 words/month)</p>
                  <p><strong>Professional Plan:</strong> ₹99/month (10,00,000 words/month)</p>
                  <p><strong>Billing Cycle:</strong> Monthly</p>
                  <p><strong>Refund Policy:</strong> No refunds once credits are used</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Legal & Compliance
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Privacy Policy:</strong> Available at /privacy-policy</p>
                  <p><strong>Terms of Service:</strong> Available at /terms-of-service</p>
                  <p><strong>Refund Policy:</strong> Available at /refund-policy</p>
                  <p><strong>Data Protection:</strong> GDPR and CCPA compliant</p>
                  <p><strong>Content Policy:</strong> Prohibits illegal, harmful, or offensive content</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Technical Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Technology Stack:</strong> Next.js, React, TypeScript</p>
                  <p><strong>AI Providers:</strong> Google Gemini, Groq</p>
                  <p><strong>Authentication:</strong> Clerk</p>
                  <p><strong>Database:</strong> Neon (PostgreSQL)</p>
                  <p><strong>Hosting:</strong> Vercel</p>
                  <p><strong>Payment Gateway:</strong> Razorpay</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>
                This business information is provided for verification purposes by payment processors and regulatory authorities.
              </p>
              <p className="mt-2">
                For any business inquiries, please contact us at support@rapidcontent.vercel.app
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
