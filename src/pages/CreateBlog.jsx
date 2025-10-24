import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBlog.css";

const CreateBlog = () => {
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("Title and Content are required.");
      return;
    }
    
    await axios.post("http://localhost:5000/api/blogs", {
      ...form,
      author: form.author || "Anonymous"
    });
    navigate("/");
  };

  return (
    <div className="create-blog-container">
      <h2 className="create-blog-title">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-input"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author (Optional)"
          className="form-input"
          value={form.author}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content (Markdown supported)"
          className="form-textarea"
          value={form.content}
          onChange={handleChange}
        />
        <button type="submit" className="form-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;