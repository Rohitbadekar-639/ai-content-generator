"use client";
import { Crown, Star } from "lucide-react";

export default function PremiumBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
      <Crown className="w-4 h-4" />
      <span>PRO</span>
      <Star className="w-4 h-4" />
    </div>
  );
}
