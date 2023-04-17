import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeChanger } from "./ThemeChanger";
import * as NextThemes from "next-themes";

const mockSetTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({
    ...jest.requireActual,
    setTheme: mockSetTheme,
  }),
}));

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
