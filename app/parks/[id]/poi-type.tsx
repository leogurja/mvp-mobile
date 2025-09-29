import type { PointOfInterestType, PointOfInterest } from "@/generated/prisma";
import PoiCard from "@/lib/components/organisms/point-of-interest/card";
import * as Accordion from "@/lib/components/atoms/accordion";

interface PoiTypeProps {
  pointsOfInterest: PointOfInterest[];
  type: PointOfInterestType;
}

export default function PoiType({ pointsOfInterest, type }: PoiTypeProps) {
  const filteredPois = pointsOfInterest.filter((poi) => poi.typeId === type.id);
  if (filteredPois.length === 0) return null;

  return (
    <Accordion.Item className="py-2" value={type.plural}>
      <Accordion.Trigger className="text-xl font-semibold py-2">
        {type.plural}
      </Accordion.Trigger>

      <Accordion.Content className="space-y-4">
        {filteredPois.map((poi) => (
          <PoiCard poi={poi} key={poi.id} />
        ))}
      </Accordion.Content>
    </Accordion.Item>
  );
}
