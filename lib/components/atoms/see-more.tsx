"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SeeMore({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <p className={cn("transition-discrete", isExpanded || "line-clamp-3")}>
        {children}
      </p>
      <button
        type="button"
        className="text-green-700 font-medium mt-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Ver menos" : "Ver mais"}
      </button>
    </div>
  );
}
