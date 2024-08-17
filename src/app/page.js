"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import httpRequest from "./service/service.js";
import "./globals.css";
const Movies = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await httpRequest(`/movies?limit=${limit}&page=${page}`);
      if (data) {
        setData(data?.data);
        setCount(data?.total);
      }
      setLoading(false);
    };
    fetchData();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page * limit < count) setPage(page + 1);
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <>
      {loading ? (
        <div className="w-full content-wrapper flex flex-col justify-center items-center">
          <ClipLoader color="#2BD17E" />
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="w-full content-wrapper flex flex-col items-center justify-center gap-3">
              <h1 className="text-xl md:text-4xl text-center text-[#fff]">
                Your movie list is empty
              </h1>
              <button
                className="bg-[#2BD17E] text-[#fff]"
                style={{
                  width: "202px",
                  height: "56px",
                  borderRadius: "10px",
                  padding: "16px 28px",
                  gap: "5px",
                }}
                onClick={() => router.push("/movie")}
              >
                Add a new movie
              </button>
            </div>
          ) : (
            <div className="w-full content-wrapper p-[5%] flex flex-col items-center">
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-2xl lg:text-3xl text-white mr-4">
                    My movies
                  </h1>
                  <span
                    onClick={() => router.push("/movie")}
                    className="cursor-pointer relative flex items-center group"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3_194)">
                        <path
                          d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_194">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Add Movie
                    </span>
                  </span>
                </div>

                <div
                  className="flex items-center cursor-pointer group"
                  onClick={handleLogout}
                >
                  <p className="mr-2 hidden md:block">Logout</p>
                  <span className=" relative flex items-center ">
                    <svg
                      className="cursor-pointer"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_7_232)">
                        <path
                          d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7_232">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Logout
                    </span>
                  </span>
                </div>
              </div>
              <div className="w-full self-start grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-12 lg:grid-cols-4 mt-8">
                {data.map((movie) => (
                  <div
                    className="bg-[#092C39] h-80 md:h-[400px] flex flex-col justify-between p-2 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    key={movie._id}
                    onClick={() => router.push(`/movie?id=${movie._id}`)}
                  >
                    <img
                      className="h-[80%] object-cover rounded-t-md"
                      src={`${process.env.NEXT_PUBLIC_FETCH_URL}/${movie.image}`}
                      alt={movie.title}
                    />
                    <h2 className="text-white text-lg font-semibold truncate">
                      {movie.title}
                    </h2>
                    <p className="text-gray-300 text-sm">
                      {movie.publishedYear}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center mt-8">
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={page <= 1}
                    className={`${
                      page <= 1 ? "text-gray-500" : "text-white"
                    } px-4 py-2 rounded`}
                  >
                    Prev
                  </button>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`px-4 py-2 rounded ${
                        pageNumber === page
                          ? "bg-[#2BD17E] text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages}
                    className={`${
                      page >= totalPages ? "text-gray-500" : "text-white"
                    } px-4 py-2 rounded`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
