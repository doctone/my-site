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
  it("should show a link to the sites github repository", () => {
    expect.assertions(1);

    render(<Home />);

    expect(
      screen.getByRole("link", {
        name: /checkout the code for this site here\./i,
      })
    ).toBeInTheDocument();
  });
});
