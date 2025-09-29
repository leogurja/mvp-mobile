import PoiType from "./poi-type";
import { getPointsOfInterestByParkId } from "@/lib/services/point-of-interest";
import { getAllPointOfInterestTypes } from "@/lib/services/point-of-interest-types";
import * as Accordion from "@/lib/components/atoms/accordion";

interface PointsOfInterestProps {
  parkId: number;
}

export default async function PointsOfInterest({
  parkId,
}: PointsOfInterestProps) {
  const [pointsOfInterest, pointOfInterestTypes] = await Promise.all([
    getPointsOfInterestByParkId(parkId),
    getAllPointOfInterestTypes(),
  ]);

  return (
    <Accordion.Root type="single" className="mt-6" collapsible>
      {pointOfInterestTypes.map((type) => (
        <PoiType
          key={type.id}
          pointsOfInterest={pointsOfInterest}
          type={type}
        />
      ))}
    </Accordion.Root>
  );
}
