import type { PointOfInterestType, PointOfInterest } from "@/generated/prisma";
import PoiCard from "@/lib/components/organisms/point-of-interest/card";

interface PoiTypeProps {
  pointsOfInterest: PointOfInterest[];
  type: PointOfInterestType;
}

const poiTypeTitles: Record<PointOfInterestType, string> = {
  WATERFALL: "Cachoeiras",
  TRAIL: "Trilhas",
  VIEWPOINT: "Mirantes",
  CAMPSITE: "Camping",
  OTHER: "Outros",
};

export default function PoiType({ pointsOfInterest, type }: PoiTypeProps) {
  const filteredPois = pointsOfInterest.filter((poi) => poi.type === type);
  if (filteredPois.length === 0) return null;

  return (
    <section className="mt-6" key={type}>
      <h2 className="text-xl font-semibold py-2">{poiTypeTitles[type]}</h2>

      {filteredPois.map((poi) => (
        <PoiCard poi={poi} key={poi.id} />
      ))}
    </section>
  );
}
