import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FestiveEvent } from "../../entities";
import { apiFetch } from "../../utils/api";
import { useAuth } from "../../utils/authContext";

interface ParticipantGift {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  product_link: string | null;
  is_offered: boolean;
  multiple_gifters: boolean;
}

interface EventParticipant {
  id: number;
  name: string;
  gifts: ParticipantGift[];
}

export default function FestiveEventPage() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useAuth();

  const [eventData, setEventData] = useState<FestiveEvent | null>(null);
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setCurrentUserId(null);
      return;
    }

    try {
      const payload = token.split(".")[1];
      const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(normalized)) as { id?: number };
      setCurrentUserId(decoded.id ?? null);
    } catch {
      setCurrentUserId(null);
    }
  }, [token]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!router.isReady) {
        return;
      }

      const eventId = Number(id);
      if (!eventId || Number.isNaN(eventId)) {
        setError("Evenement introuvable.");
        setLoading(false);
        return;
      }

      try {
        const [eventRes, participantsRes] = await Promise.all([
          apiFetch(`/api/v1/festiveEvent/${eventId}`),
          apiFetch(`/api/v1/festiveEvent/${eventId}/participants`),
        ]);

        if (!eventRes.ok || !participantsRes.ok) {
          throw new Error("Unable to load event");
        }

        const body = (await eventRes.json()) as { data?: FestiveEvent };
        const participantsBody = (await participantsRes.json()) as {
          data?: EventParticipant[];
        };

        if (!body.data) {
          setError("Evenement introuvable.");
          setLoading(false);
          return;
        }

        setEventData(body.data);
        setParticipants(participantsBody.data ?? []);
      } catch {
        setError("Impossible de charger cet evenement.");
      } finally {
        setLoading(false);
      }
    };

    void fetchEvent();
  }, [id, router.isReady]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Chargement de l&apos;evenement...</p>
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-600">{error ?? "Evenement introuvable."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center p-4">
      <h1 className="abril-fatface-regular my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        {eventData.title}
      </h1>
      <p className="mb-6 p-3 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-center">
        {eventData.description}
      </p>
      <section className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
          Participants
        </h2>
        {participants.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun participant pour le moment.
          </p>
        ) : (
          <ul className="bg-white border border-orange-200 rounded-lg divide-y divide-orange-100">
            {participants.map((participant) => (
              <li key={participant.id} className="px-4 py-3 text-gray-800">
                <p className="font-semibold">{participant.name}</p>
                {participant.gifts.length === 0 ? (
                  <p className="text-sm text-gray-500 mt-1">
                    Aucun cadeau souhaite.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {participant.gifts.map((gift) => (
                      <li
                        key={gift.id}
                        className="border border-orange-100 rounded-md p-3 bg-orange-50/40"
                      >
                        <p className="font-medium text-gray-900">
                          {gift.title}
                        </p>
                        {gift.description && (
                          <p className="text-sm text-gray-700 mt-1">
                            {gift.description}
                          </p>
                        )}
                        {gift.image_url && (
                          <Image
                            src={gift.image_url}
                            alt={gift.title}
                            width={128}
                            height={128}
                            className="mt-2 h-32 w-32 object-cover rounded-md border border-orange-200"
                          />
                        )}
                        <div className="mt-2 text-sm text-gray-700 space-y-1">
                          {participant.id !== currentUserId && (
                            <>
                              <p>
                                Statut:{" "}
                                {gift.is_offered
                                  ? "Deja offert"
                                  : "Pas encore offert"}
                              </p>
                              <p>
                                Cadeau commun:{" "}
                                {gift.multiple_gifters ? "Oui" : "Non"}
                              </p>
                            </>
                          )}
                          {gift.product_link && (
                            <a
                              href={gift.product_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-700 hover:underline"
                            >
                              Voir le lien du cadeau
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
