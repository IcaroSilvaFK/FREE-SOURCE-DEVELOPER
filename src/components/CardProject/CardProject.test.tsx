import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import userEvent from "@testing-library/user-event";
import { CardProject } from ".";

const navigateFn = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual(
    "react-router-dom"
  )) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => navigateFn),
  };
});

describe("CardProject component test suite", () => {
  it("Should render a card project component", () => {
    render(
      <BrowserRouter>
        <CardProject
          project_name="Title"
          tecs={["test"]}
          user={{
            link_to_profile: "",
            email: "",
            username: "",
            avatar_url: "",
          }}
          created_at="2022-01-01T00:00:00.000Z"
          id="1"
          project_description="Description"
          link_to_social_media="Test"
          project_type="Front-end"
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Front-end/i)).toBeInTheDocument();
  });

  it("Should navigate on click in details link", async () => {
    render(
      <BrowserRouter>
        <CardProject
          project_name="Title"
          tecs={["test"]}
          user={{
            link_to_profile: "",
            email: "",
            username: "",
            avatar_url: "",
          }}
          created_at="2022-01-01T00:00:00.000Z"
          id="1"
          project_description="Description"
          link_to_social_media="Test"
          project_type="Front-end"
        />
      </BrowserRouter>
    );

    const detailsLink = screen.getByRole("button");

    await userEvent.click(detailsLink);

    expect(navigateFn).toHaveBeenCalled();
  });
});
