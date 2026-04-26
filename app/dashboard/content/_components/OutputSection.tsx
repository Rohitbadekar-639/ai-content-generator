import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles, FileText, Download, Share2 } from "lucide-react";
import ContentRenderer from "@/components/ui/content-renderer";

interface PROPS {
  aiOutput: string | null;
}

function OutputSection({ aiOutput }: PROPS) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!aiOutput) return;
    
    try {
      await navigator.clipboard.writeText(aiOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = (format: 'txt' | 'md' | 'html') => {
    if (!aiOutput) return;
    
    let content = aiOutput;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    if (format === 'md') {
      mimeType = 'text/markdown';
      extension = 'md';
    } else if (format === 'html') {
      mimeType = 'text/html';
      extension = 'html';
      content = `<!DOCTYPE html><html><head><title>AI Generated Content</title></head><body>${aiOutput}</body></html>`;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-content-${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!aiOutput) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Generated Content',
          text: aiOutput.substring(0, 200) + '...',
        });
      } catch (err) {
        // Share cancelled by user
      }
    } else {
      // Fallback - copy to clipboard
      handleCopy();
    }
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
              <h2 className="text-xl font-semibold text-white">Ready-to-Use Content</h2>
              <p className="text-blue-100 text-sm">Professional quality • Copy & paste directly</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleCopy}
              disabled={!aiOutput || copied}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <Button 
              onClick={handleShare}
              disabled={!aiOutput}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <div className="relative group">
              <Button 
                disabled={!aiOutput}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200"
              >
                <Download className="w-4 h-4" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => handleDownload('txt')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Download as TXT
                  </button>
                  <button
                    onClick={() => handleDownload('md')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Download as Markdown
                  </button>
                  <button
                    onClick={() => handleDownload('html')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Download as HTML
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Stats */}
      {aiOutput && (
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                <span className="font-medium text-gray-900">{aiOutput.split(/\s+/).filter(word => word.length > 0).length}</span> words
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-gray-900">{aiOutput.length}</span> characters
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-gray-900">{aiOutput.split(/\n\n/).filter(para => para.trim().length > 0).length}</span> paragraphs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <Check className="w-3 h-3" />
                Ready to use
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Professional quality
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-4 min-h-[300px] bg-white">
        {aiOutput ? (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="prose prose-sm max-w-none p-6">
              <ContentRenderer content={aiOutput} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[250px] text-center">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">Ready to create amazing content</h3>
            <p className="text-gray-600 text-sm max-w-md mb-4">
              Generate professional, ready-to-use content that will impress your audience
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Check className="w-3 h-3" />
              <span>Publication-ready quality</span>
              <span>•</span>
              <Check className="w-3 h-3" />
              <span>No editing required</span>
              <span>•</span>
              <Check className="w-3 h-3" />
              <span>Instant results</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {aiOutput && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Generated successfully</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{aiOutput.length} characters</span>
                <span>{aiOutput.split(' ').length} words</span>
                <span>{aiOutput.split('\n').length} lines</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputSection;
