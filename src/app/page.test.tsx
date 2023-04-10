import Home from "./page";
import { render, screen } from "@testing-library/react";

describe("page", () => {
  it("renders", () => {
    expect.assertions(1);

    render(<Home />);
    expect(
      screen.getByRole("button", { name: /hello internet/i })
    ).toBeVisible();
  });
});
