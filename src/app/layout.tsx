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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <title>Sam James - Software Engineer</title>
        <meta name="description" content="UK-based software engineer building AI systems for planning permission, with experience in fintech, e-commerce, and data analytics." />
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
