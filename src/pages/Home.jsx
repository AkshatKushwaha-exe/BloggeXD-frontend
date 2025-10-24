import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://bloggexd-backend-api.onrender.com/api/blogs")
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="home-container">
      <h2 className="home-title">All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found. Why not create one?</p>
      ) : (
        blogs.map(blog => (
          <Link key={blog._id} to={`/blogs/${blog._id}`} className="blog-link">
            <div className="blog-card">
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-author">by {blog.author}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Home;