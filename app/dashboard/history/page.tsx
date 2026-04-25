"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Download, Search, Filter, Calendar, FileText, Trash2, Eye, RefreshCw } from "lucide-react";
import ContentRenderer from "@/components/ui/content-renderer";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

function History() {
  const { user } = useUser();
  const [history, setHistory] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<HISTORY | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    user && fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;
      
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userEmail))
        .orderBy(desc(AIOutput.createdAt));
      setHistory(result);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((item) => {
    return (
      item.templateSlug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.aiResponse && item.aiResponse.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTemplateIcon = (slug: string) => {
    const iconMap: { [key: string]: string } = {
      "blog-content-generation": "📝",
      "generate-blog-title": "📰",
      "blog-topic-idea": "💡",
      "youtube-seo-title": "🎬",
      "youtube-description": "📺",
      "youtube-tag": "🏷️",
      "instagram-post-generator": "📸",
      "instagram-hash-tag-generator": "#️⃣",
      "instagram-post-idea-generator": "✨",
      "email-marketing-campaign": "📧",
      "product-description": "🛍️",
      "tagline-generator": "🏷️",
      "rewrite-article": "🔄",
      "text-improver": "✏️",
      "add-emoji-to-text": "😊",
      "english-grammer-checker": "📖",
      "write-code": "💻",
      "explain-code": "🔍",
      "code-bug-detector": "🐛",
      "seo-meta-description": "🔍"
    };
    return iconMap[slug] || "📄";
  };

  const getTemplateName = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (loading) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your content history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content History</h1>
            <p className="text-gray-600">Manage and reuse your previously generated AI content</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="bg-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="bg-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by template name or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full max-w-2xl bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{history.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Words</p>
              <p className="text-2xl font-bold text-gray-900">
                {history.reduce((acc, item) => acc + (item.aiResponse?.split(' ').length || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 text-green-600 font-bold">W</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {history.filter(item => moment(item.createdAt, "DD/MM/YYYY").isSame(moment(), 'month')).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Filtered</p>
              <p className="text-2xl font-bold text-gray-900">{filteredHistory.length}</p>
            </div>
            <Filter className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No content found</h3>
          <p className="text-gray-400">
            {searchQuery ? "Try adjusting your search terms" : "Start generating content to see your history here"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTemplateIcon(item.templateSlug)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{getTemplateName(item.templateSlug)}</h3>
                      <p className="text-sm text-gray-500">
                        {item.createdAt ? moment(item.createdAt, "DD/MM/YYYY").format("MMM DD, YYYY") : "No date"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.aiResponse ? (
                      item.aiResponse.length > 150
                        ? item.aiResponse.substring(0, 150) + "..."
                        : item.aiResponse
                    ) : (
                      <span className="italic text-gray-400">No content generated</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {item.aiResponse?.split(' ').length || 0} words
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item.aiResponse?.length || 0} chars
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedItem(item)}
                      disabled={!item.aiResponse}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => item.aiResponse && handleCopy(item.aiResponse)}
                      disabled={!item.aiResponse}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => item.aiResponse && handleDownload(item.aiResponse, getTemplateName(item.templateSlug))}
                      disabled={!item.aiResponse}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Template</th>
                  <th className="text-left p-4 font-medium text-gray-700">Content Preview</th>
                  <th className="text-left p-4 font-medium text-gray-700">Date</th>
                  <th className="text-left p-4 font-medium text-gray-700">Words</th>
                  <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTemplateIcon(item.templateSlug)}</span>
                        <span className="font-medium text-gray-900">{getTemplateName(item.templateSlug)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {item.aiResponse ? (
                          item.aiResponse.length > 100
                            ? item.aiResponse.substring(0, 100) + "..."
                            : item.aiResponse
                        ) : (
                          <span className="italic text-gray-400">No content</span>
                        )}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {item.createdAt ? moment(item.createdAt, "DD/MM/YYYY").format("MMM DD, YYYY") : "N/A"}
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-900">
                        {item.aiResponse?.split(' ').length || 0}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedItem(item)}
                          disabled={!item.aiResponse}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => item.aiResponse && handleCopy(item.aiResponse)}
                          disabled={!item.aiResponse}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for viewing full content */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {getTemplateName(selectedItem.templateSlug)}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedItem.createdAt ? moment(selectedItem.createdAt, "DD/MM/YYYY").format("MMMM DD, YYYY") : "No date"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedItem.aiResponse && handleCopy(selectedItem.aiResponse)}
                  disabled={!selectedItem.aiResponse}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedItem.aiResponse && handleDownload(selectedItem.aiResponse, getTemplateName(selectedItem.templateSlug))}
                  disabled={!selectedItem.aiResponse}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedItem(null)}>
                  ✕
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {selectedItem.aiResponse ? (
                <div className="prose prose-sm max-w-none">
                  <ContentRenderer content={selectedItem.aiResponse} />
                </div>
              ) : (
                <p className="text-gray-400 italic text-center py-8">No content available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
