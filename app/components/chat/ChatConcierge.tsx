"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { Send, Feather, X, History, Sparkles, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTIONS = [
  { label: "About Me", query: "Tell me about Daniyal." },
  { label: "Best Project", query: "Tell me about Greenova." },
  { label: "Why Hire?", query: "Why should I hire Daniyal?" },
];

interface Props {
  variant?: "desktop-hero" | "mobile-persistent";
}

export function VintageAssistant({ variant = "desktop-hero" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string, createdAt: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("vintage_chat_v2");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (messages.length > 0)
      localStorage.setItem("vintage_chat_v2", JSON.stringify(messages));
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

 const handleSend = async (text: string) => {
  if (!text.trim() || isLoading) return;

  const userMsg = {
    role: "user",
    content: text,
    createdAt: new Date().toISOString(),
  };

  const newMessages = [...messages, userMsg];
  setMessages(newMessages);
  setInput("");
  setIsLoading(true);

  try {
    const apiMessages = newMessages.map(({ role, content }) => ({
      role,
      content,
    }));

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: apiMessages,
      }),
    });

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;

      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch {
        // Response wasn't JSON; keep the default message.
      }

      throw new Error(`${response.status}:${errorMessage}`);
    }

    if (!response.body) {
      throw new Error("NO_RESPONSE_BODY");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantContent = "";

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      },
    ]);

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      assistantContent += decoder.decode(value, { stream: true });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].content = assistantContent;
        return updated;
      });
    }
  } catch (err: any) {
    console.error(err);

    let message =
      "The AI assistant couldn't process your request. Please try again later.";

    if (err.message.startsWith("429")) {
      message =
        "The AI assistant is temporarily unavailable because the usage limit has been reached. Please try again later.";
    } else if (err.message.startsWith("401")) {
      message =
        "The AI assistant is currently unavailable due to a configuration issue.";
    } else if (err.message.startsWith("403")) {
      message =
        "Access to the AI assistant is currently restricted.";
    } else if (err.message.startsWith("404")) {
      message =
        "The AI assistant service could not be found. Please contact the site owner.";
    } else if (err.message.startsWith("500")) {
      message =
        "The AI assistant encountered an internal server error. Please try again in a few moments.";
    } else if (
      err.message === "Failed to fetch" ||
      err.name === "TypeError"
    ) {
      message =
        "Unable to connect to the AI assistant. Please check your internet connection and try again.";
    } else if (err.message === "NO_RESPONSE_BODY") {
      message =
        "The AI assistant returned an empty response. Please try again.";
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: message,
        createdAt: new Date().toISOString(),
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[500px] h-[600px] flex flex-col bg-[#f4ead5] dark:bg-[#12100e] shadow-2xl border border-[#d6c5a8] dark:border-[#2d261f] overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#d6c5a8] dark:border-[#2d261f] flex justify-between items-center bg-[#ede2ca] dark:bg-[#1a1714]">
              <div className="flex items-center gap-3">
                <History
                  size={14}
                  className="text-[#8c7b65] cursor-pointer hover:text-red-700 transition-colors"
                  onClick={() => {
                    setMessages([]);
                    localStorage.removeItem("vintage_chat_v2");
                  }}
                />
                <span className="font-serif italic text-xs text-[#3d342b] dark:text-[#d6c5a8] flex items-center gap-2">
                  <Sparkles size={10} className="animate-pulse" /> Daniyal's AI
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8c7b65] hover:rotate-90 transition-transform duration-300"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6"
            >
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center space-y-8"
                >
                  <div className="text-center space-y-2 opacity-50">
                    <Feather size={32} className="mx-auto text-[#b5a48b]" />
                    <p className="font-serif italic text-sm text-[#5c4d3c] dark:text-[#a3927e]">
                      "How may I assist your inquiry?"
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-[280px]">
                    {SUGGESTIONS.map((s, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{
                          x: 5,
                          backgroundColor: "rgba(181, 164, 139, 0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSend(s.query)}
                        className="text-left font-serif italic text-xs border border-[#d6c5a8] dark:border-[#2d261f] p-3 rounded-sm text-[#3d342b] dark:text-[#d6c5a8] flex justify-between items-center group"
                      >
                        {s.label}{" "}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="group relative max-w-[90%]">
                    {/* Copy Button (Assistant Only) */}
                    {m.role === "assistant" && (
                      <button
                        onClick={() => handleCopy(m.content, i)}
                        className="absolute right-2 bottom-2 rounded-md p-1.5 text-[#8b7b68]
                     opacity-0 transition-all duration-200
                     hover:bg-black/5 dark:hover:bg-white/5
                     group-hover:opacity-100"
                        aria-label="Copy message"
                      >
                        {copiedIndex === i ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    )}

                    <div
                      className={`rounded-sm p-3 ${
                        m.role === "user"
                          ? "border border-[#d6c5a8] bg-[#ede2ca]/50 dark:border-[#2d261f] dark:bg-[#1a1714]"
                          : ""
                      }`}
                    >
                      <div
                        className={`font-serif text-sm leading-relaxed ${
                          m.role === "user"
                            ? "italic text-[#3d342b] dark:text-[#d6c5a8]"
                            : "text-[#1a1a1a] dark:text-[#ccc2b3]"
                        }`}
                      >
                        <div className="prose prose-stone dark:prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`mt-1 px-1 text-[10px] text-[#8b7b68] dark:text-[#6f665b] ${
                        m.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="font-serif italic text-xs text-[#8c7b65] animate-pulse">
                  Engraving...
                </div>
              )}
            </div>

            {/* Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-6 border-t border-[#d6c5a8] dark:border-[#2d261f] bg-[#ede2ca]/20"
            >
              <div className="flex items-center gap-3">
                <input
                  className="flex-1 bg-transparent border-none outline-none font-serif italic text-sm text-[#1a1a1a] dark:text-[#d6c5a8] placeholder:text-[#b5a48b]"
                  placeholder="Inscribe here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isLoading}
                  className="text-[#5c4d3c] dark:text-[#a3927e]"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (variant === "desktop-hero") {
    return (
      <>
        <div className="hidden lg:block absolute left-0 top-1/6 -translate-y-1/2 z-30 pointer-events-none">
          <motion.div
            initial={{ x: -10 }}
            animate={{
              x: [0, 12, 0],
              filter: [
                "sepia(0.2) contrast(1)",
                "sepia(0.4) contrast(1.05)",
                "sepia(0.2) contrast(1)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-auto group"
          >
            <motion.button
              whileHover={{ width: 550, x: 20 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center w-[400px] h-14 
                         bg-gradient-to-r from-[#f4ead566] via-[#f4ead5]/70 to-transparent 
                         dark:from-[#1a16129e] dark:via-[#1a1612]/90 dark:to-transparent 
                         border-y border-[#d6c5a8]/50 dark:border-[#3d342b]/50 
                         backdrop-blur-[2px] relative overflow-hidden group/btn shadow-[15px_10px_40px_rgba(0,0,0,0.03)]"
              style={{
                maskImage:
                  "linear-gradient(to right, black 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 80%, transparent 100%)",
              }}
            >
              {/* Subtle Paper Grain Texture */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

              <div className="flex items-center w-full px-10 gap-5">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Feather
                    size={18}
                    className="text-[#8c7b65] dark:text-[#5c4d3c] opacity-70 group-hover/btn:text-amber-800 transition-colors"
                  />
                </motion.div>

                <div className="flex flex-1 items-center gap-2 overflow-hidden">
                  <span className="text-[#3d342b] dark:text-[#d6c5a8] font-serif italic text-base tracking-tight whitespace-nowrap opacity-60 group-hover/btn:opacity-90 transition-opacity">
                    Inscribe your inquiry...
                  </span>

                  {/* Blinking Calligraphy Cursor */}
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-[1.5px] h-5 bg-[#b5a48b] dark:bg-[#3d342b]"
                  />
                </div>

                <div className="flex items-center gap-3 ml-auto pr-10 opacity-0 group-hover/btn:opacity-40 transition-all duration-700 transform translate-x-4 group-hover/btn:translate-x-0">
                  <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#8c7b65]">
                    Open
                  </span>
                  <div className="w-1.5 h-[1px] bg-[#8c7b65]" />
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
        {mounted && createPortal(modalContent, document.body)}
      </>
    );
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="flex lg:hidden fixed bottom-6 right-6 z-[200] w-14 h-14 bg-[#f4ead5] dark:bg-[#1a1612] border border-[#d6c5a8] dark:border-[#3d342b] rounded-full shadow-2xl items-center justify-center"
      >
        <Feather size={20} className="text-[#5c4d3c] dark:text-[#a3927e]" />
      </motion.button>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
