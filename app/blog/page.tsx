"use client";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const posts = [
    {
      title: "10 Ways AI is Revolutionizing Content Marketing",
      excerpt: "Discover how artificial intelligence is transforming the way businesses create and distribute content. Learn practical strategies to implement AI in your marketing workflow.",
      author: "RapidContent Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Marketing",
      slug: "ai-revolutionizing-content-marketing"
    },
    {
      title: "The Ultimate Guide to AI Content Generation",
      excerpt: "Everything you need to know about using AI to create high-quality content for your business. From basics to advanced techniques.",
      author: "RapidContent Team",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Guide",
      slug: "ultimate-guide-ai-content"
    },
    {
      title: "Content Marketing Trends for 2024",
      excerpt: "Stay ahead of the curve with these emerging trends in content marketing and AI integration. What's working right now.",
      author: "RapidContent Team",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Trends",
      slug: "content-marketing-trends-2024"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/landing" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">RapidContent Blog</h1>
          <p className="text-xl text-gray-600 mb-8">
            Tips, insights, and trends about AI content generation and digital marketing
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Trending Now</span>
            </div>
            <p className="text-lg">
              AI content creation is growing 10x faster than traditional methods. Stay ahead with our expert insights.
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <div className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                    Read More
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-slate-100 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Create Amazing Content?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already using AI to transform their content strategy
            </p>
            <Link href="/landing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
