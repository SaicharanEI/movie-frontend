"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3009/user", {
        email,
        password,
      });
      if (response.status === 200) {
        router.replace("/");
      } else {
        console.log(response);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <p className="mb-4">Sign in</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="text-black"
              value={email}
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black"
            />
          </div>
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
}
