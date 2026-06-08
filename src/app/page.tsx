import Image from "next/image";
import styles from "./page.module.css";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/doctone",
    icon: (
      <path
        fill="currentColor"
        d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sam-james1991/",
    icon: (
      <>
        <path fill="currentColor" d="M4.8 3.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM.7 7h3.8v12.2H.7V7Z" />
        <path fill="currentColor" d="M7 7h3.6v1.7h.1c.5-1 1.7-2.1 3.6-2.1 3.8 0 4.5 2.5 4.5 5.8v6.8H15v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2v6.1H7V7Z" />
      </>
    ),
  },
  {
    label: "Email",
    href: "mailto:samjojames@gmail.com",
    icon: (
      <path
        d="M2.5 5.5h19v13h-19v-13Zm.8.8 8.7 7 8.7-7M3.3 17.7l6.3-6m11.1 6-6.3-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    ),
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
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
          I design and build intelligent products for complex, real-world
          problems.
        </p>
        <p className={`${styles.intro} ${styles.focus}`}>
          Currently bringing clarity to complex enterprise systems.
        </p>

        <nav className={styles.links} aria-label="Find Sam online">
          {links.map(({ label, href, icon }) => (
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
                {icon}
              </svg>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
