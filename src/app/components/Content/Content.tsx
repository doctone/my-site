import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export function Content() {
  return (
    <Box>
      <List spacing={1}>
        <ListItem>
          <Text fontSize="4xl">Full Stack Software Engineering</Text>
          <br />
        </ListItem>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ opacity: 0 }}
        >
          <ListItem>
            <Text fontSize="2xl">Scalable, Domain Driven Design</Text>
          </ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: 0 }}
        >
          <ListItem>
            <Text fontSize="2xl">Test Driven Development</Text>
          </ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity: 0 }}
        >
          <ListItem>
            <Text fontSize="2xl">Node, Typescript, React, AWS, Kubernetes</Text>
          </ListItem>
        </motion.div>
      </List>
    </Box>
  );
}
