"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const WithAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = window.localStorage.getItem("token");
        if (!storedToken) {
          redirect("/sign-in");
        } else {
          setToken(storedToken);
        }
      }
    }, []);

    if (!token) {
      return null;
    }
    console.log(Component, "props");
    return <Component {...props} />;
  };
};

export default WithAuth;
