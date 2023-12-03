import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon component test suite", () => {
  it("Should render a icon component", () => {
    render(<Icon>Test</Icon>);

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });
});
