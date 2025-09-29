"use client";
import type { PointOfInterest } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";

interface PoiCardProps {
  poi: PointOfInterest;
}

export default function PoiCard({ poi }: PoiCardProps) {
  return (
    <Link
      href={`/points-of-interest/${poi.id}`}
      className="flex flex-col p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <Image
        unoptimized
        src={`https://picsum.photos/320/180?random=${poi.id}`}
        alt={poi.name}
        width={320}
        height={180}
        className="w-full object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{poi.name}</h3>
      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
        {poi.description}
      </p>
    </Link>
  );
}
