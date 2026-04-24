import React from "react";

interface ContentRendererProps {
  content: string | null;
  isPreview?: boolean;
  maxLength?: number;
}

export default function ContentRenderer({ content, isPreview = false, maxLength = 100 }: ContentRendererProps) {
  // Handle null/undefined content
  if (!content) {
    return isPreview ? (
      <span className="text-gray-400 italic">No content</span>
    ) : (
      <div className="text-gray-400 italic text-center py-8">No content available</div>
    );
  }

  // Universal content renderer for perfect formatting
  const renderContent = (content: string) => {
    // Clean and normalize content
    let cleanContent = content.trim();
    
    // Remove any existing HTML tags first (we'll add our own)
    cleanContent = cleanContent.replace(/<[^>]*>/g, '');
    
    // Convert markdown to HTML with consistent styling
    let htmlContent = cleanContent
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-800 mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      
      // Code blocks and inline code
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-pink-50 text-pink-600 px-2 py-1 rounded-md text-sm font-mono">$1</code>')
      
      // Lists (bullet points)
      .replace(/^\* (.+)$/gim, '<li class="flex items-start mb-2"><span class="text-blue-500 mr-2 mt-1">·</span><span class="text-gray-700">$1</span></li>')
      .replace(/^\d+\. (.+)$/gim, (match, content) => {
        const number = match.split('.')[0];
        return `<li class="flex items-start mb-2"><span class="text-blue-500 mr-2 mt-1 font-semibold">${number}.</span><span class="text-gray-700">${content}</span></li>`;
      })
      
      // Blockquotes
      .replace(/^> (.+)$/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-3 my-4 bg-blue-50 italic text-gray-700 rounded-r-lg">$1</blockquote>')
      
      // Line breaks and paragraphs
      .replace(/\n\n/g, '</p><p class="text-gray-700 mb-4 leading-relaxed">')
      .replace(/\n/g, '<br />');
    
    // Wrap in paragraph tags if not already wrapped
    if (!htmlContent.startsWith('<h') && !htmlContent.startsWith('<li') && !htmlContent.startsWith('<blockquote') && !htmlContent.startsWith('<pre')) {
      htmlContent = `<p class="text-gray-700 mb-4 leading-relaxed">${htmlContent}</p>`;
    }
    
    // Wrap list items in proper lists
    const listItems = htmlContent.match(/<li class="flex items-start mb-2">.*?<\/li>/g);
    if (listItems && listItems.length > 0) {
      const listContent = listItems.join('');
      htmlContent = htmlContent.replace(/<li class="flex items-start mb-2">.*?<\/li>/g, '');
      htmlContent += `<ul class="space-y-1 mb-4 ml-4">${listContent}</ul>`;
    }
    
    // Add container classes for consistent styling
    const finalHtml = `
      <div class="space-y-4">
        ${htmlContent}
      </div>
    `;
    
    return finalHtml;
  };

  // Handle preview mode
  if (isPreview && content.length > maxLength) {
    return (
      <span className="text-gray-700">
        {content.substring(0, maxLength)}...
      </span>
    );
  }

  return (
    <div 
      className="text-gray-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: renderContent(content) }}
    />
  );
}
