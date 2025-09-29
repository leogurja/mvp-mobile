import { getPointOfInterestById } from "@/lib/services/point-of-interest";
import Image from "next/image";

export default async function PointOfInterestPage({
  params,
}: PageProps<"/points-of-interest/[id]">) {
  const id = Number((await params).id);
  const poi = await getPointOfInterestById(id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold tracking-wide">{poi.name}</h1>
      <Image
        unoptimized
        src={`https://picsum.photos/640/360?random=${poi.id}`}
        alt={poi.name}
        width={640}
        height={360}
        className="w-full h-auto object-cover rounded-md mt-4"
      />
      <p className="mt-2">{poi.description}</p>
    </div>
  );
}
