import Home from "./page";
import { render, screen } from "@testing-library/react";

describe("page", () => {
  it("renders a hello collapse", () => {
    expect.assertions(1);

    render(<Home />);
    expect(
      screen.getByRole("button", { name: /hello internet/i })
    ).toBeVisible();
  });
  it("renders a tech collapse", () => {
    expect.assertions(1);

    render(<Home />);

    expect(screen.getByRole("button", { name: /tech/i })).toBeVisible();
  });
});
