import "./../index.css";
import { useState } from "react";
import Axios from "axios";

function Post() {
  const [tittle, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setImage] = useState(null);
  const[message,setMessage]=useState("")

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("tittle", tittle);
    formData.append("content", content);
    formData.append("image", photo);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to create a post.");
      return;
    }

    Axios.post("http://localhost:4000/post",formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        setMessage("Post created successfully.")
        console.log("Post created successfully.");
      })
      .catch((error) => {
        if (error.response) {
          // This means the request was made, and the server responded with an error

          setMessage("server Error")
          console.error("Server Error:", error.response.data);
        
        } else if (error.request) {
          // The request was made but no response was received
          setMessage("No response Received")
          console.error("No response received:", error.request);
          
        } else {
          // Something else went wrong
          setMessage("error")
          console.error("Error:", error);
          
        }
      });

    
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div className="form-container">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            value={tittle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Post;
