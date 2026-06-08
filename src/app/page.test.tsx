import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the minimal profile", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Hey, I'm Sam", level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/intelligent products for complex/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/bringing clarity to complex enterprise systems/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText("Portrait of Sam James")).toBeInTheDocument();
  });

  it("links to Sam's contact profiles", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/doctone"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/sam-james1991/"
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:samjojames@gmail.com"
    );
  });
});
