import React from "react";

interface ActionButtonsProps {
  onCommentClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onCommentClick }) => {
  return (
    <div className="action-buttons">
      <button className="action-button">
        <i className="fa-regular fa-heart"></i>
      </button>
      <button onClick={onCommentClick} className="action-button">
        <i className="fa-regular fa-comment"></i>
      </button>
      <button className="action-button">
        <i className="fa-regular fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default ActionButtons;
