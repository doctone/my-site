import { Box, Text } from "@chakra-ui/react";
import React from "react";

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <Box borderBottom="3px solid" borderColor="white">
      <Text fontSize="5xl">{children}</Text>
    </Box>
  );
}
