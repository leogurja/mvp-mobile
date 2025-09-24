"use client";

import { createEvent, updateEvent } from "@/lib/actions/event";
import { eventSchema, type EventSchema } from "@/lib/schemas/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../ui/button";
import * as Dialog from "../../ui/dialog";
import { useState, type ReactNode } from "react";
import type { Park } from "@/generated/prisma";
import Select from "../../ui/select";
import Form from "../../ui/form";
import { Input } from "../../ui/input";
import Textarea from "../../ui/textarea";

interface EventFormProps {
  event?: EventSchema & { id: number };
  availableParks: Park[];
  children: ReactNode;
}

export default function EventForm({
  event,
  availableParks,
  children,
}: EventFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    mode: "onBlur",
    defaultValues: {
      ...event,
    },
  });

  const onSubmit = async (data: EventSchema) => {
    console.log(data);
    if (event) {
      await updateEvent(event.id, data);
    } else {
      await createEvent(data);
    }

    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Criar Novo Evento</Dialog.Title>
        </Dialog.Header>
        <Form.Root {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 py-4">
            <Form.Field
              name="name"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control>
                    <Input placeholder="Nome do Evento" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="date"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Data do Evento</Form.Label>
                  <Form.Control>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value as string)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="location"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Local do Evento</Form.Label>
                  <Form.Control>
                    <Input placeholder="Local do Evento" {...field} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Form.Field
              name="description"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control>
                    <Textarea placeholder="Descrição do Evento" {...field} />
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
                        {availableParks.map((park) => (
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
              Salvar Evento
            </Button>
          </div>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
