import PoiType from "./poi-type";
import { getPointsOfInterestByParkId } from "@/lib/services/point-of-interest";
import { getAllPointsOfInterestTypes } from "@/lib/services/point-of-interest-types";

interface PointsOfInterestProps {
  parkId: number;
}

export default async function PointsOfInterest({
  parkId,
}: PointsOfInterestProps) {
  const [pointsOfInterest, pointOfInterestTypes] = await Promise.all([
    getPointsOfInterestByParkId(parkId),
    getAllPointsOfInterestTypes(),
  ]);

  return pointOfInterestTypes.map((type) => (
    <PoiType key={type.id} pointsOfInterest={pointsOfInterest} type={type} />
  ));
}
