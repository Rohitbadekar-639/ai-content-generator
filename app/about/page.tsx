"use client";
import Link from "next/link";
import { ArrowLeft, Sparkles, Users, Globe, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/landing" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About RapidContent</h1>
        <p className="text-xl text-gray-600 mb-12">
          AI-powered content generation platform that helps businesses and creators produce high-quality content 10x faster
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Technology</h3>
            <p className="text-gray-600">
              Advanced AI models generate human-like content across multiple formats and languages with unmatched accuracy.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">User-Focused Design</h3>
            <p className="text-gray-600">
              Built for creators, marketers, and businesses who need quality content quickly and efficiently.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
            <p className="text-gray-600">
              Supporting 25+ languages and diverse content types for worldwide audiences and markets.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quality First</h3>
            <p className="text-gray-600">
              Consistently delivering high-quality, engaging content that drives real business results.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6">
            To empower every individual and organization to create compelling content effortlessly, 
            breaking down barriers between ideas and execution.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5M+</div>
              <div className="text-blue-100">Words Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Languages</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2024, RapidContent emerged from the need to make content creation accessible 
            to everyone. We saw businesses struggling with content production costs and time constraints, 
            and knew AI could be the solution.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve thousands of users worldwide, helping them save time, 
            reduce costs, and create content that truly resonates with their audience.
          </p>
        </div>
      </div>
    </div>
  );
}
