"use client";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <title>Sam James - Software Engineer</title>
      </head>
      <body>
        <ThemeProvider>
          <CacheProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </CacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
