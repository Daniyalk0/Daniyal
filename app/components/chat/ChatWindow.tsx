"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Trash2, Send, Mail, Sparkles, MessageSquare, X } from "lucide-react";

const SUGGESTIONS = [
  "What is Daniyal's tech stack?",
  "Tell me about his projects",
  "How can I hire him?",
];

export function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Load History on Mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_chat_v1");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // 2. Save History on Change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("portfolio_chat_v1", JSON.stringify(messages));
    }
  }, [messages]);

  // 3. Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMsg] }),
      });
      const data = await res.text();
      setMessages([...newMessages, { role: "assistant", content: data }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "The system is currently offline. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("portfolio_chat_v1");
  };

  // Helper to detect if AI is talking about contact/hiring
  const isHiringRelated = (content: string) => {
    const keywords = ["hire", "contact", "email", "job", "work together"];
    return keywords.some((k) => content.toLowerCase().includes(k));
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-amber-600 hover:bg-amber-500 text-black shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all z-50 animate-pulse-slow"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[600px] max-h-[70vh] bg-[#0a0a0a] border border-zinc-800 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden ring-1 ring-white/5">
          {/* Vintage Header */}
          <div className="bg-[#121212] p-4 border-b border-zinc-800 flex justify-between items-center">
            <div>
              <h3 className="text-amber-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} /> Assistant v1.0
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono">
                STABLE_CONNECTION_ESTABLISHED
              </p>
            </div>
            <button
              onClick={clearChat}
              className="text-zinc-600 hover:text-red-400 transition-colors p-1"
              title="Reset Memory"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Message Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
          >
            {messages.length === 0 && (
              <div className="space-y-4 pt-10">
                <div className="text-center">
                  <p className="text-zinc-500 font-mono text-[11px] mb-4 uppercase tracking-tighter">
                    Initialize conversation...
                  </p>
                </div>
                <div className="grid gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="text-left text-[11px] font-mono border border-zinc-800 bg-[#121212] text-zinc-400 p-3 rounded hover:border-amber-900 hover:text-amber-500 transition-all"
                    >
                      {">"} {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
               <div className={`max-w-[85%] group`}>
  <div
    className={`p-3 rounded-md text-sm leading-relaxed ${
      m.role === "user"
        ? "bg-amber-600/10 border border-amber-600/30 text-amber-200 shadow-[0_0_15px_rgba(217,119,6,0.1)]"
        : "bg-[#161616] border border-zinc-800 text-zinc-300"
    }`}
  >
    <div className="prose prose-sm prose-invert prose-amber opacity-90">
      <ReactMarkdown>
        {m.content}
      </ReactMarkdown>
    </div>

    {/* CTA Button Hand-off */}
    {m.role === "assistant" && isHiringRelated(m.content) && (
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <a
          href="mailto:daniyal@example.com"
          className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-black font-bold py-2 rounded text-[11px] uppercase tracking-widest transition-all"
        >
          <Mail size={14} /> Contact Daniyal
        </a>
      </div>
    )}
  </div>

  <p
    className={`text-[9px] mt-1 font-mono uppercase tracking-widest text-zinc-600 ${
      m.role === "user" ? "text-right" : "text-left"
    }`}
  >
    {m.role === "user" ? "User_Subject" : "Assistant_Unit"}
  </p>
</div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="text-amber-600 font-mono text-[10px] animate-pulse">
                  {">"} PROCESSING_REQUEST...
                </div>
              </div>
            )}
          </div>

          {/* Vintage Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-[#0d0d0d] border-t border-zinc-800"
          >
            <div className="relative flex items-center">
              <input
                className="w-full bg-[#121212] border border-zinc-800 text-amber-500 p-3 pr-10 rounded-none outline-none focus:border-amber-700 text-xs font-mono placeholder:text-zinc-700"
                placeholder="TYPE_MESSAGE..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                disabled={isLoading}
                className="absolute right-3 text-zinc-600 hover:text-amber-500 disabled:opacity-30"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
