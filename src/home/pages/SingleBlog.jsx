import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SingleBlog() {
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/blog/fetch/${params.id}`, {
          withCredentials: true,
        });
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error("An unknown error occurred", { id: "fetch_error" });
        setTimeout(() => navigate("/"), 1000);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Blog post not found.</div>;
  }

  return (
    <div className="blog-container">
      <div className="main-content">
        <div className="blog-header">
          <h1>{blog.title}</h1>
          <p className="blog-meta">
            <span>{new Date(blog.date).toLocaleDateString()}</span> | By{" "}
            <span>{blog.author}</span>
          </p>
        </div>
        <div className="blog-content">
          <p>{blog.excerpt}</p>
          {/* dangerouslySetInnerHTML is used to render the HTML content from the rich text editor */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        {blog.images && blog.images.length > 0 && (
          <div className="blog-images">
            {blog.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Blog image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sidebars as per the image */}
      <div className="sidebars">
        <div className="calculate-sidebar">
          <h3>Calculate Your VA Disabilities</h3>
          <p>Get accurate insights now</p>
          <button>Know More</button>
        </div>
      </div>
    </div>
  );
}
