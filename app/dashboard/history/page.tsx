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

export interface HISTORY {
  id: string;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
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
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))
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
      item.aiResponse.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="p-2 m-2 text-2xl bg-transparent font-bold">
        Loading...
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
                {item.aiResponse.length > 100
                  ? item.aiResponse.substring(0, 100) + "..."
                  : item.aiResponse}
              </td>
              <td className="p-2">
                {moment(item.createdAt, "DD/MM/YYYY").format("DD/MM/YYYY")}
              </td>
              <td className="p-2">{item.aiResponse.length}</td>
              <td className="p-2">
                <Button
                  onClick={() => navigator.clipboard.writeText(item.aiResponse)}
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
