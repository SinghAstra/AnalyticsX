import React from "react";
import "../../styles/AddCaptionModal.css";

const AddCaptionModal = ({
  caption,
  setCaption,
  location,
  setLocation,
  onBack,
  setModalShown,
}) => {
  return (
    <div className="modal-backdrop" onClick={() => setModalShown(false)}>
      <div className="add-caption-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span onClick={onBack}>Back</span>
          <h2>Add Caption & Location</h2>
          <span></span>
        </div>
        <div className="separator-line"></div>
        <div className="modal-body">
          <div className="media-preview">This is preview</div>
          <div className="add-caption-location-section">
            <textarea
              type="text"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input
              type="text"
              placeholder="Add a location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCaptionModal;
