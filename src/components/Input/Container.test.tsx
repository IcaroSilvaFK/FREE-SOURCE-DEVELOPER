import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Label } from "./Label";

describe("Container component test suite", () => {
  it("Should render a container component", () => {
    render(<Container>Test</Container>);

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it("Should render all component input container", () => {
    render(
      <Container>
        <Label>Label</Label>
        <Input />
        <Icon>Icon</Icon>
      </Container>
    );

    expect(screen.getByText(/Label/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText(/Icon/i)).toBeInTheDocument();
  });

  it("Should render all component input container and type input", async () => {
    render(
      <Container>
        <Label>Label</Label>
        <Input />
        <Icon>Icon</Icon>
      </Container>
    );

    const input = screen.getByRole("textbox");
    const inputValue = "Hello world";

    await userEvent.type(input, inputValue);

    expect(input).toHaveValue(inputValue);
  });
});
