import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Project from "./pages/Project";

export const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/project", element: <Project /> }
]);