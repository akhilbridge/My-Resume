"use client";

import { FormEvent, KeyboardEvent, startTransition, useState } from "react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatAssistantProps = {
  prompts: readonly string[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I am Akhil's career assistant. Ask me about his skills, projects, experience, or availability and I will answer from the portfolio data.",
};

export function ChatAssistant({
  prompts,
  title = "Career Assistant",
  subtitle = "Free local portfolio chat. No paid AI service needed.",
  variant = "default",
}: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  async function submitMessage(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isLoading) {
      return;
    }

    const nextUserMessage: ChatMessage = {
      role: "user",
      content: cleanQuestion,
    };

    setDraft("");
    setShowSuggestions(false);
    setIsLoading(true);
    setMessages((current) => [...current, nextUserMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: cleanQuestion,
          messages: [...messages, nextUserMessage],
        }),
      });

      const data = (await response.json()) as { reply?: string };
      const reply =
        data.reply ??
        "I could not answer that clearly yet, but I can help with skills, projects, experience, and hiring questions.";

      startTransition(() => {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: reply,
          },
        ]);
      });
    } catch {
      startTransition(() => {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              "Something went wrong while answering. Please try again in a moment.",
          },
        ]);
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(draft);
    }
  }

  return (
    <div
      className={`chat-panel ${
        variant === "compact" ? "chat-panel-compact" : ""
      }`}
      id="ai-chat"
    >
      {variant === "default" ? (
        <div className="chat-header">
          <div className="chat-botmark">AI</div>
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <span className="chat-status">Online</span>
        </div>
      ) : null}

      <div className="chat-thread" aria-live="polite">
        {messages.map((message, index) => (
          <article
            className={`chat-message chat-message-${message.role}`}
            key={`${message.role}-${index}`}
          >
            <p>{message.content}</p>
          </article>
        ))}
        {isLoading ? (
          <article className="chat-message chat-message-assistant chat-message-typing">
            <p>Thinking through the best answer for you...</p>
          </article>
        ) : null}
      </div>

      {showSuggestions ? (
        <div className="chat-suggestions">
          {prompts.map((prompt) => (
            <button
              className="chat-suggestion"
              key={prompt}
              type="button"
              onClick={() => void submitMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          aria-label="Ask about Akhil"
          className="chat-input"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about skills, current role, or projects..."
          value={draft}
        />
        <button className="chat-submit" disabled={isLoading} type="submit">
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
