import styles from "./KeyboardMorph.module.css";

const notes = ["C", "D", "E", "F", "G", "A", "B"];
const homeRow = ["A", "S", "D", "F", "J", "K", "L"];
const blackKeyPositions = [1, 2, 4, 5, 6];

/**
 * One piano octave that morphs into the keyboard home row as it scrolls
 * through the viewport. Decorative, so hidden from assistive technology.
 * Browsers without scroll-driven animations, and visitors who prefer
 * reduced motion, see a still piano.
 */
export function KeyboardMorph() {
  return (
    <figure className={styles.keyboard} aria-hidden="true">
      <div className={styles.keys}>
        {notes.map((note, index) => (
          <span key={note} className={styles.whiteKey}>
            <span className={styles.note}>{note}</span>
            <span className={styles.letter}>{homeRow[index]}</span>
          </span>
        ))}
        {blackKeyPositions.map((position) => (
          <span
            key={position}
            className={styles.blackKey}
            style={{ left: `calc(${position} * 100% / 7 - 4%)` }}
          />
        ))}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.note}>one octave</span>
        <span className={styles.letter}>home row</span>
      </figcaption>
    </figure>
  );
}
