import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import ProjectSubmissionPage from "./pages/ProjectSubmissionPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

// Components
import Nav from "./components/Nav/Nav.jsx";
import Footer from "./components/Footer/footer.jsx";

import { useState, useEffect } from "react";

// CSS
import "./App.css";
import ProjectEditPage from "./pages/ProjectEditPage";

const Layout = () => {
  const [authToken, setAuthToken] = useState(window.localStorage.getItem("token") !=null)
  console.log("test")
  return (
    <>
      <Nav authToken={authToken} setAuthToken={setAuthToken} />
      <Outlet context={[authToken, setAuthToken]} />
      <Footer />
    </>
  );
}

// const [user, setUser] = useState();
//   useEffect(() => {
//     const authToken = window.localStorage.getItem("token");
//     fetch(`${import.meta.env.VITE_API_URL}<int:pk>/`, {
//       method: "get",
//       headers: {
//         Authorization: `Token ${authToken}`,
//       },
//     })
//       .then((results) => {
//         return results.json();
//       })
//       .then((data) => {
//         setUser(data);
//       });
//   }, [loggedIn]); 


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
      { path: "/edit-project", element: <ProjectEditPage />},
      { path: "profile/", element: <ProfilePage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;