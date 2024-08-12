"use client";
import axios from "axios";
import { useState } from "react";

const Movie = () => {
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishedYear] = useState(0);
  const [image, setImage] = useState(null); // Ensure image is initialized as null

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishedYear", publishedYear);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3009/movies",
        formData
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const onCancel = () => {
    setTitle("");
    setPublishedYear(0);
    setImage(null);
  };

  return (
    <div>
      <h1>Create a new movie</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChangeFile} type="file" name="file" id="file" />
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="text-black"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor="publishedYear">Published Year</label>
            <input
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              type="number"
              className="text-black"
              name="publishedYear"
              id="publishedYear"
            />
          </div>
          <div>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Movie;
