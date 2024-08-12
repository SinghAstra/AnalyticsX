import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AddCaptionModal from "../components/CreatePost/AddCaptionModal";
import SelectMediaModal from "../components/CreatePost/SelectMediaModal";
import "../styles/CreatePost.css";

const CreatePost = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [caption, setCaption] = useState(
    "This is Caption  @mention1 @mention2 #free #solo"
  );
  const [location, setLocation] = useState("Geo Location");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [modalShown, setModalShown] = useState(false);

  const handleNext = () => {
    setCurrentStage(2);
  };

  const handleBack = () => {
    setCurrentStage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Creating Post.");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);

    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Post created:", response.data);
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  useEffect(() => {
    document.title = "Create New Post • Social UI 2.0";
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary btn-create-post"
        onClick={() => setModalShown(true)}
      >
        Create Post
      </button>

      {modalShown && currentStage === 1 && (
        <SelectMediaModal
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          onNext={handleNext}
          setModalShown={setModalShown}
        />
      )}

      {modalShown && currentStage === 2 && (
        <AddCaptionModal
          caption={caption}
          setCaption={setCaption}
          location={location}
          setLocation={setLocation}
          onBack={handleBack}
          onSubmit={handleSubmit}
          setModalShown={setModalShown}
        />
      )}
    </div>
  );
};

export default CreatePost;
