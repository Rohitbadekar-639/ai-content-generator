import React, { useState } from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useContext } from "react";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Lock } from "lucide-react";
import UpgradeModal from "@/components/UpgradeModal";

function TemplateCard(items: TEMPLATE & { isPremium?: boolean; isAdmin?: boolean }) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { user } = useUser();
  const { userSubscription } = useContext(UserSubscriptionContext);

  // Use passed props or fallback to context
  const isPremiumUser = items.isPremium ?? (userSubscription?.active && userSubscription?.plan === "Professional");
  const isAdmin = items.isAdmin ?? (user?.primaryEmailAddress?.emailAddress === 'rohitbadekar555@gmail.com');

  // Check if template is locked
  const freeTemplates = [
    "Article Rewriter",
    "Blog Content Writer", 
    "Blog Title Generator",
    "Blog Topic Ideas",
    "Code Bug Detector",
    "Email Marketing Campaign",
    "SEO Meta Description",
    "Product Description Writer"
  ];
  
  const isLocked = !isAdmin && !isPremiumUser && !freeTemplates.includes(items.name);

  const handleCardClick = () => {
    if (isLocked) {
      setShowUpgradeModal(true);
    }
  };

  return (
    <>
      {isLocked ? (
        <div onClick={handleCardClick}>
          <div className="flex flex-col p-6 shadow-md rounded-md gap-2 cursor-pointer hover:scale-105 transition-all relative opacity-75">
            {/* Lock overlay */}
            <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
              <Lock className="w-4 h-4" />
            </div>
            
            <Image src={items.icon} alt="icon" width={50} height={50} />
            <h2 className="font-medium text-lg">{items.name}</h2>
            <p className="text-gray-500 line-clamp-3">{items.desc}</p>
            
            {/* Premium badge */}
            <div className="mt-auto">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                PREMIUM
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Link href={"/dashboard/content/" + items?.slug}>
          <div className="flex flex-col p-6 shadow-md rounded-md gap-2 cursor-pointer hover:scale-105 transition-all">
            <Image src={items.icon} alt="icon" width={50} height={50} />
            <h2 className="font-medium text-lg">{items.name}</h2>
            <p className="text-gray-500 line-clamp-3">{items.desc}</p>
          </div>
        </Link>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason="locked_template"
        templateName={items.name}
      />
    </>
  );
}

export default TemplateCard;
