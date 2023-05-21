import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <List spacing={1}>
        <ListItem>
          <Text fontSize={24}>Full Stack Software Engineering</Text>
          <br />
        </ListItem>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ opacity: 0 }}
        >
          <ListItem>Typescript, React, Node, AWS</ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: 0 }}
        >
          <ListItem>Scalable Domain Driven Design</ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ opacity: 0 }}
        >
          <ListItem>Test-Driven Development</ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity: 0 }}
        >
          <ListItem>Event Driven Architecture</ListItem>
        </motion.div>
      </List>
    </Box>
  );
}
