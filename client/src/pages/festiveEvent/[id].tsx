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
  offering_user_ids: number[];
}

interface EventParticipant {
  id: number;
  name: string;
  gifts: ParticipantGift[];
}

function dedupeParticipantGifts(
  sourceParticipants: EventParticipant[],
): EventParticipant[] {
  return sourceParticipants.map((participant) => {
    const seenGiftIds = new Set<number>();
    const uniqueGifts = participant.gifts
      .map((gift) => ({
        ...gift,
        offering_user_ids: gift.offering_user_ids ?? [],
      }))
      .filter((gift) => {
        if (seenGiftIds.has(gift.id)) {
          return false;
        }
        seenGiftIds.add(gift.id);
        return true;
      });

    return { ...participant, gifts: uniqueGifts };
  });
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
  const [actionError, setActionError] = useState<string | null>(null);
  const [updatingGiftIds, setUpdatingGiftIds] = useState<Set<number>>(
    new Set(),
  );

  const handleToggleGiftOffered = async (
    participantId: number,
    giftId: number,
    isCurrentUserOffering: boolean,
  ) => {
    if (!token) {
      setActionError("Vous devez etre connecte pour modifier ce statut.");
      return;
    }

    setActionError(null);
    const nextIsOffered = !isCurrentUserOffering;
    setUpdatingGiftIds((prev) => new Set(prev).add(giftId));

    try {
      const response = await apiFetch(
        `/api/v1/gifts/${giftId}/toggle-offered`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_offered: nextIsOffered }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to update offered status");
      }

      const body = (await response.json()) as {
        data?: { is_offered?: boolean; offering_user_ids?: number[] };
      };
      const updatedIsOffered = body.data?.is_offered ?? nextIsOffered;
      const updatedOfferingUserIds = body.data?.offering_user_ids ?? [];

      setParticipants((prev) =>
        prev.map((participant) => {
          if (participant.id !== participantId) {
            return participant;
          }

          return {
            ...participant,
            gifts: participant.gifts.map((gift) =>
              gift.id === giftId
                ? {
                    ...gift,
                    is_offered: updatedIsOffered,
                    offering_user_ids: updatedOfferingUserIds,
                  }
                : gift,
            ),
          };
        }),
      );
    } catch {
      setActionError("Impossible de modifier le statut de ce cadeau.");
    } finally {
      setUpdatingGiftIds((prev) => {
        const next = new Set(prev);
        next.delete(giftId);
        return next;
      });
    }
  };

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
        setParticipants(dedupeParticipantGifts(participantsBody.data ?? []));
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
      {actionError && (
        <p className="mb-4 text-sm text-red-600">{actionError}</p>
      )}
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
                    {participant.gifts.map((gift) => {
                      const isCurrentUserOffering =
                        currentUserId !== null &&
                        gift.offering_user_ids.includes(currentUserId);

                      return (
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
                                <button
                                  type="button"
                                  onClick={() =>
                                    void handleToggleGiftOffered(
                                      participant.id,
                                      gift.id,
                                      isCurrentUserOffering,
                                    )
                                  }
                                  disabled={
                                    updatingGiftIds.has(gift.id) ||
                                    (gift.is_offered &&
                                      !gift.multiple_gifters &&
                                      !isCurrentUserOffering)
                                  }
                                  className="rounded border border-orange-200 bg-white px-2 py-1 text-left text-sm text-gray-800 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {isCurrentUserOffering
                                    ? "Annuler mon offre"
                                    : "Offrir ce cadeau"}
                                  {updatingGiftIds.has(gift.id) ? "..." : ""}
                                </button>
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
                      );
                    })}
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
