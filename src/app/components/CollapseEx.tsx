"use client";

import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

interface CollapseInterface {
  buttonText: string;
  children: ReactNode;
  className?: string;
}

export function CollapseEx({
  buttonText,
  children,
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
          {children}
        </Box>
      </Collapse>
    </div>
  );
}
