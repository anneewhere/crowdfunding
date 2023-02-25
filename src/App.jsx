import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import ProjectSubmissionPage from "./pages/ProjectSubmissionPage";
import SignUpPage from "./pages/SignUpPage";

// Components
import Nav from "./components/Nav/Nav";

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
      // { path: "/pledges", element: <PledgePage /> },
      { path: "/submit-project", element: <ProjectSubmissionPage />},
      { path: "/signup", element: <SignUpPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;