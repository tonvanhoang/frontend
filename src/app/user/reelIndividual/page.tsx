import React, { useState, useEffect } from "react";
import ReelGrid from "../../components/ReelIndividual/ReelGrid";
import DetailReel from "../../components/ReelIndividual/DetailReel";
import CommentReel from "../../components/ReelIndividual/CommentReel";

interface Video {
  _id: string; // Unique identifier for the video
  video: string; // Video URL
  title: string; // Title of the reel
  content?: string; // Optional content
  dateReel: string; // Date of the reel
  idAccount: string; // Account ID
}

export default function ReelIndividual() {
  const [showDetailReel, setShowDetailReel] = useState(false);
  const [showCommentReel, setShowCommentReel] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]); // State to hold fetched videos

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reel/allReel`
        ); // Fetching data from the API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Assuming the API returns an array of videos
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array to run once on mount

  const handleReelClick = (video: Video) => {
    setSelectedVideo(video);
    setShowDetailReel(true);
  };

  const handleCloseDetailReel = () => {
    setShowDetailReel(false);
    setSelectedVideo(null);
  };

  const handleCommentClick = () => {
    setShowCommentReel(true);
  };

  const handleCloseCommentReel = () => {
    setShowCommentReel(false);
  };

  return (
    <>
      <ReelGrid videos={videos} onReelClick={handleReelClick} />{" "}
      {/* Pass videos to ReelGrid */}
      {showDetailReel && selectedVideo && (
        <DetailReel
          video={selectedVideo}
          onClose={handleCloseDetailReel}
          onCommentClick={handleCommentClick}
        />
      )}
      {showCommentReel && <CommentReel onClose={handleCloseCommentReel} />}
    </>
  );
}
