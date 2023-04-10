"use client";
import { CollapseEx } from "./components/CollapseEx";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <>
      <div className="flex p-12 justify-end">
        <Link href="https://github.com/doctone/my-site" isExternal>
          It&#39;s a work in progress.. but you can checkout the code for this
          site here. <ExternalLinkIcon mx="2px" />
        </Link>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <CollapseEx
          buttonText="Hello internet 👋"
          collapseText="I am a full-stack engineer specializing in React, Node, Typescript, and AWS. I am interested in high performance, highly cohesive component design, event-driven-architecture, and Test-Driven-Development. I have a few interests outside code too. Feel free to get in touch with me or browse some of my reccomendations"
          className="w-full"
        />
      </main>
    </>
  );
}
