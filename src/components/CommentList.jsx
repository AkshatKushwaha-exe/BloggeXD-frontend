const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="no-comments">No comments yet. Be the first!</p>;
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <strong>{comment.author}</strong>
          <p>{comment.text}</p>
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;