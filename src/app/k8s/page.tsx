import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kubernetes: Deployments & Pods | Sam James",
  description:
    "An interactive introduction to Kubernetes Deployments and Pods, built around the same desired-vs-actual loop a thermostat uses.",
};

export default function K8sPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro} aria-labelledby="k8s-title">
        <h1 id="k8s-title" className={styles.title}>
          Kubernetes, one thermostat at a time
        </h1>

        <div className={styles.thermostat}>
          <Image
            src="/k8s/thermostat.svg"
            alt="A thermostat set to 21°C"
            width={240}
            height={240}
            priority
          />
        </div>

        <p className={styles.prose}>
          You don&apos;t tell a thermostat &ldquo;run the heater for 20
          minutes&rdquo;. You tell it &ldquo;I want 21°C&rdquo;, and it keeps
          checking the room and correcting: heater on while it&apos;s cold,
          off once it&apos;s warm enough, on again the moment it drifts back
          down.
        </p>
        <p className={styles.prose}>
          Kubernetes runs on the same loop. You declare the{" "}
          <strong>desired state</strong> &mdash; &ldquo;3 replicas of this
          app&rdquo; &mdash; and a controller keeps comparing it against the{" "}
          <strong>actual state</strong> of the cluster, closing the gap
          whenever the two drift apart. That loop, desired vs actual, is the
          one idea the rest of this course builds on.
        </p>
        <p className={styles.prose}>
          The analogy only goes so far, though. A thermostat nudges a single
          number up or down. Kubernetes doesn&apos;t nudge a broken pod back
          to health &mdash; it throws the pod away and starts a fresh one.
          More on that when we get to self-healing.
        </p>
      </section>

      <section
        className={styles.lesson}
        aria-label="Lesson"
        data-testid="k8s-lesson"
      >
        <p className={styles.comingSoon}>
          The interactive scenes for this lesson are coming next.
        </p>
      </section>
    </main>
  );
}
