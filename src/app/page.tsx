import Link from "next/link";
import { CollapseEx } from "./components/CollapseEx";

export default function Home() {
  return (
    <main className="grid min-h-screen p-24">
      <CollapseEx
        buttonText="Hello internet 👋"
        className="w-1/2 justify-self-start"
      >
        I am a full-stack engineer specializing in React, Node, Typescript, and
        AWS. I am interested in high performance, highly cohesive component
        design, event-driven-architecture, and Test-Driven-Development. I have a
        few interests outside code too. Feel free to get in touch with me or
        browse some of my reccomendations
      </CollapseEx>
      <CollapseEx buttonText="Tech 💻" className="w-full">
        I am currently working for Novata, an ESG Data Platform. I have other
        projects on the ago from time to time. You can check out my{" "}
        <Link href="">Github</Link>, or reach out to me on{" "}
        <Link href="">LinkedIn</Link> if you are interested in collaborating
      </CollapseEx>
    </main>
  );
}
