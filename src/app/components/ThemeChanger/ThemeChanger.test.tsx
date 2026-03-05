import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeChanger } from "./ThemeChanger";
import { vi } from "vitest";

const mockSetTheme = vi.fn();

vi.mock("next-themes", async () => {
  const actual = await vi.importActual<typeof import("next-themes")>(
    "next-themes"
  );

  return {
    ...actual,
    useTheme: () => ({
      ...actual,
      setTheme: mockSetTheme,
    }),
  };
});

describe("Theme Changer", () => {
  it("should render a theme changer component", () => {
    expect.assertions(1);

    render(<ThemeChanger />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should allow the user to toggle the theme", () => {
    expect.assertions(1);

    render(<ThemeChanger />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
