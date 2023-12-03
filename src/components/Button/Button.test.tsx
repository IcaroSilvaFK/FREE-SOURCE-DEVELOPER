import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Button } from ".";

const mockFunction = vi.fn();

describe("Button component test suite", () => {
  it("Should render a button component", () => {
    render(
      <Button variant="solid" color="red">
        Test
      </Button>
    );

    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });

  it("Should called function on click", () => {
    render(
      <Button variant="solid" color="red" onClick={mockFunction}>
        Test
      </Button>
    );

    act(() => {
      screen.getByText(/Test/i).click();
    });

    expect(mockFunction).toHaveBeenCalled();
  });

  it("Should to have property disabled", () => {
    render(
      <Button variant="solid" color="red" disabled onClick={mockFunction}>
        Test
      </Button>
    );
    expect(screen.getByText(/Test/i)).toHaveProperty("disabled", true);
  });

  it("Should have base class and modifier class", () => {
    render(
      <Button variant="solid" color="red" disabled onClick={mockFunction}>
        Test
      </Button>
    );

    const button = screen.getByText(/Test/i);

    const classList = button.classList;

    expect(classList).toHaveLength(2);
  });
});
