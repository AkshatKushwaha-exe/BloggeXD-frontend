import { useState } from "react";
import axios from "axios";

const CommentForm = ({ blogId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    const newComment = {
      text,
      author: author || "Anonymous"
    };

    axios.post(`http://localhost:5000/api/comments/${blogId}`, newComment)
      .then(() => {
        setText("");
        setAuthor("");
        onCommentAdded();
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Your Name (Optional)"
        className="form-input"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="Write a comment..."
        className="form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit" className="form-button">Post Comment</button>
    </form>
  );
};

export default CommentForm;