import { act, fireEvent, render, screen } from "@testing-library/react";
import { CollapseEx } from "./CollapseEx";

window.scrollTo = jest.fn();

describe("Collapse", () => {
  it("should render a collapse element", () => {
    expect.assertions(2);

    render(<CollapseEx buttonText="button">content inside</CollapseEx>);

    expect(screen.getByRole("button", { name: /button/i })).toBeVisible();
    expect(screen.queryByText("content inside")).not.toBeVisible();
  });
  it("should show the content inside when clicked", () => {
    expect.assertions(3);

    render(<CollapseEx buttonText="button">content inside</CollapseEx>);

    const button = screen.getByRole("button", { name: /button/i });
    expect(button).toBeVisible();
    expect(screen.queryByText("content inside")).not.toBeVisible();
    act(() => {
      fireEvent.click(button);
    });
    expect(screen.findByText("content inside")).toBeTruthy();
  });
});
