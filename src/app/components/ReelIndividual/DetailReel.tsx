import React from "react";

interface Video {
  _id: string; // Unique identifier for the video
  video: string; // Video URL
  title: string; // Title of the reel
  content?: string; // Optional content
  dateReel: string; // Date of the reel
  idAccount: string; // Account ID
}

interface DetailReelProps {
  video: Video; // Expecting a Video object
  onClose: () => void; // Function to close the detail view
  onCommentClick: () => void; // Function to open the comment section
}

const DetailReel: React.FC<DetailReelProps> = ({
  video,
  onClose,
  onCommentClick,
}) => {
  return (
    <div className="detailReel" id="detailReels">
      <i id="closeCart" onClick={onClose} className="bi bi-x-lg"></i>
      <div className="postLeft">
        <div className="item">
          <div className="post-images">
            <video controls autoPlay muted>
              <source src={video.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="containerIcon">
            <i className="fa-regular fa-heart"></i>
            <i onClick={onCommentClick} className="fa-regular fa-comment"></i>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
          <div className="contentTitle">
            <a
              className="luotThich d-block text-decoration-none text-black"
              href="#"
            >
              {/* Display the number of likes or views */}
              {video.content ? `${video.content} lượt thích` : "0 lượt thích"}
            </a>
            <a className="titlePost" href="#">
              <label>{video.title}</label> {/* Display the title of the reel */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReel;
