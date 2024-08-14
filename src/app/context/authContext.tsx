"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken, "stored token");
    console.log(pathname, "pathname");
    if (token && pathname === "/sign-in") {
      router.push("/");
    }

    if (storedToken) {
      setToken(storedToken);
      if (pathname === "/sign-in") {
        router.push("/");
      }
    } else {
      router.push("/sign-in");
    }
  }, [pathname]);

  //   useEffect(() => {
  //     if (token && pathname === "/sign-in") {
  //       router.push("/");
  //     }
  //   }, [token, pathname]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
