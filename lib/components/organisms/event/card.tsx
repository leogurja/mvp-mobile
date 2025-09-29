"use client";
import type { Event } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex flex-col p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <Image
        unoptimized
        src={`https://picsum.photos/320/180?random=${event.id}`}
        alt={event.name}
        width={320}
        height={180}
        className="w-full object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{event.name}</h3>
      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
        {event.description}
      </p>
    </Link>
  );
}
