"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Crown, CheckCircle2, Zap, Shield } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplates: number;
  totalTemplates: number;
}

export default function UpgradeModal({ isOpen, onClose, currentTemplates, totalTemplates }: UpgradeModalProps) {
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
              <p className="text-blue-100">Unlock the full power of RapidContent</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">₹99</div>
                <div className="text-sm text-blue-200 line-through">₹399</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-300">75% OFF</div>
                <div className="text-xs text-blue-200">Limited Time Offer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Current Status */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Your Current Plan</h3>
            </div>
            <div className="text-sm text-amber-700">
              You have access to {currentTemplates} free templates. 
              Upgrade to unlock {totalTemplates - currentTemplates} more premium templates!
            </div>
          </div>

          {/* What You Get */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">All {totalTemplates}+ Templates</div>
                  <div className="text-sm text-gray-600">Instagram, YouTube, Writing Assistant, Coding & more</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">100,000 Credits</div>
                  <div className="text-sm text-gray-600">Generate unlimited content with our generous credit system</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Lifetime Access</div>
                  <div className="text-sm text-gray-600">Pay once, use forever. No recurring charges</div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Templates Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Premium Templates Include:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">📱 Instagram Tools</div>
              <div className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">🎥 YouTube Tools</div>
              <div className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">✍️ Writing Assistant</div>
              <div className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700">💻 Advanced Coding</div>
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
              100% Satisfaction
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
