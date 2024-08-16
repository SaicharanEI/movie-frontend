"use client";
import { Montserrat } from "next/font/google";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Import the Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "600", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken && pathname !== "/sign-in") {
      router.push("/sign-in");
    } else if (storedToken && pathname === "/sign-in") {
      router.push("/movie-list");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <head></head>
      <body className={`${montserrat.className}`}>
        {children}
        <img src="./Vectors.png" className="main-image" alt="logo" />
      </body>
    </html>
  );
}
