import axios from "axios";
import React, { useState } from "react";
import "../styles/CreatePost.css";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    location: "India",
    description: "Just Random Text",
    picture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      const file = files[0];
      setPostData((prevData) => ({ ...prevData, picture: file }));

      // Generate a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPostData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("location", postData.location);
    formData.append("description", postData.description);
    formData.append("picture", postData.picture);

    try {
      const response = await axios.post(
        "http://localhost:5000/posts/create-post",
        formData,
        { withCredentials: true }
      );
      console.log("Post created:", response.data);
      setPostData({ location: "", description: "", picture: null });
      setPreviewImage(null);
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="create-post-container">
      <h2 className="create-post-title">Create New Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            value={postData.location}
            onChange={handleChange}
            placeholder="Enter location"
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            value={postData.description}
            onChange={handleChange}
            placeholder="Enter description"
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="picture" className="form-label">
            Picture
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            className="form-input"
            accept="image/*"
            onChange={handleChange}
          />
          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Selected preview"
                className="preview-image"
              />
            </div>
          )}
        </div>
        <button type="submit" className="create-post-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
