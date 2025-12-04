"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const funFacts = useMemo(() => {
    return [
      "Teaching my kids chess on weekends",
      "Former jazz pianist turned software engineer",
      "I learn by breaking things, then fixing them",
      "Event-Driven Architecture enthusiast",
      "Huge Coen Brothers fan",
      "Test-driven development advocate",
      "Most Saturdays are for DIY and family time",
      "Married to a dancer and amazing mother",
      "Building systems that solve real problems",
    ];
  }, []);
  const [factNumber, setFactNumber] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactNumber((prev) => (prev + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [funFacts]);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        style={{ opacity, scale }}
      >
        <div className={styles.heroContent}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            SOFTWARE ENGINEER · UK
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            SAM
            <br />
            JAMES
          </motion.h1>

          <motion.div
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div
              key={factNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.factText}
            >
              {funFacts[factNumber]}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span>SCROLL</span>
            <div className={styles.scrollLine} />
          </motion.div>
        </div>

        <div className={styles.heroBackground}>
          <div className={styles.gridOverlay} />
        </div>
      </motion.section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.sectionLabel}>[ 01 ]</h2>
            <div className={styles.contentGrid}>
              <div className={styles.contentMain}>
                <h3 className={styles.headline}>
                  Building digital
                  <br />
                  <span className={styles.headlineAccent}>experiences</span>
                  <br />
                  that matter
                </h3>
              </div>
              <div className={styles.contentSidebar}>
                <p className={styles.bodyText}>
                  UK-based software engineer. Built data infrastructure for US analytics
                  platforms, modernized payment systems for a major e-commerce company,
                  and delivered carbon accounting tools for Private Equity firms. Now
                  building AI systems to transform planning permission in the UK.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className={styles.projectSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionLabel}>SELECTED WORK</h2>
          <div className={styles.projectsGrid}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={styles.projectCard}
            >
              <div className={styles.projectHeader}>
                <span className={styles.projectLabel}>DATA & ANALYTICS</span>
                <h3 className={styles.projectTitle}>Carbon Accounting Platform</h3>
                <p className={styles.projectDescription}>
                  Built comprehensive UX for Private Equity firms to track and manage
                  their carbon footprint across portfolio companies. Event-driven
                  architecture with real-time data synchronization.
                </p>
              </div>
              <div className={styles.projectVideo}>
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7153441244734472192?compact=1"
                  height="399"
                  width="710"
                  allowFullScreen
                  title="Embedded post"
                  className={styles.iframe}
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.projectCard}
            >
              <div className={styles.projectHeader}>
                <span className={styles.projectLabel}>FINTECH · E-COMMERCE</span>
                <h3 className={styles.projectTitle}>Enterprise Payments System</h3>
                <p className={styles.projectDescription}>
                  Architected and delivered a scalable payments infrastructure for a
                  major e-commerce platform. Handled millions of transactions with
                  99.99% uptime, integrating multiple payment providers and fraud
                  detection systems.
                </p>
              </div>
              <div className={styles.projectTags}>
                <span className={styles.tag}>Microservices</span>
                <span className={styles.tag}>Event Sourcing</span>
                <span className={styles.tag}>High Availability</span>
                <span className={styles.tag}>PCI Compliance</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Work */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.sectionLabel}>[ 02 ]</h2>
            <div className={styles.contentGrid}>
              <div className={styles.contentMain}>
                <h3 className={styles.headline}>
                  Building AI for
                  <br />
                  <span className={styles.headlineAccent}>Planning Permission</span>
                </h3>
              </div>
              <div className={styles.contentSidebar}>
                <p className={styles.bodyText}>
                  At Xylo we&apos;re transforming Local Government Planning services
                  with AI. Building intelligent systems that accelerate planning
                  decisions, helping deliver homes faster across the UK and addressing
                  the housing crisis at scale.
                </p>
                <div className={styles.currentWorkHighlights}>
                  <div className={styles.highlight}>
                    <span className={styles.highlightLabel}>Previous:</span>
                    <span>EdTech · Event-Driven Architectures</span>
                  </div>
                  <div className={styles.highlight}>
                    <span className={styles.highlightLabel}>Side Project:</span>
                    <Link href="https://www.fastfeet.run" className={styles.projectLink}>
                      <span>FastFeet.run - AI Running Planner</span>
                      <span className={styles.arrow}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={styles.contactContent}
          >
            <h2 className={styles.contactTitle}>Let&apos;s Connect</h2>

            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>EMAIL</div>
                <a href="mailto:samjojames@gmail.com" className={styles.contactLink}>
                  samjojames@gmail.com
                </a>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactLabel}>GITHUB</div>
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
