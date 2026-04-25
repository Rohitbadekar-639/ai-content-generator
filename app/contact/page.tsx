"use client";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/landing" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have questions? We're here to help you succeed with AI-powered content creation
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Email Support</h3>
            <p className="text-gray-600 mb-4">Get help via email within 24 hours</p>
            <a href="mailto:support@rapidcontent.vercel.app" className="text-blue-600 hover:text-blue-800 font-medium">
              support@rapidcontent.vercel.app
            </a>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our team instantly</p>
            <Button variant="outline" className="w-full">
              Start Chat
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Help Center</h3>
            <p className="text-gray-600 mb-4">Find answers quickly in our FAQ</p>
            <Button variant="outline" className="w-full">
              Browse FAQ
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          <p className="text-gray-600 mb-8">
            We read every message and respond within 24 hours. Your feedback helps us improve RapidContent for everyone.
          </p>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How can we help?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
