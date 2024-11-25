import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  username: string;
  text: string;
  likes: number;
  replies: number;
}

interface CommentSectionProps {
  isVisible: boolean;
  onClose: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  isVisible,
  onClose,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Giả lập việc tải comments từ API
    const mockComments: Comment[] = [
      { id: 1, username: "user1", text: "Great video!", likes: 5, replies: 2 },
      { id: 2, username: "user2", text: "Nice content!", likes: 3, replies: 0 },
    ];
    setComments(mockComments);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        username: "currentUser", // Thay thế bằng username thực tế
        text: newComment,
        likes: 0,
        replies: 0,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div
      className={`comment-section ${isVisible ? "active" : ""}`}
      id="comment"
    >
      <div className="title">
        <h5>Bình luận</h5>
        <i className="close-btn" onClick={onClose}>
          &times;
        </i>
      </div>
      <div className="commentChild">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar"></div>
            <div className="comment-content">
              <span className="comment-username">{comment.username}</span>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-info">
                <span className="likes">{comment.likes} likes</span>
                <span className="replies">{comment.replies} replies</span>
                <button className="like-btn">Like</button>
                <button className="reply-btn">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;
