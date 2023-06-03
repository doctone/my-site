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
            <Text fontSize="2xl">Scalable, Domain Driven Component design</Text>
          </ListItem>
          <ListItem>
            <Text fontSize="1xl">Typescript, React, CSS</Text>
          </ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: 0 }}
        >
          <ListItem>
            <Text fontSize="2xl">APIs, Event Driven Architecture</Text>
          </ListItem>
          <ListItem>
            <Text fontSize="1xl">Node, Express, SQL, postgres</Text>
          </ListItem>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity: 0 }}
        >
          <ListItem>
            <Text fontSize="2xl">Devops</Text>
          </ListItem>
          <ListItem>
            <Text fontSize="1xl">AWS, Docker, Terraform, Kubernetes</Text>
          </ListItem>
        </motion.div>
      </List>
    </Box>
  );
}
