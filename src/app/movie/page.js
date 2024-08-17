"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import "../globals.css";
import httpRequest from "../service/service";

const Movie = () => {
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const image = watch("image");

  useEffect(() => {
    if (image && image[0]) {
      const url = URL.createObjectURL(image[0]);
      setImageUrl(url);
    }
  }, [image]);

  const fetchMovieDetails = async (movieId) => {
    const data = await httpRequest(`/movies/${movieId}`);
    if (data) {
      setValue("title", data?.title);
      setValue("publishedYear", data?.publishedYear);
      setImageUrl(`${process.env.NEXT_PUBLIC_FETCH_URL}/${data?.image}`);
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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("publishedYear", Number(data.publishedYear));
    if (data.image.length > 0) formData.append("image", data.image[0]);
    const responseData = await httpRequest(`/movies`, "POST", formData);
    if (responseData) {
      router.push("/");
    }
  };

  const onUpdate = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("publishedYear", Number(data.publishedYear));
    if (data.image.length > 0) formData.append("image", data.image[0]);
    const responseData = await httpRequest(`/movies/${id}`, "PUT", formData);
    console.log(responseData, "data");
    setValue("title", responseData?.data.title);
    setValue("publishedYear", responseData?.data.publishedYear);
    setImageUrl(
      `${process.env.NEXT_PUBLIC_FETCH_URL}/${responseData?.data.image}`
    );
  };

  const onCancel = () => {
    if (editing) {
      router.push("/");
      return;
    }
    reset();
    setImageUrl(null);
  };

  const onClickImage = () => {
    setImageUrl(null);
    setValue("image", null);
  };

  return (
    <div className="content-wrapper p-[5%] w-full flex flex-col items-start">
      <div className="w-full flex items-center gap-4">
        <FaArrowLeft
          className="mb-3 cursor-pointer"
          size={20}
          onClick={() => router.push("/")}
        />
        <h1 className="text-[24px] md:text-[38px] text-white mb-4">
          {editing ? "Edit movie" : "Create a new movie"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(editing ? onUpdate : onSubmit)}
        className="w-full flex flex-col md:flex-row md:items-start md:mt-[5%]"
      >
        <div className="w-full md:ml-[5%] md:w-1/3 flex flex-col md:items-start md:justify-center mt-4 md:mt-0 order-1 md:order-2">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className={`text-white bg-[#224957] w-full h-12 rounded-md p-2 mb-4 border-2 ${
              errors.title ? "border-[#EB5757]" : "border-transparent"
            } focus:outline-none focus:ring-0`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
          )}
          <input
            {...register("publishedYear", {
              required: "Published year is required",
            })}
            className={`text-white bg-[#224957] w-full h-12 rounded-md p-2 mb-4 border-2 ${
              errors.publishedYear ? "border-[#EB5757]" : "border-transparent"
            } focus:outline-none focus:ring-0`}
            placeholder="Published year"
          />
          {errors.publishedYear && (
            <p className="text-red-500 text-sm mb-2">
              {errors.publishedYear.message}
            </p>
          )}
          <div className="hidden md:block w-[100%]">
            <div className="flex justify-start gap-2">
              <button
                className="bg-transparent rounded-md h-12 md:w-36 text-white border-2 border-[#fff]"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[#2BD17E] h-12 md:w-36 rounded-md text-white"
                type="submit"
              >
                {editing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 h-80 flex flex-col items-center mt-4 md:mt-0 order-2 md:order-1 relative">
          {imageUrl ? (
            <div className="h-full w-2/3 rounded-lg group relative">
              <img
                src={imageUrl}
                alt="image"
                className="h-full w-full object-cover rounded-lg z-0"
              />
              <div className="absolute cursor-pointer top-0 right-0  shadow-md shadow-white	 bg-black">
                <MdEdit size={20} onClick={onClickImage} />
              </div>
            </div>
          ) : (
            <div className="w-2/3 h-full bg-[#224957] text-white flex justify-center items-center relative rounded-lg border-2 border-dashed border-white-500">
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
                  {...register("image")}
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                />
              </label>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-center gap-2 mt-6 md:mt-0 order-3 md:hidden">
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
          >
            {editing ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Movie;
