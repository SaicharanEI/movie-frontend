"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { showToast } from "../utils/toast";

export default function SignInForm() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");
  const router = useRouter();

  const onSubmit = async (e) => {
    console.log("test");
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:3009/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.access_token);
        router.replace("/movie-list");
        showToast("success", response.data.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center min-h-screen">
      <form className="space-y-6 flex flex-col items-center justify-center">
        <h1 className="text-[64px]">Sign in</h1>
        <input
          className="text-[#FFFFFF] bg-[#224957] w-[300px] h-[45px] rounded-md p-2"
          value={email}
          id="email"
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="text-[#FFFFFF] bg-[#224957] w-[300px] h-[45px] rounded-md p-2"
          value={password}
          id="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button
          type="submit"
          onClick={(e) => onSubmit(e)}
          className="bg-[#2BD17E] w-[300px] h-[45px] rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
