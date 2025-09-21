import db from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const parks = await db.park.findMany();
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
            <h2 className="text-lg font-semibold">{park.name}</h2>
            <p className="text-gray-700">{park.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
