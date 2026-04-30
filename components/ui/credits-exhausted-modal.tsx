"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Zap, Crown, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

interface CreditsExhaustedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage: number;
  maxCredits: number;
}

export default function CreditsExhaustedModal({ isOpen, onClose, currentUsage, maxCredits }: CreditsExhaustedModalProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    // Simulate upgrade process
    setTimeout(() => {
      window.location.href = "/dashboard/billing";
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-t-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Credits Exhausted!</h2>
              <p className="text-orange-100">You've reached your free plan limit</p>
            </div>
          </div>
          
          {/* Usage Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Credits Used</span>
              <span className="text-sm font-bold">{currentUsage.toLocaleString()} / {maxCredits.toLocaleString()}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{width: '100%'}}></div>
            </div>
            <div className="text-xs text-orange-200 mt-2">🎯 100% of your free credits used</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Current Status */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Your Free Plan is Exhausted</h3>
            </div>
            <div className="text-sm text-red-700">
              You've used all {maxCredits.toLocaleString()} free credits. To continue generating amazing content, upgrade to Premium and get 100,000 credits!
            </div>
          </div>

          {/* What You Get with Premium */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Unlock Premium Features:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">100,000 Credits</div>
                  <div className="text-sm text-gray-600">10x more credits than free plan</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">All 20+ Templates</div>
                  <div className="text-sm text-gray-600">Instagram, YouTube, Writing Assistant & more</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Lifetime Access</div>
                  <div className="text-sm text-gray-600">Pay once, use forever. No recurring charges</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Priority Support</div>
                  <div className="text-sm text-gray-600">Get help when you need it most</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Free vs Premium:</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Feature</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700">Free</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Credits</td>
                    <td className="px-4 py-2 text-sm text-center text-gray-600">{maxCredits.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-center font-semibold text-green-600">100,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Templates</td>
                    <td className="px-4 py-2 text-sm text-center text-gray-600">8</td>
                    <td className="px-4 py-2 text-sm text-center font-semibold text-green-600">20+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Price</td>
                    <td className="px-4 py-2 text-sm text-center text-gray-600">Free</td>
                    <td className="px-4 py-2 text-sm text-center font-semibold text-green-600">₹99 once</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Urgency Message */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚡</span>
              </div>
              <h4 className="font-semibold text-amber-800">Limited Time Offer!</h4>
            </div>
            <div className="text-sm text-amber-700">
              Get Premium now for just ₹99 (75% off regular price of ₹399). This special launch pricing won't last long!
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Instant Access
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Secure Payment
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              30-Day Guarantee
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isUpgrading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Upgrade Now - ₹99
                </div>
              )}
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 py-3 rounded-lg border-gray-300 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
