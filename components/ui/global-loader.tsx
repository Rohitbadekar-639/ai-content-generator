import React from "react";
import { Loader2 } from "lucide-react";

interface GlobalLoaderProps {
  show?: boolean;
  message?: string;
}

export default function GlobalLoader({ show = true, message = "Loading..." }: GlobalLoaderProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center gap-3 min-w-[200px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
