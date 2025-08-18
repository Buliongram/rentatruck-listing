import React, { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./home/components/Header";
import Footer from "./home/components/Footer";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./home/pages/Homepage";
import AOS from "aos";
import "aos/dist/aos.css";
import Agents from "./home/pages/Agents";
import Reviews from "./home/pages/Reviews";
import Neighborhood from "./home/pages/Neighborhood";
import About from "./home/pages/About";
import Contact from "./home/pages/Contact";
import Privacy from "./home/pages/Privacy";
import Terms from "./home/pages/Terms";
import Blogs from "./home/pages/Blogs";
import SingleBlog from "./home/pages/SingleBlog";
import BlogAuthor from "./home/pages/BlogAuthor";
import City from "./home/pages/City";
import Listings from "./home/pages/Listings";
import Categories from "./home/pages/Categories";
import SingleListing from "./home/pages/SingleListing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Gallery from "./home/pages/Gallery";
import ListingCategory from "./home/pages/ListingCategory";
import Faq from "./home/pages/Faq";
import AgentDetails from "./home/pages/AgentDetails";
import Preloader from "./components/Preloader";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./assets/store/userSlice";
import axios from "axios";

const UserDashboard = lazy(() => import("./dashboard/pages/UserDashboard"));

export default function App() {
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    const fetchUser = async () => {
      try {
        const url =
          window.location.hostname === "localhost"
            ? `http://localhost:5000/api/auth/verifyUser`
            : `https://rentahome-server.onrender.com/api/auth/verifyUser`;
        const res = await axios.get(url, { withCredentials: true });
        if (!res.data.error) {
          dispatch(updateUser(res.data.user));
        } else {
          dispatch(updateUser(null));
        }
      } catch {
        dispatch(updateUser(null));
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  function PageLayout() {
    return (
      <>
        <Suspense fallback={<Preloader />}>
          <Header />
          <Outlet />
          <Footer />
        </Suspense>
      </>
    );
  }

  function DashboardLayout() {
    const activeUser = useSelector((state) => state.user);

    if (loadingUser) {
      return <Preloader />;
    }

    if (!activeUser) {
      return <Navigate to={"/login"} />;
    }

    return (
      <Suspense fallback={<Preloader />}>
        <Header />
        <Outlet />
      </Suspense>
    );
  }

  const pageRoutes = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/agents", element: <Agents /> },
        { path: "/agent/single/:id", element: <AgentDetails /> },
        { path: "/reviews", element: <Reviews /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/faq", element: <Faq /> },
        { path: "/privacy-policy", element: <Privacy /> },
        {
          path: "/terms-of-service",
          element: <Terms />,
        },
        { path: "/blogs", element: <Blogs /> },
        { path: "/blog/:id", element: <SingleBlog /> },
        { path: "/blog/author/:id", element: <BlogAuthor /> },
        { path: "/neighborhood", element: <Neighborhood /> },
        { path: "/neighborhood/location/:id", element: <City /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/listings", element: <Listings /> },
        { path: "/listing/:id", element: <SingleListing /> },
        { path: "/listing/categories", element: <Categories /> },
        { path: "/listing/categories/:id", element: <ListingCategory /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [{ path: "/dashboard", element: <UserDashboard /> }],
    },
  ]);
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#09090b",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 16px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            minWidth: "fit-content",
            maxWidth: "300px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          },
        }}
      />
      <RouterProvider router={pageRoutes} />
    </>
  );
}
