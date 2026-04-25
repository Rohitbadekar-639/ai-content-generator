import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicy() {
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
                Refund Policy
              </h1>
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Policy Content */}
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  No Refund Policy
                </h2>
                <p className="leading-relaxed">
                  At RapidContent, we maintain a strict no-refund policy. Once you purchase our AI content generation 
                  services and credits are used or allocated to your account, no refunds will be issued.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Credits Usage
                </h2>
                <p className="leading-relaxed">
                  AI credits are consumed immediately when you generate content. Since these credits represent 
                  computational resources and API calls that have already been utilized, they cannot be refunded 
                  or transferred once used.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  One-Time Payment
                </h2>
                <p className="leading-relaxed">
                  Premium access is a one-time payment of ₹99 for lifetime access. Once purchased, 
                  the payment is non-refundable. You get immediate access to all features and 100,000 word credits.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Service Availability
                </h2>
                <p className="leading-relaxed">
                  We strive to maintain 99.9% uptime for our services. However, we are not liable for any 
                  temporary unavailability of service that may occur due to technical issues, maintenance, or 
                  factors beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Account Suspension
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to suspend or terminate accounts that violate our Terms of Service. 
                  In such cases, no refunds will be provided for any remaining credits or subscription periods.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Payment Processing
                </h2>
                <p className="leading-relaxed">
                  All payments are processed securely through Razorpay. Once a payment is successfully 
                  processed and confirmed, it is considered final and non-refundable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Contact Information
                </h2>
                <p className="leading-relaxed">
                  If you have questions about our refund policy, please contact us at:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p><strong>Email:</strong> support@rapidcontent.vercel.app</p>
                  <p><strong>Response Time:</strong> Within 24-48 hours</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>
                This refund policy is part of our Terms of Service. By using RapidContent, 
                you agree to these terms.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
