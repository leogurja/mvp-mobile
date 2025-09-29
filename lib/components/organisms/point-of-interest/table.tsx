"use client";

import type { Park, PointOfInterest } from "@/generated/prisma";
import type { ColumnDef } from "@tanstack/react-table";

import DataTable from "../../molecules/data-table";
import Button from "../../atoms/button";
import PointOfInterestForm from "./form";
import { deletePointOfInterest } from "@/lib/services/point-of-interest";

interface PointOfInterestTableProps {
  data: PointOfInterest[];
  availableParks: Park[];
}

export default function PointOfInterestTable({
  data,
  availableParks,
}: PointOfInterestTableProps) {
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
        return (
          <span>
            {availableParks.find((p) => p.id === parkId)?.name ?? "N/A"}
          </span>
        );
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
