import { render, screen } from "@testing-library/react";

import { Chip } from ".";

describe("Chip component test suite", () => {
  it("Should render a chip component", () => {
    render(<Chip color="blue" type="outline" label="Test" />);

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it("Should to have a base class and modifier class", () => {
    render(<Chip color="blue" type="outline" label="Test" />);

    const chip = screen.getByText(/Test/i);

    expect(chip.classList).toHaveLength(2);
  });
});
