import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaImages } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateBlog() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    excerpt: "",
    content: "",
    thumbnail: null,
    images: [],
  });
  const [loading, setLoading] = useState(false);


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    } else if (name === "thumbnail") {
      setFormData((prev) => ({
        ...prev,
        thumbnail: files[0],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
  };

  const handleRemoveThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Manual Validation
    if (!formData.thumbnail) {
      setLoading(false);
      toast.error("A thumbnail image is required.", { id: "blog-creation" });
      return;
    }

    if (formData.images.length === 0) {
      setLoading(false);
      toast.error("At least one additional image is required.", {
        id: "blog-creation",
      });
      return;
    }

    toast.loading("Creating blog post...", { id: "blog-creation" });

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);
    data.append("thumbnail", formData.thumbnail);
    formData.images.forEach((file) => {
      data.append("images", file);
    });

    try {
      await axios.post(`${API_URL}/blog/store`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Blog post created successfully!", { id: "blog-creation" });
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to upload property. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("An unknown error occurred. Please try again.", {
          id: "123",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full p-4"
      encType="multipart/form-data"
    >
      <span className="text-2xl font-semibold capitalize">
        Create a blog post
      </span>

      <section className="flex items-center gap-4">
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Title<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="Blog title"
          />
        </article>

        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Author<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            required
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="Blog Author"
          />
        </article>
      </section>

      <section className="flex gap-4">
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Excerpt<span className="text-red-500">*</span>
          </span>
          <textarea
            name="excerpt"
            rows={8}
            value={formData.excerpt}
            onChange={handleChange}
            required
            className="bg-zinc-50 border resize-none border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="Blog Excerpt"
          ></textarea>
        </article>
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Thumbnail Image<span className="text-red-500">*</span>
          </span>
          <div className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal flex items-center gap-2 justify-center relative cursor-pointer">
            Select Thumbnail <FaImages />
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              className="absolute w-full h-full border opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          {formData.thumbnail && (
            <div className="mt-2 relative w-24 h-24">
              <img
                src={URL.createObjectURL(formData.thumbnail)}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <span
                onClick={handleRemoveThumbnail}
                className="absolute -top-1 -right-1 bg-red-500 cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </span>
            </div>
          )}
        </article>
      </section>

      <section className="flex flex-col gap-4">
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200 overflow-hidden h-[300px]">
          <span className="text-sm font-semibold">
            Content<span className="text-red-500">*</span>
          </span>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            className="bg-zinc-50 border-zinc-200 w-full rounded-xl h-full"
            placeholder="Start writing your blog content here..."
          />
        </article>
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Additional Images<span className="text-red-500">*</span>
          </span>
          <div className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal flex items-center gap-2 justify-center relative cursor-pointer">
            Select Additional Images <FaImages />
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="absolute w-full h-full border opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          <div className="grid grid-cols-12 gap-2 text-[13px] font-medium p-6 bg-zinc-50 border border-zinc-200 rounded-3xl">
            {formData.images.length > 0 ? (
              formData.images.map((img, index) => (
                <div key={index} className="relative w-14 h-14">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <span
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400 text-center col-span-12">
                Image previews will appear here.
              </p>
            )}
          </div>
        </article>
      </section>

      <button
        type="submit"
        className="w-full py-2 bg-zinc-950 cursor-pointer text-white rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[200px]"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Create Blog"}
      </button>
 
    </form>
  );
}
