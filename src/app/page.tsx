"use client";
import { Box, Button } from "@chakra-ui/react";
import { Content } from "./components/Content/Content";
import { ThemeChanger } from "./components/ThemeChanger/ThemeChanger";
import { Title } from "./components/TItle/Title";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeChanger />
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        minHeight="inherit"
      >
        <Box display="flex-col" gap={2}>
          <Title>Sam James</Title>
          <Content />
        </Box>
      </Box>
    </main>
  );
}
