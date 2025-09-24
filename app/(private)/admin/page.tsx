import EventForm from "@/lib/components/system/event/form";
import EventTable from "@/lib/components/system/event/table";
import Button from "@/lib/components/ui/button";
import db from "@/lib/db";

export default async function AdminPage() {
  const [events, parks] = await Promise.all([
    db.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.park.findMany(),
  ]);

  return (
    <main className="container mx-auto flex flex-col">
      <EventForm availableParks={parks}>
        <Button className="self-end mb-4">Criar Evento</Button>
      </EventForm>
      <EventTable data={events} availableParks={parks} />
    </main>
  );
}
