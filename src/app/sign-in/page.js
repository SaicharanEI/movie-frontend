"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { showToast } from "../utils/toast";
import "../globals.css";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, rememberMe);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/auth/login`,
        {
          email,
          password,
          rememberMe,
        }
      );
      console.log(response);
      if (response.data.statusCode === 200) {
        window.localStorage.setItem("token", response.data.access_token);
        router.replace("/");
        showToast("success", response.data.message);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center min-h-screen">
      <form className="space-y-6 flex flex-col items-center justify-center">
        <h1 className="text-[25px] md:text-[42px] font-semibold ">Sign in</h1>
        <input
          className="text-[#FFFFFF] bg-[#224957] w-[300px] h-[45px] rounded-md p-2"
          value={email}
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="text-[#FFFFFF] bg-[#224957] w-[300px] h-[45px] rounded-md p-2"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="main1">
          <input
            type="checkbox"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="checkbox-container"></span>
          Remember me
        </label>
        <button
          type="submit"
          onClick={(e) => onSubmit(e)}
          className="bg-[#2BD17E] w-[300px] h-[45px] rounded-md font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
