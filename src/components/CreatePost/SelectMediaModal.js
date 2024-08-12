import React, { useRef } from "react";
import "../../styles/SelectMediaModal.css";

const SelectMediaModal = ({ setMediaFiles, onNext, setModalShown }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setMediaFiles(e.target.files);
    onNext();
  };

  return (
    <div className="modal-backdrop" onClick={() => setModalShown(false)}>
      <div
        className="select-media-modal modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span></span>
          <h2>Select Media</h2>
          <span onClick={onNext}>Next</span>
        </div>
        <div className="separator-line"></div>
        <img src="/gallery.png" alt="create new post" />
        <h1>Drag photos And videos here</h1>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
        />
        <button
          className="btn btn-primary"
          onClick={() => fileInputRef.current.click()}
        >
          Select from computer
        </button>
      </div>
    </div>
  );
};

export default SelectMediaModal;
