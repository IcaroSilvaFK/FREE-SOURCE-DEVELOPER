import { render, screen } from "@testing-library/react";
import { Container } from "./Container";
import { Item } from "./Item";

describe("Container component test suite", () => {
  it("Should render a container component", () => {
    render(<Container>Test</Container>);

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it("Should render all component container", () => {
    render(
      <Container>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
      </Container>
    );

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(2);
  });
});
