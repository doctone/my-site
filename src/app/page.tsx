"use client";
import { Box, Divider, Text } from "@chakra-ui/react";
import { Content } from "./components/Content/Content";
import { Title } from "./components/TItle/Title";
import { Space_Mono } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const inter = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const funFacts = useMemo(() => {
    return [
      "I enjoy teaching my kids chess",
      "I love listening to music that's not taylor swift",
      "I learn by breaking things, and then fixing them",
      "Event-Driven Architecture is my jam",
      "I was a jazz pianist in my previous career",
      "I am huge Coen Brothers fan",
      "I love test-driven development",
      "most saturdays are for DIY and playing with my children",
      "my wife is awesome, she's a dancer and a mother",
      "I'm a big fan of Domain Driven Design",
    ];
  }, []);
  const [factNumber, setFactNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactNumber((factNumber + 1) % funFacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [funFacts, setFactNumber, factNumber]);
  return (
    <main className={inter.className}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="inherit"
        margin={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          height="100vh"
          width={["100%", "70%"]}
        >
          <Title>Hello, I&apos;m Sam</Title>
          <Text fontSize="xl" fontWeight={200}>
            <motion.div
              key={factNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {funFacts[factNumber]}
            </motion.div>
          </Text>
          <Divider margin={[5, 10]} />
          <Text>
            I am a software engineer based in the UK. I currently work for a
            Data Infrastructure and Analytics platform based in the US. My
            current project is building a user experience for Private Equity
            firms to manage their Carbon Accounting. Check out a preview below:
          </Text>
        </Box>
        <Divider sx={{ border: "1px solid black" }} />
      </Box>
    </main>
  );
}
