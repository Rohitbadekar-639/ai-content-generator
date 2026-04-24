import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles, FileText } from "lucide-react";
import ContentRenderer from "@/components/ui/content-renderer";

interface PROPS {
  aiOutput: string | null;
}

function OutputSection({ aiOutput }: PROPS) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!aiOutput) return;
    
    await navigator.clipboard.writeText(aiOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">AI Generated Result</h2>
              <p className="text-blue-100 text-sm">Powered by Groq AI</p>
            </div>
          </div>
          <Button 
            onClick={handleCopy}
            disabled={!aiOutput || copied}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 min-h-[450px] bg-gradient-to-br from-gray-50 to-white">
        {aiOutput ? (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={aiOutput} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Ready to generate content</h3>
            <p className="text-gray-400 max-w-md">
              Fill in the form and click "Generate Content" to see your AI-powered results here
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {aiOutput && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Content generated successfully</span>
            <span>{aiOutput.length} characters</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputSection;
