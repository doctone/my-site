import type { ReactNode } from "react";
import Image from "next/image";
import { profile, type ProfileLink } from "@/data/profile";
import { KeyboardMorph } from "./components/KeyboardMorph/KeyboardMorph";
import styles from "./page.module.css";

const icons: Record<ProfileLink["label"], ReactNode> = {
  GitHub: (
    <path
      fill="currentColor"
      d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"
    />
  ),
  LinkedIn: (
    <>
      <path
        fill="currentColor"
        d="M4.8 3.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM.7 7h3.8v12.2H.7V7Z"
      />
      <path
        fill="currentColor"
        d="M7 7h3.6v1.7h.1c.5-1 1.7-2.1 3.6-2.1 3.8 0 4.5 2.5 4.5 5.8v6.8H15v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2v6.1H7V7Z"
      />
    </>
  ),
  Email: (
    <path
      d="M2.5 5.5h19v13h-19v-13Zm.8.8 8.7 7 8.7-7M3.3 17.7l6.3-6m11.1 6-6.3-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
};

export default function Home() {
  return (
    <main>
      <div className={styles.cover}>
        <section className={styles.profile} aria-labelledby="profile-title">
          <div className={styles.avatar}>
            <Image
              src="/profile-photo.png"
              alt="Portrait of Sam James"
              width={96}
              height={96}
              priority
            />
          </div>

          <h1 id="profile-title" className={styles.title}>
            Hey, I&apos;m Sam
          </h1>

          <p className={styles.intro}>
            I build software that finds the signal in everyone else&apos;s
            noise.
          </p>
          <p className={`${styles.intro} ${styles.focus}`}>
            Formerly a jazz pianist. Still improvising, just with better tests.
          </p>

          <nav className={styles.links} aria-label="Find Sam online">
            {profile.links.map(({ label, href }) => (
              <a
                key={label}
                className={styles.link}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {icons[label]}
                </svg>
              </a>
            ))}
          </nav>
        </section>

        <a className={styles.cue} href="#story">
          My story
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m6 9 6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </a>
      </div>

      <section
        id="story"
        className={styles.story}
        aria-labelledby="story-title"
      >
        <h2 id="story-title" className={`${styles.heading} ${styles.reveal}`}>
          My story
        </h2>

        <p className={`${styles.prose} ${styles.reveal}`}>
          I&apos;m a jazz pianist, and I spent a lot of my early years obsessed
          with the piano. I went to music college, played professionally in
          London, toured and recorded albums. The piano was my home.
        </p>
        <p className={`${styles.prose} ${styles.reveal}`}>
          It cultivated in me an appetite for creativity within parameters.
          There are only 88 keys on a piano, but an infinite number of things
          you can do with them.
        </p>

        <KeyboardMorph />

        <p className={`${styles.prose} ${styles.reveal}`}>
          Since becoming an engineer, that&apos;s how I&apos;ve always felt
          about building software. The right parameters give you the most
          effective means for creativity.
        </p>

        <h2 className={`${styles.heading} ${styles.reveal}`}>
          What I&apos;m building
        </h2>
        <p className={`${styles.prose} ${styles.reveal}`}>
          {profile.currentFocus.summary}
        </p>
      </section>
    </main>
  );
}
