"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import WithAuth from "../components/withAuth";

const Movie = () => {
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishedYear] = useState(0);
  const [image, setImage] = useState(null); // Ensure image is initialized as null
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishedYear", publishedYear);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3009/movies",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        formData
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishedYear", publishedYear);
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:3009/movies/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:3009/movies/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setTitle(response.data.title);
        setPublishedYear(response.data.publishedYear);
        setImage(response.data.image);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getIdFromParams = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  useEffect(() => {
    const movieId = getIdFromParams();
    if (movieId) {
      fetchMovieDetails(movieId);
      setId(movieId);
      setEditing(true);
    }
  }, []);

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const onCancel = () => {
    setTitle("");
    setPublishedYear(0);
    setImage(null);
  };

  return (
    <div className="p-[5%] w-full h-full flex flex-col md:justify-between items-start min-h-screen bg-[#093545]">
      <h1 className="text-2xl text-white mb-4 md:mb-0">
        {editing ? "Edit movie" : "Create a new movie"}
      </h1>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col md:flex-row md:items-start"
      >
        {/* Inputs and Buttons Container */}
        <div className="w-full md:ml-[5%] md:w-1/3 flex flex-col md:items-start md:justify-center mt-4 md:mt-0 order-1 md:order-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="text-white bg-[#224957] w-full h-12 rounded-md p-2 mb-4"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            type="number"
            className="text-white bg-[#224957] w-full md:w-[70%] h-12 rounded-md p-2 mb-4"
            name="publishedYear"
            placeholder="Published year"
            id="publishedYear"
          />
          <div className="hidden md:block w-[100%]">
            <div className=" flex justify-start gap-2  ">
              <button
                className="bg-transparent rounded-md h-12 md:w-36  text-white border-2 border-[#2BD17E]"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[#2BD17E] h-12 md:w-36 rounded-md text-white"
                type="submit"
                onClick={editing ? onUpdate : onSubmit}
              >
                {editing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* File input container */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start md:justify-center mt-4 md:mt-0 order-2 md:order-1">
          <div className="w-full h-80 bg-[#224957] text-white flex justify-center items-center relative">
            <label
              htmlFor="file"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white mb-2"
              >
                <g clipPath="url(#clip0_3_346)">
                  <path
                    d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3_346">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Drag an image here
              <input
                style={{ display: "none" }}
                onChange={onChangeFile}
                id="file"
                type="file"
              />
            </label>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="w-full flex justify-between items-center gap-2 mt-6 md:mt-0 order-3 md:hidden ">
          <button
            className="bg-transparent rounded-md h-12 w-full md:w-36 text-white border-2 border-[#2BD17E]"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#2BD17E] w-full md:w-36 h-12 rounded-md text-white"
            type="submit"
            onClick={(e) => {
              editing ? onUpdate(e) : onSubmit(e);
            }}
          >
            {editing ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default WithAuth(Movie);
