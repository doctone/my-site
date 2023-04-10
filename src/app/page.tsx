import { CollapseEx } from "./components/CollapseEx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Hello world</h1>
      <CollapseEx buttonText="click me" collapseText="here I am" />
    </main>
  );
}
