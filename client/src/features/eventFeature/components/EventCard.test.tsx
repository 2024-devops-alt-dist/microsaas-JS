import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";
import { FestiveEvent } from "@/entities";

const mockEvent: FestiveEvent = {
  id: 1,
  title: "Christmas Party",
  description: "A festive gathering",
};

describe("EventCard", () => {
  it("renders the event title and description", () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText("Christmas Party")).toBeInTheDocument();
    expect(screen.getByText("A festive gathering")).toBeInTheDocument();
  });

  it("renders with correct link attributes", () => {
    render(<EventCard event={mockEvent} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveClass(
      "h-full block max-w-sm p-5 bg-white border-2 border-orange-200 rounded-lg shadow-sm hover:bg-orange-100",
    );
  });
});
