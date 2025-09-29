import { getEventById } from "@/lib/services/event";
import Image from "next/image";

export default async function EventPage({ params }: PageProps<"/events/[id]">) {
  const id = Number((await params).id);
  const event = await getEventById(id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold tracking-wide">{event.name}</h1>
      <Image
        unoptimized
        src={`https://picsum.photos/640/360?random=${event.id}`}
        alt={event.name}
        width={640}
        height={360}
        className="w-full h-auto object-cover rounded-md mt-4"
      />
      <time className="text-gray-600" dateTime={event.date.toISOString()}>
        {new Date(event.date).toLocaleDateString()}
      </time>
      <p className="mt-2">{event.description}</p>
    </div>
  );
}
