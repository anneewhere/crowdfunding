import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import PledgePage from "./pages/PledgePage";
import ProjectSubmissionPage from "./pages/ProjectSubmissionPage";

// Components
import Nav from "./components/Nav/nav";

import { useState } from "react";

// CSS
import "./App.css";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage />},
      { path: "/project/:id", element: <ProjectPage /> }, //putting an "id" in our path parameter gives its own unique URL
      { path: "/pledges", element: <PledgePage /> },
      { path: "/projects/", element: <ProjectSubmissionPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;