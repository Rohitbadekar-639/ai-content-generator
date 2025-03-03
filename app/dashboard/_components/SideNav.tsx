"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import UsageTrack from "./UsageTrack";
import Link from "next/link";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen relative border p-6 shadow-sm bg-white">
      <div className="flex justify-center cursor-pointer">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={60}
          height={60}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <hr className="my-6 border" />
      <div className="mt-8">
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div
              className={`flex gap-2 mb-2 p-2
            hover:bg-primary hover:text-white cursor-pointer rounded-lg items-center
            ${path === menu.path && "bg-primary text-white"}
          `}
            >
              <menu.icon className="w-6 h-6" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-10 lef-0 right-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
