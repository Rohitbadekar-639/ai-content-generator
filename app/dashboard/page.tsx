"use client";
import React, { useState, useEffect } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  useEffect(() => {
    // Listen for search events from header
    const handleHeaderSearch = (event: CustomEvent) => {
      setUserSearchInput(event.detail);
    };

    window.addEventListener('dashboardSearch', handleHeaderSearch as EventListener);
    
    // Check for URL search parameter on load
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = urlParams.get('search');
    if (searchFromUrl) {
      setUserSearchInput(searchFromUrl);
    }

    return () => {
      window.removeEventListener('dashboardSearch', handleHeaderSearch as EventListener);
    };
  }, []);

  return (
    <div>
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
      <TemplateListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
