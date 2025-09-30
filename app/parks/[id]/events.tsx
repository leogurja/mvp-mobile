import EventCard from "@/lib/components/organisms/event/card";
import { getEventsByParkId } from "@/lib/services/event";
import * as Accordion from "@/lib/components/atoms/accordion";

interface EventsProps {
  parkId: number;
}

export default async function Events({ parkId }: EventsProps) {
  const events = await getEventsByParkId(parkId);

  if (events.length === 0) {
    return <p>Nenhum evento programado.</p>;
  }

  return (
    <Accordion.Item value="events">
      <Accordion.Trigger className="text-xl font-semibold py-2">
        Eventos
      </Accordion.Trigger>
      <Accordion.Content>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
}
