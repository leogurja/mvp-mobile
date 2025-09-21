import type { PointOfInterestType, PointOfInterest } from "@/generated/prisma";

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
      <h2 className="text-xl font-semibold">{poiTypeTitles[type]}</h2>
      <ul>
        {filteredPois.map((poi) => (
          <li key={poi.id}>
            <h3>{poi.name}</h3>
            <p>{poi.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
