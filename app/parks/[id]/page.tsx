import { PointOfInterestType } from "@/generated/prisma";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import PoiType from "./poi-type";

export default async function ParkPage({ params }: PageProps<"/parks/[id]">) {
  const id = Number((await params).id);

  const [park, pointsOfInterest, events] = await Promise.all([
    db.park.findUnique({ where: { id } }),
    db.pointOfInterest.findMany({ where: { parkId: id } }),
    db.event.findMany({
      where: { parkId: id, date: { gte: new Date() } },
      orderBy: { date: "asc" },
    }),
  ]);
  if (!park) notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold tracking-wide">{park.name}</h1>
      <p className="mt-2">{park.description}</p>

      {Object.keys(PointOfInterestType).map((type) => (
        <PoiType
          key={type}
          pointsOfInterest={pointsOfInterest}
          type={type as PointOfInterestType}
        />
      ))}

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Eventos</h2>
        {events.length === 0 ? (
          <p>Nenhum evento programado.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.name} - {event.date.toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
