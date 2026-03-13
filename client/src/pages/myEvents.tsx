import EventCard from "../features/eventFeature/components/EventCard";
import { useEffect, useState } from "react";
import { FestiveEvent } from "../entities";
import { apiFetch } from "../utils/api";
import { useAuth } from "../utils/authContext";
import { useRouter } from "next/router";

export default function MyEvents() {
  const [festiveEvents, setFestiveEvents] = useState<FestiveEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLogged } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!isLogged) {
        await router.push("/loginRegister");
        return;
      }

      try {
        setError(null);
        const res = await apiFetch("/api/v1/festiveEvent/mine");
        if (!res.ok) {
          throw new Error("Unable to load your events");
        }

        const body = (await res.json()) as { data?: FestiveEvent[] };
        setFestiveEvents(body.data ?? []);
      } catch {
        setError("Impossible de charger vos evenements pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    void fetchMyEvents();
  }, [isLogged, router]);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start items-center bg-white p-3">
        <h1 className="abril-fatface-regular my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Mes événements
        </h1>
        <p className="mb-6 p-3 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          Cliquez sur un événement festif pour accéder à ses détails
        </p>
      </div>
      <div className="grid auto-rows-fr grid-cols-3 gap-4">
        {loading && (
          <p className="text-gray-500">Chargement de vos événements...</p>
        )}

        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && festiveEvents.length === 0 && (
          <p className="text-gray-500">
            Aucun événement trouvé pour votre compte.
          </p>
        )}

        {!loading &&
          !error &&
          festiveEvents.map((eventEl) => (
            <div key={eventEl.id} className="row-span-1">
              <EventCard event={eventEl} />
            </div>
          ))}
      </div>
    </div>
  );
}
