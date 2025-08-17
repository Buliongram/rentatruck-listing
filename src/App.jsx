import React, { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./home/components/Header";
import Footer from "./home/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Homepage from "./home/pages/Homepage";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false});
  }, []);

  function PageLayout() {
    return (
      <>
        <Suspense>
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
      children: [{ path: "/", element: <Homepage /> }, {}],
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={pageRoutes} />
    </>
  );
}
