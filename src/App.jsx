import React, { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./home/components/Header";
import Footer from "./home/components/Footer";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
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

const AdminHeader = lazy(() => import("./admin/components/AdminHeader"));
const AdminStatistics = lazy(() => import("./admin/pages/AdminStatistics"));
const AdminLeads = lazy(() => import("./admin/pages/AdminLeads"));
const CreateListing = lazy(() => import("./admin/pages/CreateListing"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminSidebar = lazy(() => import("./admin/components/AdminSidebar"));
const AdminListings = lazy(() => import("./admin/pages/AdminListings"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers"));
const AdminAgents = lazy(() => import("./admin/pages/AdminAgents"));
const AdminOwners = lazy(() => import("./admin/pages/AdminOwners"));

const PanelHeader = lazy(() => import("./panel/components/PanelHeader"));
const PanelSidebar = lazy(() => import("./panel/components/PanelSidebar"));
const Settings = lazy(() => import("./panel/user/Settings"));
const Profile = lazy(() => import("./panel/user/Profile"));
const DashboadReviews = lazy(() => import("./panel/user/Reviews"));
const Wishlist = lazy(() => import("./panel/user/Wishlist"));
const Messages = lazy(() => import("./panel/user/Messages"));
const Support = lazy(() => import("./panel/user/Support"));
const UserDashboard = lazy(() => import("./panel/user/UserDashboard"));

export default function App() {
  const userRoles = [
    {
      role: "User",
      Route: "/dashboard",
    },
    {
      role: "Agent",
      Route: "/agency",
    },
    {
      role: "Admin",
      Route: "/admin",
    },
  ];

  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user);
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
    if (loadingUser) {
      return <Preloader />;
    }

    if (!activeUser) {
      return <Navigate to={"/login"} />;
    }
    const userRole = userRoles.find((r) => r.role === activeUser?.role);
    if (activeUser && userRole && userRole.Route !== "/dashboard") {
      return <Navigate to={userRole.Route} />;
    }

    return (
      <Suspense fallback={<Preloader />}>
        <PanelSidebar />
        <section className="lg:ml-[200px] bg-zinc-100/60 relative ">
          <PanelHeader />
          <main className="p-6 ">
            <Outlet />
          </main>
        </section>
      </Suspense>
    );
  }

  function AdminLayout() {
    if (loadingUser) {
      return <Preloader />;
    }

    if (!activeUser) {
      return <Navigate to={"/login"} />;
    }
    const userRole = userRoles.find((r) => r.role === activeUser?.role);
    if (activeUser && userRole && userRole.Route !== "/admin") {
      return <Navigate to={userRole.Route} />;
    }

    return (
      <Suspense fallback={<Preloader />}>
        {/* <AdminSidebar /> */}
        <section className=" bg-zinc-100/60 p-4 ">
          <AdminHeader />
          <main className="mt-4 ">
            <Outlet />
          </main>
        </section>
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
      children: [
        { path: "/dashboard", element: <UserDashboard /> },
        { path: "/dashboard/messages", element: <Messages /> },
        { path: "/dashboard/saved-items", element: <Wishlist /> },
        { path: "/dashboard/reviews", element: <DashboadReviews /> },
        { path: "/dashboard/support", element: <Support /> },
        { path: "/dashboard/profile", element: <Profile /> },
        { path: "/dashboard/security", element: <Settings /> },
        { path: "/dashboard/listings", element: <AdminListings /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "/admin", element: <AdminDashboard /> },
        { path: "/admin/messages", element: <Messages /> },
        { path: "/admin/saved-items", element: <Wishlist /> },
        { path: "/admin/reviews", element: <DashboadReviews /> },
        { path: "/admin/support", element: <Support /> },
        { path: "/admin/profile", element: <Profile /> },
        { path: "/admin/security", element: <Settings /> },
        { path: "/admin/enquiries", element: <AdminLeads /> },
        { path: "/admin/statistics", element: <AdminStatistics /> },
        { path: "/admin/create/listing", element: <CreateListing /> },
        { path: "/admin/listings", element: <AdminListings /> },
        { path: "/admin/users", element: <AdminUsers /> },
        { path: "/admin/agents", element: <AdminAgents /> },
        { path: "/admin/owners", element: <AdminOwners /> },
      ],
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
