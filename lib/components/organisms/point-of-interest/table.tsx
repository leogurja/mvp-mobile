"use client";

import type {
  Park,
  PointOfInterest,
  PointOfInterestType,
} from "@/generated/prisma";
import type { ColumnDef } from "@tanstack/react-table";

import DataTable from "../../molecules/data-table";
import Button from "../../atoms/button";
import PointOfInterestForm from "./form";
import { deletePointOfInterest } from "@/lib/services/point-of-interest";
import { use } from "react";

interface PointOfInterestTableProps {
  data: Promise<PointOfInterest[]>;
  availableParks: Promise<Park[]>;
  pointOfInterestTypes: Promise<PointOfInterestType[]>;
}

export default function PointOfInterestTable({
  data,
  availableParks,
  pointOfInterestTypes,
}: PointOfInterestTableProps) {
  const parks = use(availableParks);
  const columns: ColumnDef<PointOfInterest>[] = [
    {
      accessorKey: "name",
      header: "Nome do ponto de interesse",
    },
    {
      accessorKey: "parkId",
      header: "Parque",
      cell: ({ cell }) => {
        const parkId = cell.getValue();
        return <span>{parks.find((p) => p.id === parkId)?.name ?? "N/A"}</span>;
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ cell }) => (
        <span className="truncate">{cell.getValue<string>()}</span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const pointOfInterest = row.original;
        return (
          <>
            <PointOfInterestForm
              pointOfInterest={pointOfInterest}
              pointOfInterestTypes={pointOfInterestTypes}
              availableParks={availableParks}
            >
              <Button variant="link">Editar</Button>
            </PointOfInterestForm>
            <Button
              variant="link"
              className="text-red-600"
              onClick={() => deletePointOfInterest(pointOfInterest.id)}
            >
              Excluir
            </Button>
          </>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} />;
}
