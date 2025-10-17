import { FestiveEvent } from "@/entities";

interface Props {
  event: FestiveEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <a
      href="#"
      className="h-full block max-w-sm p-5 bg-white border-2 border-orange-200 rounded-lg shadow-sm hover:bg-orange-100"
      key={event.id && event.id}
    >
      <h5 className="mb-2 text-2xl abril-fatface-regular tracking-tight text-gray-900">
        {event.title && event.title}
      </h5>
      <p className="font-normal text-gray-700">
        {event.description && event.description}
      </p>
    </a>
  );
}
