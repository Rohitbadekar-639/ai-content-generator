import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-6 shadow-sm border-b-2 flex justify-between items-center bg-white">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-md bg-white">
        <Search />
        <input className="outline-none" type="text" placeholder="Search..." />
      </div>
      <div className="flex gap-6 items-center">
        <h2 className="bg-primary p-2 px-2 rounded-full text-xs text-white">🔥Join Membership for just $1.99/Month</h2>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
