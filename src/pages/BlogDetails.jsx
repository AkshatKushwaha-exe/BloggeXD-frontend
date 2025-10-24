import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import "../styles/BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const fetchBlog = () => {
    axios.get(`https://bloggexd-backend-api.onrender.com/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => {
        console.log(err);
        setBlog(null);
      });
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleCommentAdded = () => {
    fetchBlog();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`https://bloggexd-backend-api.onrender.com/api/blogs/${id}`);
        navigate("/");
      } catch (err) {
        console.log(err);
        alert("Failed to delete post.");
      }
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-details-container">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-author">by {blog.author}</p>
      
      {}
      <div className="blog-content">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      {}
      <button onClick={handleDelete} className="delete-button">
        Delete Post
      </button>

      <hr className="divider" />
      
      {}
      <div className="comment-section">
        <h3>Comments</h3>
        <CommentForm blogId={id} onCommentAdded={handleCommentAdded} />
        <CommentList comments={blog.comments} />
      </div>
    </div>
  );
};

export default BlogDetails;
