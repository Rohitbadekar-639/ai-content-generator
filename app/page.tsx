"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Brain, FileText, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white px-6">
      {/* Hero Section */}
      <h1 className="text-6xl font-extrabold leading-tight">
        AI Content Generator
      </h1>
      <p className="mt-4 text-xl opacity-90 max-w-2xl">
        Generate high-quality content effortlessly with AI-powered text generation.
        Save time and boost creativity!
      </p>
      
      {/* Call to Action */}
      <Link href="/dashboard">
        <Button className="mt-10 px-10 py-6 text-xl bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          Get Started
        </Button>
      </Link>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl">
        <FeatureCard 
          icon={<Brain className="w-10 h-10 text-yellow-400" />} 
          title="AI-Powered" 
          description="Advanced AI models to generate creative and engaging content." 
        />
        <FeatureCard 
          icon={<FileText className="w-10 h-10 text-green-400" />} 
          title="Multiple Formats" 
          description="Supports blogs, social media posts, product descriptions, and more." 
        />
        <FeatureCard 
          icon={<Sparkles className="w-10 h-10 text-pink-400" />} 
          title="Instant Generation" 
          description="Generate content in seconds with minimal input." 
        />
        <FeatureCard 
          icon={<Rocket className="w-10 h-10 text-blue-400" />} 
          title="Boost Productivity" 
          description="Automate writing and focus on growing your business." 
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white text-black rounded-lg shadow-lg flex flex-col items-center text-center">
      {icon}
      <h3 className="mt-3 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm opacity-80">{description}</p>
    </div>
  );
}
