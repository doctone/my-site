"use client";
import { Box } from "@chakra-ui/react";
import { Content } from "./components/Content/Content";
import { ThemeChanger } from "./components/ThemeChanger/ThemeChanger";
import { Title } from "./components/TItle/Title";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeChanger />
      <Box
        alignItems="flex-start"
        justifyContent="center"
        display="flex"
        minHeight="inherit"
        margin={4}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Title>Sam James</Title>
          <Content />
        </Box>
      </Box>
    </main>
  );
}
