"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showToast } from "../utils/toast";
import "../globals.css";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password, rememberMe } = data;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/auth/login`,
        {
          email,
          password,
          rememberMe,
        }
      );
      if (response.data.status === 201) {
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
    <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center content-wrapper">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col items-center justify-center"
      >
        <h1 className="text-[25px] md:text-[42px] font-semibold">Sign in</h1>
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            type="text"
            className={`text-[#FFFFFF] bg-[#224957] w-[300px] h-[45px] rounded-md p-2 ${
              errors.email ? "border-2 border-[#EB5757]" : "border-transparent"
            } focus:outline-none focus:ring-0`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            type="password"
            className={`text-[#FFFFFF] bg-[#224957] w-[300px] h-[45px] rounded-md p-2 ${
              errors.password
                ? "border-2 border-[#EB5757]"
                : "border-transparent"
            } focus:outline-none focus:ring-0`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <label className="main1 flex items-center">
          <input {...register("rememberMe")} type="checkbox" className="mr-2" />
          <span className="checkbox-container"></span>
          Remember me
        </label>
        <button
          type="submit"
          className="bg-[#2BD17E] w-[300px] h-[45px] rounded-md font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
