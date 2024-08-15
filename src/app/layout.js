// // import { Inter } from "next/font/google";
// // import "./globals.css";
// // import { AuthProvider } from "./components/authContext";

// // const inter = Inter({ subsets: ["latin"] });

// // export const metadata = {
// //   title: "Create Next App",
// //   description: "Generated by create next app",
// // };

// // export default function RootLayout({ children }) {
// //   return (
// //     <html lang="en">
// //       <head

// //    <link rel="preconnect" href="https://fonts.googleapis.com">
// // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// // <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>

// //       />
// //       <body className={`main ${inter.className} `}>
// //         {<AuthProvider>{children}</AuthProvider>}
// //       </body>
// //     </html>
// //   );
// // }
// "use client";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "./context/authContext";
// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";

// import { Montserrat } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["100", "400", "900"],
//   style: ["normal", "italic"],
// });

// // export default function RootLayout({ children }) {
// //   return (
// //     <html lang="en">
// //       <head></head>
// //       <body className={`main ${inter.className}`}>
// //         <AuthProvider>{children}</AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }

// export default function RootLayout({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");

//     if (!storedToken && pathname !== "/sign-in") {
//       router.push("/sign-in");
//     } else if (storedToken && pathname === "/sign-in") {
//       router.push("/");
//     }
//   }, [pathname, router]);

//   return (
//     <html lang="en">
//       <head>
//         <style>
//           {/* {`
//             body {
//               font-family: ${montserrat.style.fontFamily};
//             }
//           `} */}
//         </style>
//       </head>
//       <body className={`main ${montserrat.className}`}>{children}</body>
//     </html>
//   );
// }
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
      router.push("/");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <head></head>
      <body className={`main ${montserrat.className}`}>
        {children}
        <img src="./Vectors.png" className="main-image" alt="logo" />
      </body>
    </html>
  );
}
