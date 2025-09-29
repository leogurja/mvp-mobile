import { findParkById, getAllParkIds } from "@/lib/services/parks";
import PointsOfInterest from "./points-of-interest";
import { Suspense } from "react";
import Events from "./events";

export const revalidate = 86400; // 24 hours
export async function generateStaticParams() {
  return await getAllParkIds();
}

export default async function ParkPage({ params }: PageProps<"/parks/[id]">) {
  const id = Number((await params).id);

  // Park is guaranteed to exist because this page is only generated for existing parks
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const park = (await findParkById(id))!;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold tracking-wide">{park.name}</h1>
      <p className="mt-2">{park.description}</p>

      <Suspense>
        <PointsOfInterest parkId={park.id} />
      </Suspense>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Eventos</h2>
        <Suspense>
          <Events parkId={park.id} />
        </Suspense>
      </section>
    </div>
  );
}
