"use client";

import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

interface CollapseInterface {
  buttonText: string;
  collapseText: string;
}

export function CollapseEx({ buttonText, collapseText }: CollapseInterface) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>{buttonText}</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          {collapseText}
        </Box>
      </Collapse>
    </>
  );
}
