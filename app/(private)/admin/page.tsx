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

export default async function AdminPage() {
  const user = await requireAuth();

  const [events, parks, pointsOfInterest, users] = await Promise.all([
    getAllEvents(),
    getAllParks(),
    getAllPointsOfInterest(),
    getAllUsers(),
  ]);

  return (
    <main className="container mx-auto flex flex-col gap-5 mt-5">
      <section className="flex flex-col">
        <CreateUserForm>
          <Button className="self-end mb-4">Criar Usuário</Button>
        </CreateUserForm>
        <UserTable data={users} loggedUserId={user.id} />
      </section>
      <section className="flex flex-col">
        <EventForm availableParks={parks}>
          <Button className="self-end mb-4">Criar Evento</Button>
        </EventForm>
        <EventTable data={events} availableParks={parks} />
      </section>
      <section className="flex flex-col">
        <PointOfInterestForm availableParks={parks}>
          <Button className="self-end mb-4">Criar Ponto de Interesse</Button>
        </PointOfInterestForm>
        <PointOfInterestTable data={pointsOfInterest} availableParks={parks} />
      </section>
    </main>
  );
}
