import React from "react";
import Home from "./page";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock(
  "ai/react",
  () => ({
    useChat: () => ({
      messages: [
        {
          id: "sam-intro",
          role: "assistant",
          content:
            "Hi, I'm Sam's AI assistant. Ask me about Sam's experience, stack, architecture approach, or project fit.",
        },
      ],
      input: "",
      handleInputChange: () => {},
      handleSubmit: (e: any) => e.preventDefault(),
      isLoading: false,
      error: undefined,
      setInput: () => {},
    }),
  }),
  { virtual: true }
);

// Mock framer-motion
vi.mock("framer-motion", () => {
  const React = require("react");

  const makeMotion = (tag: string) => {
    const Component = React.forwardRef(
      (
        {
          children,
          whileInView,
          initial,
          viewport,
          transition,
          animate,
          ...props
        }: any,
        ref: any
      ) => React.createElement(tag, { ref, ...props }, children)
    );
    Component.displayName = `Motion${tag}`;
    return Component;
  };

  const motion = new Proxy(
    {},
    {
      get: (_target, key: string) => makeMotion(key),
    }
  );

  return {
    motion,
    useScroll: () => ({
      scrollYProgress: { get: () => 0, set: () => {} },
    }),
    useTransform: () => ({ get: () => 1, set: () => {} }),
  };
});

beforeAll(() => {
  class MockIntersectionObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  }
  (global as any).IntersectionObserver = MockIntersectionObserver;
});

describe("Home Page", () => {
  it("renders the hero title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /SAM\s+JAMES/i, level: 1 })).toBeInTheDocument();
  });

  it("renders the section headings", () => {
    render(<Home />);
    expect(screen.getByText(/Building digital/i)).toBeInTheDocument();
    expect(screen.getByText(/Building AI for/i)).toBeInTheDocument();
  });

  it("renders project titles", () => {
    render(<Home />);
    expect(screen.getByText(/Carbon Accounting Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise Payments System/i)).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Home />);
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
    expect(screen.getByText(/samjojames@gmail.com/i)).toBeInTheDocument();
  });

  it("opens the chat assistant panel from the floating launcher", () => {
    render(<Home />);
    const launcher = screen.getByRole("button", {
      name: /Open chat with Sam's AI assistant/i,
    });

    fireEvent.click(launcher);

    expect(
      screen.getByRole("heading", { name: /Ask What Sam Builds/i, level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask what Sam built/i)).toBeInTheDocument();
  });
});
