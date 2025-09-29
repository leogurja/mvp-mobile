"use client";

import { ChevronLeftIcon } from "lucide-react";
import Button from "../atoms/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function BackButton() {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  return (
    <Button
      onClick={() => history.back()}
      className={cn("text-sm transition-opacity p-0", isRoot && "opacity-0!")}
      disabled={isRoot}
    >
      <ChevronLeftIcon className="size-7" />
    </Button>
  );
}
