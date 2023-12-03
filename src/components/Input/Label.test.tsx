import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label test case suite", () => {
  it("Should render a label component", () => {
    render(<Label>Test</Label>);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("Should have hmlFor property", () => {
    render(<Label htmlFor="test">Test</Label>);

    expect(screen.getByText(/test/i)).toHaveAttribute("for", "test");
  });
});
