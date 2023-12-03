import { render, screen } from "@testing-library/react";

import { act } from "react-dom/test-utils";
import { vi } from "vitest";
import { Header } from ".";

const removeUser = vi.fn();

vi.mock("../../store/user.store", () => ({
  userStore: () => ({
    user: {
      avatar_url: "",
      name: "Icaro Vieira",
      company: "React",
    },
    setUser: vi.fn(),
    removeUser,
  }),
}));

describe("Header component suite test", () => {
  it("Should render correctly", () => {
    render(<Header />);

    expect(screen.getByText(/Free Source Developer/)).toBeInTheDocument();
  });

  it("Should render user and company name", () => {
    render(<Header />);

    expect(screen.getByText(/Icaro Vieira/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  it("Should render user avatar", () => {
    render(<Header />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("Should call function sign out", () => {
    render(<Header />);

    const button = screen.getByRole("button");

    act(() => {
      button.click();
    });

    expect(removeUser).toHaveBeenCalled();
  });
});
