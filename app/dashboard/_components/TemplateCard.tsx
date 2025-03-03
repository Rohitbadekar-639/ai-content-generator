import React from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(items: TEMPLATE) {
  return (
    <Link href={"/dashboard/content/" + items?.slug}>
      <div className="flex flex-col p-6 shadow-md rounded-md gap-2 cursor-pointer hover:scale-105 transition-all">
        <Image src={items.icon} alt="icon" width={50} height={50} />
        <h2 className="font-medium text-lg">{items.name}</h2>
        <p className="text-gray-500 line-clamp-3">{items.desc}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;
