"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
const WithAuth = (Component: any) => {
  return (props: any) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        // Ensure window is available
        const storedToken = window.localStorage.getItem("token");
        if (!storedToken) {
          redirect("/sign-in");
        } else {
          setToken(storedToken);
        }
      }
    }, []);

    if (!token) {
      return null; // Prevent rendering until the token is checked
    }

    return <Component {...props} />;
  };
};

export default WithAuth;
