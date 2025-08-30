import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import NoRecord from "../../components/NoRecord";
import { BiSearch } from "react-icons/bi";
import { format, parseISO } from "date-fns";
import { MdOutlineMessage } from "react-icons/md";
import { IoEye, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { FaRegNewspaper, FaRegStar, FaStar } from "react-icons/fa";
import { FaCircleExclamation, FaXmark } from "react-icons/fa6";
import { LuBadgeCheck, LuBan } from "react-icons/lu";

export default function AdminBlogs() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({
    id: null,
    status: "",
  });
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleContent, setToggleContent] = useState({
    modal: false,
    content: "",
  });
  const cacheKey = `househunter-blog-cache-admin-dashboard-${user._id}`;
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const categories = [
    { name: "All" },
    { name: "Published" },
    { name: "Pending" },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      try {
        const {
          data: { lastUpdated },
        } = await axios.get(`${API_URL}/timestamp/blog/updatedAt`, {
          withCredentials: true,
        });

        if (cached && cached.lastUpdated === lastUpdated) {
          setBlogs(cached.data);
          return;
        }
        const { data } = await axios.get(`${API_URL}/blog/fetch/dashboard`, {
          withCredentials: true,
        });
        setBlogs(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, lastUpdated }));
      } catch (err) {
        toast.error("Failed to fetch blogs.", { id: "123" });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [cacheKey]);

  useEffect(() => {
    let filtered = blogs;
    if (statusFilter === "Pending") {
      filtered = blogs.filter((blog) => blog.status === "pending");
    } else if (statusFilter === "Published") {
      filtered = blogs.filter((blog) => blog.status === "published");
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBlogs(filtered);
  }, [statusFilter, blogs, searchTerm]);

  const confirmStatus = (id, status) => {
    setSelectedBlog({ id: id, status: status });
    setToggleStatus(true);
  };
  const confirmDelete = (blogId) => {
    setSelectedBlog({ id: blogId, status: "" });
    setToggleDelete(true);
  };

  const handleBlogDelete = async () => {
    if (!selectedBlog.id) return;
    toast.loading("Deleting blog...", { id: "123" });
    try {
      const res = await axios.post(
        `${API_URL}/blog/delete`,
        { blogId: selectedBlog.id },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "123" });
      } else {
        const { blogs, lastUpdated } = data;
        setBlogs(blogs);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: blogs, lastUpdated })
        );
        toast.success("Blog deleted successfully.", { id: "123" });
        setToggleDelete(false);
        setSelectedBlog({ id: null, status: "" });
      }
    } catch (error) {
      toast.error("Failed to delete blog.", { id: "123" });
    }
  };

  const handleBlogStatus = async () => {
    if (!selectedBlog.id && selectedBlog.status == "") return;
    toast.loading("Updating blog status...", { id: "123" });
    try {
      const res = await axios.put(
        `${API_URL}/blog/status`,
        { blogId: selectedBlog.id, status: selectedBlog.status },
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "123" });
      } else {
        const { blogs, lastUpdated, message } = data;
        setBlogs((blg) =>
          blg.map((blog) =>
            blog._id === selectedBlog.id
              ? {
                  ...blog,
                  status:
                    selectedBlog.status === "pending" ? "pending" : "published",
                }
              : blog
          )
        );
        setFilteredBlogs((blg) =>
          blg.map((blog) =>
            blog._id === selectedBlog.id
              ? {
                  ...blog,
                  status:
                    selectedBlog.status === "pending" ? "pending" : "published",
                }
              : blog
          )
        );
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: blogs, lastUpdated })
        );
        toast.success(message, { id: "123" });
        setToggleStatus(false);
        setSelectedBlog({ id: null, status: "" });
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to process your request. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("An unknown error occured. Please try again.", {
          id: "123",
        });
      }
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (!blogs || blogs.length < 1) {
    return <NoRecord />;
  }

  if (loading) {
    return <Loader />;
  }
  const tableHeaders = [
    "Date Created",
    "Title",
    "Author",
    "Excerpt",
    "Thumbnail",
    "Images",
    "Status",
    "Action",
  ];
  return (
    <>
      <article className="flex flex-col gap-5">
        <main className="flex flex-col divide-y divide-zinc-200 w-full p-5 bg-white rounded-3xl">
          <section className="flex items-center justify-between">
            <span className="text-2xl flex items-center gap-2 font-semibold pb-6">
              Blogs{" "}
              <span className="text-white bg-blue-600 p-1 px-2 rounded-lg text-xs">
                {blogs.length}
              </span>
            </span>

            <Link
              to={"/admin/blog/create"}
              className="rounded-xl px-6 py-2.5 flex items-center gap-1 cursor-pointer transition duration-200 bg-blue-600 text-white text-xs"
            >
              <FaRegNewspaper /> Create Blog
            </Link>
          </section>
          <section className="flex items-center justify-between pt-4">
            <main className="flex items-center gap-2 bg-zinc-100 rounded-full pl-4 p-2 w-full max-w-[350px]">
              <BiSearch />
              <input
                type="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search anything"
                className="placeholder:text-xs outline-none bg-transparent text-sm text-zinc-500 pr-6"
              />
            </main>
            <main className="flex items-center p-1 rounded-2xl w-max text-xs border-[1.5px] border-blue-600">
              {categories.map((filter) => (
                <span
                  key={filter.name}
                  onClick={() => setStatusFilter(filter.name)}
                  className={`rounded-xl px-6 py-1.5 cursor-pointer transition duration-200 ${
                    statusFilter === filter.name
                      ? "bg-blue-600 text-white"
                      : "hover:bg-white"
                  }`}
                >
                  {filter.name}
                </span>
              ))}
            </main>
          </section>
        </main>
        <main className="flex flex-col w-full bg-white rounded-3xl p-4">
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={header}>
                    <div className="flex items-center gap-0.5">
                      {header} <HiOutlineChevronUpDown />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="mt-4">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="table-row">
                  <td>{format(parseISO(blog.createdAt), "E, d MMMM yyyy")}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{`${blog.excerpt.slice(0, 50)}...`}</td>
                  <td>
                    <Link
                      to={blog.thumbnail.url}
                      className="h-8 w-8 rounded-lg flex border border-zinc-200 shrink"
                    >
                      <img
                        src={blog.thumbnail.url}
                        alt={blog.title}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </Link>
                  </td>
                  <td>
                    <main className="flex items-center gap-1">
                      <Link
                        to={blog.images[0].url}
                        className="h-8 w-8 rounded-lg flex border border-zinc-200 shrink"
                      >
                        <img
                          src={blog.images[0].url}
                          alt={blog.title}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </Link>
                      {blog.images[1] ? (
                        <Link
                          to={blog.images[1].url}
                          className="h-8 w-8 rounded-lg flex border border-zinc-200 shrink"
                        >
                          <img
                            src={blog.images[1].url}
                            alt={blog.title}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </Link>
                      ) : (
                        ""
                      )}

                      {blog.images[2] ? (
                        <Link
                          to={blog.images[2].url}
                          className="h-8 w-8 rounded-lg flex border border-zinc-200 shrink"
                        >
                          <img
                            src={blog.images[2].url}
                            alt={blog.title}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </Link>
                      ) : (
                        ""
                      )}

                      {blog.images[3] ? (
                        <Link
                          to={blog.images[3].url}
                          className="h-8 w-8 rounded-lg flex border border-zinc-200 shrink"
                        >
                          <img
                            src={blog.images[3].url}
                            alt={blog.title}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </Link>
                      ) : (
                        ""
                      )}
                    </main>
                  </td>
                  <td>
                    <span
                      className={`px-3 rounded-full w-max py-0.5 flex items-center gap-1 ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-950"
                          : "bg-amber-100"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          blog.status === "published"
                            ? "bg-green-500"
                            : "bg-amber-500"
                        }`}
                      ></span>
                      <p className="capitalize">{blog.status}</p>
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-xs">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-amber-400 text-white border-zinc-200 cursor-pointer"
                      >
                        <IoEye />
                      </Link>
                      <span
                        onClick={() => {
                          setToggleContent({
                            modal: true,
                            content: blog.content,
                          });
                        }}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-blue-600 text-white border-zinc-200 cursor-pointer"
                      >
                        <MdOutlineMessage />
                      </span>
                      {blog.status == "pending" ? (
                        <span
                          onClick={() => confirmStatus(blog._id, "published")}
                          className="h-6 w-6 rounded-md flex items-center justify-center border bg-green-500 text-white border-zinc-200 cursor-pointer"
                        >
                          <LuBadgeCheck />
                        </span>
                      ) : (
                        <span
                          onClick={() => confirmStatus(blog._id, "pending")}
                          className="h-6 w-6 rounded-md flex items-center justify-center border bg-orange-500 text-white border-zinc-200 cursor-pointer"
                        >
                          <LuBan />
                        </span>
                      )}
                      <span
                        onClick={() => confirmDelete(blog._id)}
                        className="h-6 w-6 rounded-md flex items-center justify-center border bg-[#f30000] text-white border-zinc-200 cursor-pointer"
                      >
                        <IoTrashOutline />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </article>

      {toggleContent.modal && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[550px] w-full fixed md:relative bottom-0 `}
          >
            <main className="flex items-center justify-between w-full">
              <h2 className="font-semibold text-xl">Blog Message</h2>
              <div
                onClick={() => setToggleContent({ modal: false, message: "" })}
                className="h-7 w-7 flex items-center justify-center text-sm bg-[#f2f2f2]  rounded-full cursor-pointer"
              >
                <FaXmark />
              </div>
            </main>
            <div
              className="text-xs font-medium text-center bg-zinc-100 p-4 rounded-2xl"
              dangerouslySetInnerHTML={{ __html: toggleContent.content }}
            />
          </section>
        </section>
      )}

      {toggleDelete && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
          >
            <FaCircleExclamation className="text-[#fe0000] text-7xl" />
            <div className="flex flex-col gap-1 items-center">
              <h2 className="font-semibold text-xl">Are you sure?</h2>

              <p className="text-sm font-medium text-center">
                Deleting this blog is permanent and irreversible. You will lose
                this record.
              </p>
            </div>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleDelete(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleBlogDelete}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-[#f30000] font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Yes, delete this blog
              </button>
            </div>
          </section>
        </section>
      )}

      {toggleStatus && (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-50">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6 rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative bottom-0 `}
          >
            <FaCircleExclamation className="text-[#fe0000] text-7xl" />
            <div className="flex flex-col gap-1 items-center">
              <h2 className="font-semibold text-xl">Are you sure?</h2>

              <p className="text-sm font-medium text-center">
                Are you sure you want to update this blog status? Once
                confirmed, the changes will be saved and visible to users.
              </p>
            </div>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleStatus(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleBlogStatus}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-blue-600 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Yes, proceed
              </button>
            </div>
          </section>
        </section>
      )}
    </>
  );
}
