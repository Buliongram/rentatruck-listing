import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./home/components/Header";
import Footer from "./home/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Homepage from "./home/pages/Homepage";

export default function App() {
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
