import Link from "next/link";
import { CollapseEx } from "./components/CollapseEx";

export default function Home() {
  return (
    <main className="grid grid-cols-3 min-h-screen gap-4 p-12">
      <CollapseEx buttonText="Hello internet 👋" className="col-span-2">
        I am a full-stack engineer specializing in React, Node, Typescript, and
        AWS. I am interested in high performance, highly cohesive component
        design, event-driven-architecture, and Test-Driven-Development. I have a
        few interests outside code too. Feel free to get in touch with me or
        browse some of my reccomendations
      </CollapseEx>
      <CollapseEx buttonText="Tech 💻" className="col-start-3">
        I am currently working for Novata, an ESG Data Platform. I have other
        projects on the ago from time to time. You can check out my{" "}
        <Link href="">Github</Link>, or reach out to me on{" "}
        <Link href="">LinkedIn</Link> if you are interested in collaborating
      </CollapseEx>
      <CollapseEx buttonText="Chess ♘" className="col-span-2">
        I am keen chess fan, player, and coach. You can find me on lichess
        occasionally playing time controls that I would usually advice against
        <iframe
          src="https://lichess.org/embed/game/moT0Pij5?theme=auto&bg=auto"
          width="600"
          height="397"
          style={{ margin: "12px", borderRadius: "8px" }}
        ></iframe>
      </CollapseEx>
    </main>
  );
}
