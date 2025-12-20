"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  const funFacts = useMemo(
    () => [
      "Teaching my kids chess on weekends",
      "Former jazz pianist turned software engineer",
      "I learn by breaking things, then fixing them",
      "Event-Driven Architecture enthusiast",
      "Huge Coen Brothers fan",
      "Test-driven development advocate",
      "Most Saturdays are for DIY and family time",
      "Married to a dancer and amazing mother",
      "Building systems that solve real problems",
    ],
    []
  );
  const [factNumber, setFactNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactNumber((prev) => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [funFacts]);

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div className={styles.eyebrow} {...fadeIn}>
            Software Engineer
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Sam James
          </motion.h1>

          <motion.div
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span
              key={factNumber}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.factText}
            >
              {funFacts[factNumber]}
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.contentGrid}>
              <div>
                <h2 className={styles.headline}>
                  Building digital experiences that matter
                </h2>
              </div>
              <div>
                <p className={styles.bodyText}>
                  UK-based software engineer. Built data infrastructure for US
                  analytics platforms, modernized payment systems for a major
                  e-commerce company, and delivered carbon accounting tools for
                  Private Equity firms. Now building AI systems to transform
                  planning permission in the UK.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className={styles.projectSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionLabel}>Selected Work</h2>
          <div className={styles.projectsGrid}>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={styles.projectCard}
            >
              <div className={styles.projectHeader}>
                <span className={styles.projectLabel}>Data & Analytics</span>
                <h3 className={styles.projectTitle}>
                  Carbon Accounting Platform
                </h3>
                <p className={styles.projectDescription}>
                  Built comprehensive UX for Private Equity firms to track and
                  manage their carbon footprint across portfolio companies.
                  Event-driven architecture with real-time data synchronization.
                </p>
              </div>
              <div className={styles.projectVideo}>
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7153441244734472192?compact=1"
                  height="399"
                  width="710"
                  allowFullScreen
                  title="Carbon Accounting Platform demo"
                  className={styles.iframe}
                />
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={styles.projectCard}
            >
              <div className={styles.projectHeader}>
                <span className={styles.projectLabel}>Fintech</span>
                <h3 className={styles.projectTitle}>
                  Enterprise Payments System
                </h3>
                <p className={styles.projectDescription}>
                  Architected and delivered a scalable payments infrastructure
                  for a major e-commerce platform. Handled millions of
                  transactions with 99.99% uptime, integrating multiple payment
                  providers and fraud detection systems.
                </p>
              </div>
              <div className={styles.projectTags}>
                <span className={styles.tag}>Microservices</span>
                <span className={styles.tag}>Event Sourcing</span>
                <span className={styles.tag}>High Availability</span>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Current Work */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.contentGrid}>
              <div>
                <h2 className={styles.headline}>
                  Building AI for Planning Permission
                </h2>
              </div>
              <div>
                <p className={styles.bodyText}>
                  At Xylo we&apos;re transforming Local Government Planning
                  services with AI. Building intelligent systems that accelerate
                  planning decisions, helping deliver homes faster across the UK
                  and addressing the housing crisis at scale.
                </p>
                <div className={styles.currentWorkHighlights}>
                  <div className={styles.highlight}>
                    <span className={styles.highlightLabel}>Previous</span>
                    <span>EdTech, Event-Driven Architectures</span>
                  </div>
                  <div className={styles.highlight}>
                    <span className={styles.highlightLabel}>Side Project</span>
                    <Link
                      href="https://www.fastfeet.run"
                      className={styles.projectLink}
                    >
                      <span>FastFeet.run</span>
                      <span className={styles.arrow}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={styles.contactContent}
          >
            <h2 className={styles.contactTitle}>Get in Touch</h2>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>Email</div>
                <a
                  href="mailto:samjojames@gmail.com"
                  className={styles.contactLink}
                >
                  samjojames@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>GitHub</div>
                <a
                  href="https://github.com/doctone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  github.com/doctone
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <span>© 2024 Sam James</span>
            <span className={styles.footerDivider}>·</span>
            <span>Software Engineer</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
