"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
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

  if (loading) {
    return (
      <div className="p-2 m-2 text-2xl bg-transparent font-bold">
        Loading....
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <p className="mb-4">Search your previously generated AI content</p>

      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-2">TEMPLATE</th>
            <th className="p-2">AI RESPONSE</th>
            <th className="p-2">DATE</th>
            <th className="p-2">WORDS</th>
            <th className="p-2">COPY</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.templateSlug}</td>
              <td className="p-2">
                {item.aiResponse ? (
                  item.aiResponse.length > 100
                    ? item.aiResponse.substring(0, 100) + "..."
                    : item.aiResponse
                ) : (
                  <span className="text-gray-400 italic">No content</span>
                )}
              </td>
              <td className="p-2">
                {item.createdAt ? moment(item.createdAt, "DD/MM/YYYY").format("DD/MM/YYYY") : "N/A"}
              </td>
              <td className="p-2">{item.aiResponse?.length || 0}</td>
              <td className="p-2">
                <Button
                  onClick={() => item.aiResponse && navigator.clipboard.writeText(item.aiResponse)}
                  disabled={!item.aiResponse}
                >
                  <Copy />
                  Copy
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
