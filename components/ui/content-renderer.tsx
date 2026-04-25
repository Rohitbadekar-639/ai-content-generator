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
    
    // Convert markdown to HTML with minimal spacing
    let htmlContent = cleanContent
      // Headers - reduced margins
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold text-gray-900 mb-2 mt-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-gray-900 mb-3 mt-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      
      // Code blocks and inline code - reduced padding
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 text-gray-800 p-3 rounded text-sm mb-3 overflow-x-auto"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono">$1</code>')
      
      // Lists (bullet points) - tighter spacing
      .replace(/^\* (.+)$/gim, '<li class="flex items-start mb-1"><span class="text-blue-500 mr-2 text-sm">•</span><span class="text-gray-700 text-sm">$1</span></li>')
      .replace(/^\d+\. (.+)$/gim, (match, content) => {
        const number = match.split('.')[0];
        return `<li class="flex items-start mb-1"><span class="text-blue-500 mr-2 text-sm font-semibold">${number}.</span><span class="text-gray-700 text-sm">${content}</span></li>`;
      })
      
      // Blockquotes - reduced padding
      .replace(/^> (.+)$/gim, '<blockquote class="border-l-3 border-blue-400 pl-3 py-2 my-2 bg-blue-50 text-gray-700 text-sm italic rounded">$1</blockquote>')
      
      // Line breaks and paragraphs - tighter spacing
      .replace(/\n\n/g, '</p><p class="text-gray-700 mb-3 text-sm leading-relaxed">')
      .replace(/\n/g, '<br />');
    
    // Wrap in paragraph tags if not already wrapped
    if (!htmlContent.startsWith('<h') && !htmlContent.startsWith('<li') && !htmlContent.startsWith('<blockquote') && !htmlContent.startsWith('<pre')) {
      htmlContent = `<p class="text-gray-700 mb-3 text-sm leading-relaxed">${htmlContent}</p>`;
    }
    
    // Wrap list items in proper lists
    const listItems = htmlContent.match(/<li class="flex items-start mb-1">.*?<\/li>/g);
    if (listItems && listItems.length > 0) {
      const listContent = listItems.join('');
      htmlContent = htmlContent.replace(/<li class="flex items-start mb-1">.*?<\/li>/g, '');
      htmlContent += `<ul class="space-y-1 mb-3 ml-4">${listContent}</ul>`;
    }
    
    // Remove excessive spacing and wrap in tight container
    const finalHtml = htmlContent
      .replace(/class="space-y-4"/g, 'class="space-y-2"')
      .replace(/mb-4/g, 'mb-2')
      .replace(/mt-6/g, 'mt-3')
      .replace(/mt-8/g, 'mt-4');
    
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
