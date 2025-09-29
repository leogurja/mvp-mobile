import type { PointOfInterestType, PointOfInterest } from "@/generated/prisma";
import PoiCard from "@/lib/components/organisms/point-of-interest/card";

interface PoiTypeProps {
  pointsOfInterest: PointOfInterest[];
  type: PointOfInterestType;
}

export default function PoiType({ pointsOfInterest, type }: PoiTypeProps) {
  const filteredPois = pointsOfInterest.filter((poi) => poi.typeId === type.id);
  if (filteredPois.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold py-2">{type.plural}</h2>

      {filteredPois.map((poi) => (
        <PoiCard poi={poi} key={poi.id} />
      ))}
    </section>
  );
}
