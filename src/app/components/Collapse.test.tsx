import { render, screen } from "@testing-library/react";
import { Collapse } from "./Collapse";

describe("Collapse", () => {
  it("should render a collapse element", () => {
    expect.assertions(1);

    render(<Collapse buttonText="button" collapseText="content inside" />);

    expect(screen.getByRole("button", { name: /button/i })).toBeVisible();
  });
});
