import React from "react";
import { render, screen, within } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the minimal profile", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Hey, I'm Sam", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/finds the signal in everyone else's noise/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/still improvising, just with better tests/i),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Portrait of Sam James")).toBeInTheDocument();
  });

  it("links to Sam's contact profiles", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/doctone",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/sam-james1991/",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:samjojames@gmail.com",
    );
  });

  it("tells Sam's story from the piano to software", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /my story/i })).toHaveAttribute(
      "href",
      "#story",
    );
    expect(
      screen.getByRole("heading", { name: "My story", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/only 88 keys on a piano/i)).toBeInTheDocument();
    expect(
      screen.getByText(/the right parameters give you/i),
    ).toBeInTheDocument();
  });

  it("lists what Sam is building and the stack behind it", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "What I'm building", level: 2 }),
    ).toBeInTheDocument();

    const work = screen.getByRole("heading", { name: "Work", level: 3 })
      .nextElementSibling as HTMLElement;
    const stack = screen.getByRole("heading", { name: "Stack", level: 3 })
      .nextElementSibling as HTMLElement;

    expect(within(work).getAllByRole("listitem")).toHaveLength(4);
    expect(within(work).getByText(/entity extraction/i)).toBeInTheDocument();
    expect(within(stack).getAllByRole("listitem")).toHaveLength(3);
    expect(
      within(stack).getByText(/temporal-orchestrated/i),
    ).toBeInTheDocument();
  });
});
