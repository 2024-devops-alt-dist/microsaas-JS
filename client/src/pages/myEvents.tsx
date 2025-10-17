import EventCard from "../features/eventFeature/components/EventCard";
import { useEffect, useState } from "react";
import { FestiveEvent } from "../entities";

export default function MyEvents() {
  const [festiveEvents, setFestiveEvents] = useState<FestiveEvent[]>();

  useEffect(() => {
    setFestiveEvents([
      {
        id: 1,
        title: "Anniversaire Aurélie",
        description: "30 ans d'Aurélie chez Camille, venez le 27 juin...",
      },
      {
        id: 2,
        title: "Noël famille 2025",
        description: "Semaine à la montagne du 21 au 16 décembre",
      },
      {
        id: 3,
        title: "Pot de thèse Max",
        description:
          "Salut, c'est Axel, pour l'organisation du pot de thèse et des cadeaux pour Max !",
      },
      {
        id: 4,
        title: "30 ans Léo",
        description: "L'adresse du gîte : 1 chemin du Chêne... !",
      },
      {
        id: 5,
        title: "Père Noël secret",
        description: "Allez hop hop hop, chacun.e met sa liste !",
      },
    ]);
  }, []);

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
        {festiveEvents &&
          festiveEvents[0] &&
          festiveEvents.map((eventEl) => (
            <div key={eventEl.id} className="row-span-1">
              <EventCard event={eventEl} />
            </div>
          ))}
      </div>
    </div>
  );
}
