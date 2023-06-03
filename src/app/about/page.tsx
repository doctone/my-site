"use client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

function About() {
  return (
    <section
      style={{ height: "100vh", display: "flex", justifyContent: "center" }}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        minHeight="inherit"
      >
        <Text>I am passionate about software brah</Text>
      </Box>
    </section>
  );
}

export default About;
