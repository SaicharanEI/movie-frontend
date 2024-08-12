"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const MoviesList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3009/movies");
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log(response);
      }
    };
    fetchData();
  });

  return (
    <div>
      <h1>Movie List</h1>
      {data.map((movie) => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>
          <p>{movie.publishedYear}</p>
          <img src={movie.image} alt={movie.title} />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
