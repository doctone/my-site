import Home from "./page";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => {
  const React = require("react");

  const MotionSection = React.forwardRef(({ children, style, whileInView, initial, viewport, transition, ...props }: any, ref: any) => (
    <section ref={ref} {...props}>{children}</section>
  ));
  MotionSection.displayName = "MotionSection";

  const MotionDiv = React.forwardRef(({ children, style, whileInView, initial, viewport, transition, animate, ...props }: any, ref: any) => (
    <div ref={ref} {...props}>{children}</div>
  ));
  MotionDiv.displayName = "MotionDiv";

  const MotionH1 = React.forwardRef(({ children, style, whileInView, initial, viewport, transition, animate, ...props }: any, ref: any) => (
    <h1 ref={ref} {...props}>{children}</h1>
  ));
  MotionH1.displayName = "MotionH1";

  return {
    motion: {
      section: MotionSection,
      div: MotionDiv,
      h1: MotionH1,
    },
    useScroll: () => ({
      scrollYProgress: { get: () => 0, set: () => {} },
    }),
    useTransform: () => ({ get: () => 1, set: () => {} }),
  };
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
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
    expect(screen.getByText(/samjojames@gmail.com/i)).toBeInTheDocument();
  });
});
