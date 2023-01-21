"use client";

import "../styles/globals.css";
import "normalize.css";
import Image from "next/image";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <>
          <title>Barcode 128 Generator</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta
            name="description"
            content="Barcode 128 Generator - Feel Free to use it! "
          />
          <link rel="icon" href="/favicon.ico" />
        </>
      </head>
      <body>
        <div className="flex h-screen flex-col">
          <div className="relative">
            <div className="mx-auto px-6">
              <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <a href="/">
                    <span className="sr-only">Your Company</span>

                    <Image
                      src="/bar_code.svg"
                      alt="Bar Code Logo"
                      className="h-7 w-auto sm:h-10"
                      width={100}
                      height={24}
                      priority
                    />
                  </a>
                </div>
                <nav className="space-x-10">
                  <a
                    href="/list"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Listagem
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <main className="flex flex-col flex-1 items-center overflow-auto justify-between">
            {children}
            <ToastContainer position="top-center" />
            <footer>Marcelo Andrade &#169; 2023</footer>
          </main>
        </div>
      </body>
    </html>
  );
}
