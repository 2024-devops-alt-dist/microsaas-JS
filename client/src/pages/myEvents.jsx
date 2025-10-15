import EventCard from "../features/eventFeature/components/EventCard";

export default function myEvents() {
  return (
    <>
      <div className="flex flex-col justify-start items-center">
        <h1 className="abril-fatface-regular my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Mes événements
        </h1>
        <p className="mb-6 p-3 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          Cliquez sur un événement festif pour accéder à ses détails
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </>
  );
}
