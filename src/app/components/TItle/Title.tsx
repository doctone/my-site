import { Box, Text } from "@chakra-ui/react";
import React from "react";

export function Title({ children }: { children: React.ReactNode }) {
  return <Text fontSize="5xl">{children}</Text>;
}
