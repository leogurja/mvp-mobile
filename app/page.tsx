import { getAllParks } from "@/lib/services/parks";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const parks = await getAllParks();

  return (
    <div className="font-sans max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Parques de Teresópolis</h1>
      <div className="flex flex-col gap-4">
        {parks.map((park) => (
          <Link
            key={park.id}
            href={`/parks/${park.id}`}
            className="border rounded-lg p-4 shadow-sm"
          >
            <Image
              unoptimized
              src={`https://picsum.photos/320/180?random=${park.id}`}
              alt={park.name}
              width={320}
              height={180}
              className="rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold">{park.name}</h2>
            <p className="text-gray-700">{park.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
