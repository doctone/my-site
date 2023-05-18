import Home from "./page";
import { render, screen } from "@testing-library/react";

describe("page", () => {
  it("renders a title", () => {
    expect.assertions(1);

    render(<Home />);
    expect(screen.getByText("Sam James")).toBeVisible();
  });
});
