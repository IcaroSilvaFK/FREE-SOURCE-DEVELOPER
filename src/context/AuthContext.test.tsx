import { render } from "@testing-library/react";
import { vi } from "vitest";
import { userStore } from "../store/user.store";
import { AuthContextProvider } from "./AuthContext";

vi.mock("zustand", async () => {
  const actual = (await vi.importActual("zustand")) as typeof import("zustand");
  return {
    ...actual,
    createStore: vi.fn(() => ({
      ...actual.createStore(),
      setState: vi.fn(),
    })),
  };
});

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

const initialState = userStore.getState();

describe("AuthContext test suite", () => {
  it("Should be navigate to login when user is not logged", () => {
    userStore.setState(initialState);
    render(
      <AuthContextProvider>
        <p>Test</p>
      </AuthContextProvider>
    );

    expect(navigateFn).toHaveBeenCalled();
  });
  //TODO implement test with user has logged
  // it("Should not be navigate to login when user is logged", () => {
  //   userStore.setState({
  //     ...initialState,
  //     user: mockUser as IUserDTO,
  //   });

  //   vi.useFakeTimers();
  //   setTimeout(() => {
  //     render(
  //       <AuthContextProvider>
  //         <p>Test</p>
  //       </AuthContextProvider>
  //     );
  //     expect(navigateFn).not.toHaveBeenCalled();
  //   }, 2000);
  //   vi.runAllTimers();
  // });
});
