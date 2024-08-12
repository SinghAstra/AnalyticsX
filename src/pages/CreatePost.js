import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../styles/CreatePost.css";

const CreatePost = () => {
  const [caption, setCaption] = useState(
    "This is Caption  @mention1 @mention2 #free #solo"
  );
  const [location, setLocation] = useState("Geo Location");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [modalShown, toggleModal] = useState(false);

  const handleFileChange = (e) => {
    setMediaFiles(e.target.files);
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
        onClick={() => {
          toggleModal(!modalShown);
        }}
      >
        Create Post
      </button>
      {modalShown && (
        <div
          className="modal-backdrop"
          onClick={() => {
            toggleModal(!modalShown);
          }}
        >
          <div
            className="create-post-dialog modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Caption:</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label>Media Files:</label>
                <input type="file" onChange={handleFileChange} multiple />
              </div>
              <button type="submit">Create Post</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
