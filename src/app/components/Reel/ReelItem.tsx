import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import CommentSection from "./CommentSection";

interface Reel {
  _id: string;
  video: string;
  title: string;
  content: string;
  dateReel: string;
  idAccount: string;
}

interface ReelItemProps {
  reel: Reel;
}

const ReelItem: React.FC<ReelItemProps> = ({ reel }) => {
  const [showComment, setShowComment] = useState(false);

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <div className="video-item">
      <div className="video-content">
        <div className="video-wrapper">
          <video src={reel.video} controls loop autoPlay />
          <div className="video-info">
            <div className="user-info">
              <div className="avatar"></div>
              <div className="username">{reel.idAccount}</div>
              <button className="follow-button">Theo dõi</button>
            </div>
            <div className="caption">{reel.content}</div>
          </div>
        </div>
        <ActionButtons onCommentClick={toggleComment} />
      </div>
      <CommentSection isVisible={showComment} onClose={toggleComment} />
    </div>
  );
};

export default ReelItem;
