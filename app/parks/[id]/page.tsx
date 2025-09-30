import { findParkById, getAllParkIds } from "@/lib/services/parks";
import PointsOfInterest from "./points-of-interest";
import Events from "./events";
import SeeMore from "@/lib/components/atoms/see-more";
import * as Accordion from "@/lib/components/atoms/accordion";

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

      <h2 className="mt-4 mb-2 text-xl font-semibold">Biodiversidade</h2>
      <SeeMore>{park.biodiversity}</SeeMore>

      <Accordion.Root type="single" className="mt-6" collapsible>
        <PointsOfInterest parkId={park.id} />

        <Events parkId={park.id} />
      </Accordion.Root>
    </div>
  );
}
