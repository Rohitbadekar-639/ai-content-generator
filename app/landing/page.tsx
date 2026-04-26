"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle2, Menu, X, Target, Globe } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Script from "next/script";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content",
      description: "Generate high-quality content using advanced AI technology",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create content in seconds, not hours",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared",
    },
  ];

  const templates = [
    "Blog Posts", "Social Media", "Email Marketing", 
    "Product Descriptions", "Ad Copy", "Website Content"
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      words: "Limited",
      features: ["limited templates only", "Basic features", "Limited access", "No history"],
      popular: false,
      amount: 0,
    },
    {
      name: "Premium",
      price: "₹99",
      words: "100,000",
      features: ["100,000 words credits", "All 50+ templates", "Full features", "Lifetime access", "One-time payment"],
      popular: true,
      amount: 99,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RapidContent</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#admin" className="text-gray-600 hover:text-gray-900 transition-colors">Admin</a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  {user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com' && (
                    <Link href="/admin">
                      <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <a href="#features" className="block px-4 py-2 text-gray-600 hover:text-gray-900">Features</a>
              <a href="#templates" className="block px-4 py-2 text-gray-600 hover:text-gray-900">Templates</a>
              <a href="#pricing" className="block px-4 py-2 text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#admin" className="block px-4 py-2 text-gray-600 hover:text-gray-900">Admin</a>
              <div className="pt-4 space-y-2">
                {isSignedIn ? (
                  <>
                    {user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com' && (
                      <Link href="/admin">
                        <Button variant="outline" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <Link href="/dashboard">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Go to Dashboard
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 py-8">
            Create Amazing Content
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              {" "}10x Faster
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Transform your ideas into compelling content with AI. Generate blog posts, social media updates, 
            marketing copy, and more in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
                  Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-800 text-lg px-8 py-3">
                    Start Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white hover:text-blue-800 text-lg px-8 py-3">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
          <p className="text-sm text-blue-100 mt-4">
            No credit card required • 10,000 free words credits per user
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose RapidContent?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Stop wasting hours on content creation. Join thousands of marketers, entrepreneurs, and creators who are already producing 10x more content with AI.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">10x Faster Content Creation</h3>
              <p className="text-gray-600 mb-4">
                What takes you 3 hours to write, our AI generates in 3 minutes. Imagine creating a month's worth of blog posts, social media updates, and marketing copy in just one afternoon.
              </p>
              <div className="text-sm font-medium text-blue-600">⚡ Save 20+ hours per week</div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Human-Like Quality That Converts</h3>
              <p className="text-gray-600 mb-4">
                Our AI doesn't just write words—it crafts compelling stories that engage readers and drive action. Content that ranks on Google and converts visitors into customers.
              </p>
              <div className="text-sm font-medium text-green-600">📈 3x higher engagement rates</div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Scale Your Content Globally</h3>
              <p className="text-gray-600 mb-4">
                Create content in 25+ languages and reach audiences worldwide. Perfect for businesses expanding internationally or creators targeting diverse markets.
              </p>
              <div className="text-sm font-medium text-purple-600">🌍 Reach 1B+ global users</div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">The Results Speak for Themselves</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1M+</div>
                <div className="text-blue-100">Words Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.9★</div>
                <div className="text-blue-100">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Generate Professional Content in Seconds with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create high-quality blog posts, social media content, marketing copy, and more with our advanced AI technology. 
              Start free, then get lifetime access for just ₹99.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="p-4 bg-white rounded-lg text-center hover:bg-slate-100 transition-colors border">
                <span className="text-sm font-medium text-gray-700">{template}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your content needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl scale-105'
                    : 'bg-white shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    <span className="text-lg font-normal">{plan.amount === 0 ? ' forever' : ' once'}</span>
                  </div>
                  <p className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                    {plan.words} {plan.amount === 0 ? 'access' : 'words credits'}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={isSignedIn ? "/dashboard/billing" : "/sign-up"}>
                  <Button
                    className={`w-full py-3 text-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.amount === 0 ? 'Get Started Free' : `Get ${plan.name}`}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Access Section */}
      <section id="admin" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Admin Access
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access the admin panel to manage users, view analytics, and control your SAAS application
          </p>
          <Link href="/admin">
            <Button size="lg" variant="outline" className="bg-blue border-white text-white hover:bg-white hover:text-gray-900 font-semibold transition-all duration-200">
              Go to Admin Panel
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">RapidContent</span>
              </div>
              <p className="text-gray-400">
                AI-powered content creation platform for modern businesses and creators.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#templates" className="hover:text-white">Templates</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/refund-policy" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 RapidContent. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Load Razorpay SDK */}
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
