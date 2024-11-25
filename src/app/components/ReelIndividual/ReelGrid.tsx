import React from "react";

interface Video {
  _id: string; // Unique identifier for the video
  video: string; // Video URL
  title: string; // Title of the reel
  content?: string; // Optional content
  dateReel: string; // Date of the reel
  idAccount: string; // Account ID
}

interface ReelGridProps {
  onReelClick: (video: Video) => void;
  videos: Video[]; // Accept videos as a prop
}

const ReelGrid: React.FC<ReelGridProps> = ({ onReelClick, videos }) => {
  return (
    <div id="containerReels">
      <div className="childReels">
        {videos.map((video) => (
          <div
            key={video._id} // Use _id as the key
            className="item"
            onClick={() => onReelClick(video)}
          >
            <video controls>
              {" "}
              {/* Thêm controls để kiểm tra video */}
              <source src={video.video} type="video/mp4" />{" "}
              {/* Use video URL */}
            </video>
            <span>
              <i className="bi bi-play-fill"></i>
              {/* Display views if available, else display a placeholder */}
              {video.content ? `${video.content} N` : "0 N"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelGrid;
