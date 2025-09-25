"use client";

import { usePathname } from "next/navigation";
import Button from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant="ghost" size="sm" className="w-full" asChild>
      <Link
        href={href}
        className={cn("block py-2 text-sm", {
          "text-blue-500": isActive,
          "text-gray-700": !isActive,
        })}
      >
        {children}
      </Link>
    </Button>
  );
}
