import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import axios from "axios";

export default function CreateBlog() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(`${API_URL}/blog/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert("Blog post created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating blog post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        required
      />
      <ReactQuill theme="snow" value={content} onChange={setContent} />

      <p>Upload Thumbnail Image</p>
      <input
        type="file"
        onChange={(e) => setThumbnailFile(e.target.files[0])}
      />

      <p>Upload Additional Images</p>
      <input
        type="file"
        multiple
        onChange={(e) => setImageFiles(Array.from(e.target.files))}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
