import React, { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./home/components/Header";
import Footer from "./home/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

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
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={pageRoutes} />
    </>
  );
}
