// ReelContainer.tsx
import React, { useEffect, useState } from "react";
import ReelItem from "./ReelItem";

interface Reel {
  _id: string;
  video: string;
  title: string;
  content: string;
  dateReel: string;
  idAccount: string;
}

const ReelContainer: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await fetch(`http://localhost:4000/reel/allReel`);
        const data = await response.json();
        console.log("Fetched data:", data);
        setReels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching reels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerReels">
      <div className="main-content">
        <div className="video-container">
          {reels.map((reel) => (
            <ReelItem key={reel._id} reel={reel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelContainer;
