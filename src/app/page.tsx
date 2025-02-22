"use client";
import { Box, Divider, Text } from "@chakra-ui/react";
import { Content } from "./components/Content/Content";
import { Title } from "./components/TItle/Title";
import { Space_Mono } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

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
          gap={1}
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
            I am a software engineer based in the UK. I recently worked for a
            Data Infrastructure and Analytics platform based in the US. One of
            my projects was building a user experience for Private Equity firms
            to manage their Carbon Accounting. Check out a preview below:
          </Text>
          <Box display="flex" justifyContent="center" maxWidth="80%">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7153441244734472192?compact=1"
              height="399"
              width="710"
              allowFullScreen
              title="Embedded post"
            ></iframe>
          </Box>
          <Divider
            sx={{ marginY: 4, border: "1px solid white", maxWidth: "60%" }}
          />
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            gap={2}
          >
            <Text fontSize="3xl">Reach out</Text>
            <Text>
              I am now working in the EdTech space building event driven
              architectures with a large team of stellar engineers. Another
              recent project of mine was building an Ai powered running planner:
            </Text>
            <Link href={"https://www.fastfeet.run"}>www.fastfeet.run</Link>

            <Text>Checkout my stuff on github:</Text>
            <SocialIcon url="https://github.com/doctone" />
            <Text>or feel to reach my directly on samjojames@gmail.com</Text>
          </Box>
        </Box>
        {/* <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
          dragElastic={1}
        >
        </motion.div> */}
        <Divider sx={{ border: "1px solid black" }} />
      </Box>
    </main>
  );
}
