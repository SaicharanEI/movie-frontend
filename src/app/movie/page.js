"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { showToast } from "../utils/toast";
import { useRouter } from "next/navigation";

const Movie = () => {
  const [title, setTitle] = useState("");
  const [publishedYear, setPublishedYear] = useState(0);
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const router = useRouter();
  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    handleFile(files);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  const handleFile = (files) => {
    if (files.length > 0) {
      setImage(files[0]);
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageUrl(imageUrl);
    }
  };

  const onChangeFile = (event) => {
    const files = event.target.files;
    handleFile(files);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishedYear", publishedYear);
      formData.append("image", image);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/movies`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.statusCode === 201) {
        showToast("success", response.data.message);
        setTitle("");
        setPublishedYear(0);
        setImage(null);
        setImageUrl(null);
        router.push("/");
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
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
        `${process.env.NEXT_PUBLIC_FETCH_URL}/movies/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        showToast("success", response.data.message);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/movies/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setTitle(response.data.title);
        setPublishedYear(response.data.publishedYear);
        console.log(response?.data?.image);
        setImageUrl(
          `${process.env.NEXT_PUBLIC_FETCH_URL}/${response?.data?.image}`
        );
        console.log(
          `${process.env.NEXT_PUBLIC_FETCH_URL}/${response?.data?.image}`
        );
      } else {
        showToast("error", response.message);
      }
    } catch (error) {
      showToast("error", error.message);
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

  const onCancel = () => {
    setTitle("");
    setPublishedYear(0);
    setImage(null);
  };

  const onClickImage = () => {
    setImageUrl(null);
  };
  return (
    <div className="w-full h-full flex flex-col md:justify-between items-start min-h-screen bg-[#093545] p-[5%]">
      <h1 className="text-[24px] md:text-[38px] text-white mb-4">
        {editing ? "Edit movie" : "Create a new movie"}
      </h1>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col md:flex-row md:items-start"
      >
        <div className="w-full md:ml-[5%] md:w-1/3 flex flex-col md:items-start md:justify-center mt-4 md:mt-0 order-1 md:order-2">
          <input
            required
            type="text"
            placeholder="Title"
            className="text-white bg-[#224957] w-full h-12 rounded-md p-2 mb-4"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            required
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            type="number"
            className="text-white bg-[#224957] w-full md:w-[70%] h-12 rounded-md p-2 mb-4"
            placeholder="Published year"
            min="1800"
            max="2024"
          />
          <div className="hidden md:block w-[100%]">
            <div className=" flex justify-start gap-2  ">
              <button
                className="bg-transparent rounded-md h-12 md:w-36  text-white border-2 border-[#fff]"
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

        <div
          className={`w-full md:w-1/3 h-80 flex flex-col items-center md:items-start md:justify-center mt-4 md:mt-0 order-2 md:order-1 relative border-2 border-dashed border-white-500 border-r-2 rounded-lg ${
            imageUrl &&
            "flex justify-center items-center border-none cursor-pointer"
          }`}
        >
          {imageUrl ? (
            <img
              onClick={onClickImage}
              src={imageUrl}
              alt="image"
              className="w-1/2 h-full object-cover rounded-lg"
            />
          ) : (
            <div
              className="w-full h-full bg-[#224957] text-white flex justify-center items-center relative rounded-lg "
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              <label
                htmlFor="file"
                className="flex flex-col justify-center items-center cursor-pointer rounded-lg"
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
                <div>Drag an image here</div>
                <input
                  required
                  style={{ display: "none" }}
                  onChange={onChangeFile}
                  id="file"
                  type="file"
                />
              </label>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center gap-2 mt-6 md:mt-0 order-3 md:hidden ">
          <button
            className="bg-transparent rounded-md h-12 w-full md:w-36 text-white border-2 border-[#FFF]"
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

export default Movie;
