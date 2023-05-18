import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import React from "react";

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <List spacing={1}>
        <ListItem>
          <Text fontSize={24}>Full Stack Software Engineering</Text>
          <br />
        </ListItem>
        <ListItem>Typescript, React, Node, AWS</ListItem>
        <ListItem>Scalable Domain Driven Design</ListItem>
        <ListItem>Test-Driven Development</ListItem>
        <ListItem>Event Driven Architecture</ListItem>
      </List>
    </Box>
  );
}
