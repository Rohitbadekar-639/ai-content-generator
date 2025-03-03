"use client";
import React from "react";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy!");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 border rounded hover:bg-gray-100"
    >
      <Copy className="w-4 h-4" />
    </button>
  );
};

export { CopyButton };
