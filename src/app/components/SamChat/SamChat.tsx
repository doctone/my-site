"use client";

import { FormEvent, useState } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../page.module.css";

export function SamChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "sam-intro",
        role: "assistant",
        content:
          "Hi, I'm Sam's AI assistant. Ask what Sam builds, the outcomes he delivers, and how his stack supports that work.",
      },
    ],
  });

  const onSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event);
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen ? (
        <section
          id="sam-chat-panel"
          className={`${styles.chatSection} ${
            isExpanded ? styles.chatSectionExpanded : ""
          }`}
          aria-label="Chat with Sam James"
        >
          <div className={styles.chatPanelControls}>
            <button
              type="button"
              className={styles.chatPanelAction}
              onClick={() => setIsExpanded((expanded) => !expanded)}
              aria-label={isExpanded ? "Shrink chat panel" : "Expand chat panel"}
              title={isExpanded ? "Shrink chat panel" : "Expand chat panel"}
            >
              <svg
                className={styles.chatPanelActionIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {isExpanded ? (
                  <>
                    <path
                      d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 8l6-6M21 8l-6-6M3 16l6 6M21 16l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : (
                  <>
                    <path
                      d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9l6-6M21 9l-6-6M3 15l6 6M21 15l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
            </button>
            <button
              type="button"
              className={styles.chatPanelAction}
              onClick={() => {
                setIsExpanded(false);
                setIsOpen(false);
              }}
              aria-label="Close chat panel"
              title="Close chat panel"
            >
              X
            </button>
          </div>

          <header className={styles.chatHeader}>
            <p className={styles.chatEyebrow}>Ask About Sam</p>
            <h2 className={styles.chatTitle}>
              Ask What Sam Builds
            </h2>
            <p className={styles.chatDescription}>
              Get quick, accurate answers about Sam James&apos;s engineering
              impact, delivery approach, and the stack behind those outcomes.
            </p>
          </header>

          <div className={styles.chatMessages}>
            {messages.map(
              (message: { id: string; role: string; content: string }) => (
                <article
                  key={message.id}
                  className={`${styles.chatBubble} ${
                    message.role === "user"
                      ? styles.chatBubbleUser
                      : styles.chatBubbleAssistant
                  }`}
                >
                  <p className={styles.chatRole}>
                    {message.role === "user" ? "You" : "Sam AI"}
                  </p>
                  <ReactMarkdown
                    className={styles.chatMarkdown}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                </article>
              ),
            )}

            {error ? (
              <p className={styles.chatError}>
                I couldn&apos;t reach the model right now. Please try again in a
                moment.
              </p>
            ) : null}
          </div>

          <div className={styles.chatSuggestions}>
            <button
              type="button"
              className={styles.suggestionButton}
              onClick={() =>
                onSuggestionClick(
                  "What are Sam James's strongest backend engineering skills?",
                )
              }
            >
              Backend strengths
            </button>
            <button
              type="button"
              className={styles.suggestionButton}
              onClick={() =>
                onSuggestionClick(
                  "How does Sam's experience map to AI product engineering?",
                )
              }
            >
              AI product fit
            </button>
            <button
              type="button"
              className={styles.suggestionButton}
              onClick={() =>
                onSuggestionClick(
                  "What outcomes has Sam delivered in payments, data, and AI products?",
                )
              }
            >
              Outcomes delivered
            </button>
          </div>

          <form className={styles.chatForm} onSubmit={onSubmit}>
            <label className={styles.srOnly} htmlFor="sam-chat-input">
              Ask a question about Sam James
            </label>
            <input
              id="sam-chat-input"
              className={styles.chatInput}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask what Sam built, who it helped, and how he delivered it..."
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className={styles.chatButton}
              disabled={isLoading}
            >
              {isLoading ? "Thinking..." : "Send"}
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className={styles.chatLauncher}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="sam-chat-panel"
        aria-label={
          isOpen
            ? "Close chat with Sam's AI assistant"
            : "Open chat with Sam's AI assistant"
        }
      >
        <svg
          className={styles.chatLauncherIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 18V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9l-4 3v-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 10h6M9 13h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span className={styles.chatLauncherText}>
          {isOpen ? "Close" : "Ask Sam"}
        </span>
      </button>
    </div>
  );
}
