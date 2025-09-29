import { PointOfInterestType } from "@/generated/prisma";
import PoiType from "./poi-type";
import { getPointsOfInterestByParkId } from "@/lib/services/point-of-interest";

interface PointsOfInterestProps {
  parkId: number;
}

export default async function PointsOfInterest({
  parkId,
}: PointsOfInterestProps) {
  const pointsOfInterest = await getPointsOfInterestByParkId(parkId);

  return Object.keys(PointOfInterestType).map((type) => (
    <PoiType
      key={type}
      pointsOfInterest={pointsOfInterest}
      type={type as PointOfInterestType}
    />
  ));
}
