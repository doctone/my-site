"use client";
import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";

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
  const { theme } = useTheme();
  const collapseColor = theme === "light" ? "bg-teal-500" : "bg-gray-500";

  return (
    <div className={className}>
      <Button onClick={onToggle}>{buttonText}</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          className={collapseColor}
          p="40px"
          color="white"
          mt="4"
          rounded="md"
          shadow="md"
        >
          {children}
        </Box>
      </Collapse>
    </div>
  );
}
