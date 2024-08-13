import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/CreatePost.css";
import AddCaptionModal from "./AddCaptionModal";
import SelectMediaModal from "./SelectMediaModal";

const CreatePost = ({ modalShown, setModalShown }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    caption: "This is Caption  @mention1 @mention2 #free #solo",
    location: "Geo Location",
    mediaFiles: [],
  });
  const [mediaPreview, setMediaPreview] = useState([]);

  const handleNext = () => {
    setCurrentStage(2);
  };

  const handleBack = () => {
    setCurrentStage(1);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleMediaChange = (files) => {
    const previews = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setMediaPreview(previews);
    setFormData((prevData) => ({ ...prevData, mediaFiles: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("caption", formData.caption);
    postData.append("location", formData.location);

    // Append each file individually with the key "media"
    for (let i = 0; i < formData.mediaFiles.length; i++) {
      postData.append("media", formData.mediaFiles[i]);
    }

    setModalShown(false);
    setCurrentStage(1);
    setFormData({
      caption: "",
      location: "",
      mediaFiles: [],
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create-post",
        postData,
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
      {modalShown && currentStage === 1 && (
        <SelectMediaModal
          handleMediaChange={handleMediaChange}
          onNext={handleNext}
          setModalShown={setModalShown}
        />
      )}

      {modalShown && currentStage === 2 && (
        <AddCaptionModal
          mediaFiles={mediaPreview}
          caption={formData.caption}
          setCaption={(caption) => handleChange("caption", caption)}
          location={formData.location}
          setLocation={(location) => handleChange("location", location)}
          onBack={handleBack}
          onSubmit={handleSubmit}
          setModalShown={setModalShown}
        />
      )}
    </div>
  );
};

export default CreatePost;
