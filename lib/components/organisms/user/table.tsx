"use client";

import type { User } from "@/generated/prisma";
import type { ColumnDef } from "@tanstack/react-table";

import DataTable from "../../molecules/data-table";
import Button from "../../atoms/button";
import UpdateUserForm from "./update-form";
import { deleteUser } from "@/lib/services/user";

interface UserTableProps {
  data: Omit<User, "passwordDigest">[];
  loggedUserId: number;
}

export default function UserTable({ data, loggedUserId }: UserTableProps) {
  const columns: ColumnDef<Omit<User, "passwordDigest">>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <>
            <UpdateUserForm user={user}>
              <Button variant="link">Editar</Button>
            </UpdateUserForm>
            <Button
              variant="link"
              className="text-red-600"
              onClick={() => deleteUser(user.id)}
              disabled={user.id === loggedUserId}
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
