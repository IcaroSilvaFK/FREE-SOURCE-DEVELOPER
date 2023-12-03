import { render, screen } from "@testing-library/react";
import { Item } from "./Item";

describe("Breadcrumbs/Item test suite", () => {
  it("Should render a item component", () => {
    render(<Item>Test</Item>);
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it("Should add class on active item", () => {
    render(<Item isActive>Test</Item>);

    const item = screen.getByRole("listitem");

    expect(item.classList).toHaveLength(2);
  });
});
