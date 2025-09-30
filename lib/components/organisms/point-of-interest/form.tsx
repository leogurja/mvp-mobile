"use client";

import {
  createPointOfInterest,
  updatePointOfInterest,
} from "@/lib/services/point-of-interest";
import {
  pointOfInterestSchema,
  type PointOfInterestSchema,
} from "@/lib/schemas/point-of-interest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../atoms/button";
import * as Dialog from "../../atoms/dialog";
import { use, useState, type ReactNode } from "react";
import type { Park, PointOfInterestType } from "@/generated/prisma";
import Select from "../../atoms/select";
import Form from "../../atoms/form";
import { Input } from "../../atoms/input";
import Textarea from "../../atoms/textarea";

interface PointOfInterestFormProps {
  pointOfInterest?: PointOfInterestSchema & { id: number };
  pointOfInterestTypes: Promise<PointOfInterestType[]>;
  availableParks: Promise<Park[]>;
  children: ReactNode;
}

export default function PointOfInterestForm({
  pointOfInterest,
  availableParks,
  pointOfInterestTypes,
  children,
}: PointOfInterestFormProps) {
  const parks = use(availableParks);
  const poiTypes = use(pointOfInterestTypes);
  const [open, setOpen] = useState(false);
  const form = useForm<PointOfInterestSchema>({
    resolver: zodResolver(pointOfInterestSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      ...pointOfInterest,
    },
  });

  const onSubmit = async (data: PointOfInterestSchema) => {
    console.log(data);
    if (pointOfInterest) {
      await updatePointOfInterest(pointOfInterest.id, data);
    } else {
      await createPointOfInterest(data);
    }

    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Criar Novo Ponto de Interesse</Dialog.Title>
        </Dialog.Header>
        <Form.Root {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 py-4">
            <Form.Field
              name="name"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control>
                    <Input
                      placeholder="Nome do Ponto de interesse"
                      {...field}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="description"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Breve descrição</Form.Label>
                  <Form.Control>
                    <Textarea {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="type"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                    >
                      <Select.Trigger className="w-full">
                        <Select.Value placeholder="Selecione o Tipo" />
                      </Select.Trigger>
                      <Select.Content className="w-full">
                        {poiTypes.map((type) => (
                          <Select.Item key={type.id} value={type.id.toString()}>
                            {type.singular}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="parkId"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Parque</Form.Label>
                  <Form.Control>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        (field.value as number | undefined)?.toString() ?? ""
                      }
                    >
                      <Select.Trigger className="w-full">
                        <Select.Value placeholder="Selecione o Parque" />
                      </Select.Trigger>
                      <Select.Content className="w-full">
                        {parks.map((park) => (
                          <Select.Item key={park.id} value={park.id.toString()}>
                            {park.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Button
              type="reset"
              onClick={() => setOpen(false)}
              variant="ghost"
              className="w-full"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default" className="w-full">
              Salvar Ponto de interesse
            </Button>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
