"use client";
import { Box, Divider, Text } from "@chakra-ui/react";
import { Content } from "./components/Content/Content";
import { Title } from "./components/TItle/Title";
import { Space_Mono } from "next/font/google";
import { useEffect, useMemo, useState } from "react";

const inter = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const funFacts = useMemo(() => {
    return [
      "I enjoy teaching my kids chess",
      "I enjoy both traditional more modern jazz",
      "I was a jazz pianist in my previous career",
      "I don't get time to watch as many films as I'd like to",
      "I love test-driven development",
      "my wife is awesome",
      "most saturdays are for DIY and playing with my children",
    ];
  }, []);
  const [factNumber, setFactNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactNumber((factNumber + 1) % funFacts.length);
    }, 2000);

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
            {" "}
            {funFacts[factNumber]}
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
