import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input component test suite", () => {
  it("Should render a input component", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should type in input", async () => {
    render(<Input />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Hello world");

    expect(input).toHaveValue("Hello world");
  });

  it("Should have type password property", async () => {
    render(<Input type="password" placeholder="Password" />);

    expect(screen.getByPlaceholderText("Password")).toHaveProperty(
      "type",
      "password"
    );
  });
});
