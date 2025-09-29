import EventCard from "@/lib/components/organisms/event/card";
import { getEventsByParkId } from "@/lib/services/event";

interface EventsProps {
  parkId: number;
}

export default async function Events({ parkId }: EventsProps) {
  const events = await getEventsByParkId(parkId);

  if (events.length === 0) {
    return <p>Nenhum evento programado.</p>;
  }

  return (
    <ul>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}
