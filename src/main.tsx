import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import "./css/global.scss";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
