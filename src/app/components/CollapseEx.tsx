"use client";

import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

interface CollapseInterface {
  buttonText: string;
  collapseText: string;
  className?: string;
}

export function CollapseEx({
  buttonText,
  collapseText,
  className,
}: CollapseInterface) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div className={className}>
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
    </div>
  );
}
