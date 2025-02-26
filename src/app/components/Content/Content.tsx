import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

export function Content() {
  return (
    <Box maxWidth="60%" alignItems="center">
      <Text fontSize="3xl">About</Text>
      <Box display="flex" justifyContent="center" maxWidth="80%">
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7153441244734472192?compact=1"
          height="399"
          width="710"
          allowFullScreen
          title="Embedded post"
        ></iframe>
      </Box>
      <Text>
        I&apos;m most familiar with the world of Typescript, Node, React, AWS,
        Docker and all the fairly standard full-stack shenanigans
      </Text>
      <Text>
        I love building software that can stand the test of time. Software that
        is well tested, robust, and easily extendable. This makes me a pretty
        big fan of Test-Driven-Development, and Domain Driven Design. Here are
        some resources that have helped me on understand these things:
      </Text>
      <Text color="blue.400">
        <Link href="https://www.coursera.org/learn/test-and-behavior-driven-development-tdd-bdd">
          IBM Test Driven Development
        </Link>
      </Text>
      <Text color="blue.400">
        <Link href="https://khalilstemmler.com/articles/domain-driven-design-intro/">
          Khalil Stemmler
        </Link>
      </Text>
      <Text>
        I&apos;m always trying to learn new things and push my thinking capacity
        to the limit ( not that there&apos;s much capacity left after looking
        after my 3 kids ). But I&apos;m almost always working through a course,
        or trying something new.
      </Text>
      <Text fontSize="3xl">Fun Facts</Text>
      <Text>
        In my previous career I was a professional Jazz Pianist. You can check
        out some stuff I&apos;ve played on spotify
      </Text>
      <Text>
        You can often find me playing chess on lichess.org. I&apos;m a fan of
        the King&apos;s Indian Defense, and the Italian Gioco Piano opening.
      </Text>
      <Text fontSize="3xl">Get In Touch</Text>
      <Box display="flex" gap={2}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <SocialIcon url="mailto:samjojames@gmail.com" />
        </motion.button>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <SocialIcon url="https://www.linkedin.com/in/sam-james1991/" />
        </motion.button>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <SocialIcon url="https://github.com/doctone" />
        </motion.button>
      </Box>
    </Box>
  );
}
