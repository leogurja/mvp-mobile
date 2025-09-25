"use client";

import type { Event, Park } from "@/generated/prisma";
import type { ColumnDef } from "@tanstack/react-table";

import DataTable from "../../molecules/data-table";
import Button from "../../atoms/button";
import EventForm from "./form";
import { deleteEvent } from "@/lib/actions/event";

interface EventTableProps {
  data: Event[];
  availableParks: Park[];
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

export default function EventTable({ data, availableParks }: EventTableProps) {
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "name",
      header: "Nome do Evento",
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => {
        const date = row.getValue("date");
        return <span>{dateFormatter.format(date as Date)}</span>;
      },
    },
    {
      accessorKey: "location",
      header: "Local",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const event = row.original;
        return (
          <>
            <EventForm event={event} availableParks={availableParks}>
              <Button variant="link">Editar</Button>
            </EventForm>
            <Button
              variant="link"
              className="text-red-600"
              onClick={() => deleteEvent(event.id)}
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
