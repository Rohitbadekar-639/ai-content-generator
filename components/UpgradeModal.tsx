"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Lock, CheckCircle2, Star } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: "locked_template" | "zero_credits";
  templateName?: string;
}

export default function UpgradeModal({ isOpen, onClose, reason, templateName }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = () => {
    setLoading(true);
    // Redirect to billing page
    window.location.href = "/dashboard/billing";
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Upgrade to Premium
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="space-y-6">
          {/* Reason-specific content */}
          {reason === "locked_template" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Lock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold text-orange-900">Premium Template</p>
                  <p className="text-sm text-orange-700">
                    "{templateName}" is only available for premium users
                  </p>
                </div>
              </div>
            </div>
          )}

          {reason === "zero_credits" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                <Zap className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-semibold text-red-900">No Credits Left</p>
                  <p className="text-sm text-red-700">
                    You've used all your free credits. Upgrade to continue generating content
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Premium benefits */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Unlock Premium Features</h3>
              <p className="text-sm text-gray-600">
                Get instant access to all professional templates and unlimited content generation
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">1,000,000 word credits</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">20+ professional templates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Credits never expire</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Priority support</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Star className="w-3 h-3 mr-1" />
                Launch Special
              </Badge>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ₹99 <span className="text-lg font-normal text-gray-500 line-through">₹399</span>
            </div>
            <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Now - Get Premium
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>✨ Secure payment via Razorpay</p>
            <p>🚀 Instant activation • No subscription</p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
