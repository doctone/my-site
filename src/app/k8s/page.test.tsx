import { describe, expect, it } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import K8sPage from "./page";

describe("K8s page", () => {
  it("renders the heading and the thermostat image", () => {
    render(<K8sPage />);

    expect(
      screen.getByRole("heading", {
        name: "Kubernetes, one thermostat at a time",
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("A thermostat set to 21°C"),
    ).toBeInTheDocument();
  });

  it("explains desired vs actual state using the thermostat analogy", () => {
    render(<K8sPage />);

    expect(screen.getByText(/desired state/i)).toBeInTheDocument();
    expect(screen.getByText(/actual state/i)).toBeInTheDocument();
    expect(
      screen.getByText(/keeps checking the room and correcting/i),
    ).toBeInTheDocument();
  });
});
