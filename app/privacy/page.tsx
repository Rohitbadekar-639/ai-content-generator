"use client";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/landing" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600 mb-12">
          Your privacy is our priority. Learn how we protect and use your data.
        </p>
        
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Account information (name, email)</li>
              <li>• Usage data and analytics</li>
              <li>• Content you generate</li>
              <li>• Payment information (processed securely)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, and communicate with you.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Provide and maintain our services</li>
              <li>• Process payments and subscriptions</li>
              <li>• Send important updates</li>
              <li>• Improve user experience</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Data Security</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• 256-bit SSL encryption</li>
              <li>• Secure data centers</li>
              <li>• Regular security audits</li>
              <li>• GDPR compliant</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="mb-6">
              You have the right to access, update, or delete your personal data at any time.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <Lock className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1">Access</h3>
                <p className="text-sm text-blue-100">Request your data anytime</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <Shield className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1">Update</h3>
                <p className="text-sm text-blue-100">Modify your information</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <Database className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1">Delete</h3>
                <p className="text-sm text-blue-100">Remove your account</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <a href="mailto:support@rapidcontent.vercel.app" className="text-blue-600 hover:text-blue-800 font-medium">
              support@rapidcontent.vercel.app
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
