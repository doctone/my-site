import Home from "./page";
import { render, screen } from "@testing-library/react";

describe("page", () => {
  it("renders", () => {
    expect.assertions(1);

    render(<Home />);

    const heading = screen.getByRole("heading", { name: /docs \->/i });

    expect(heading).toBeVisible();
  });
});
