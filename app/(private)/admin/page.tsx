import EventForm from "@/lib/components/organisms/event/form";
import EventTable from "@/lib/components/organisms/event/table";
import Button from "@/lib/components/atoms/button";
import { getAllParks } from "@/lib/services/parks";
import { getAllEvents } from "@/lib/services/event";
import PointOfInterestForm from "@/lib/components/organisms/point-of-interest/form";
import PointOfInterestTable from "@/lib/components/organisms/point-of-interest/table";
import { getAllPointsOfInterest } from "@/lib/services/point-of-interest";
import CreateUserForm from "@/lib/components/organisms/user/create-form";
import UserTable from "@/lib/components/organisms/user/table";
import { getAllUsers } from "@/lib/services/user";
import { requireAuth } from "@/lib/require-auth";
import { getAllPointOfInterestTypes } from "@/lib/services/point-of-interest-types";

export default async function AdminPage() {
  const user = await requireAuth();
  const events = getAllEvents();
  const parks = getAllParks();
  const pointsOfInterest = getAllPointsOfInterest();
  const pointOfInterestTypes = getAllPointOfInterestTypes();
  const users = getAllUsers();

  return (
    <main className="container mx-auto flex flex-col gap-5 mt-5">
      <section className="flex flex-col px-2">
        <CreateUserForm>
          <Button className="self-end mb-4">Criar Usuário</Button>
        </CreateUserForm>
        <UserTable data={users} loggedUserId={user.id} />
      </section>
      <section className="flex flex-col px-2">
        <EventForm availableParks={parks}>
          <Button className="self-end mb-4">Criar Evento</Button>
        </EventForm>
        <EventTable data={events} availableParks={parks} />
      </section>
      <section className="flex flex-col px-2">
        <PointOfInterestForm
          availableParks={parks}
          pointOfInterestTypes={pointOfInterestTypes}
        >
          <Button className="self-end mb-4">Criar Ponto de Interesse</Button>
        </PointOfInterestForm>
        <PointOfInterestTable
          data={pointsOfInterest}
          availableParks={parks}
          pointOfInterestTypes={pointOfInterestTypes}
        />
      </section>
    </main>
  );
}
