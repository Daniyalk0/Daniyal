"use client";

import { useState } from "react";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  async function ask() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

   const text = await res.text();

console.log(text);
console.log(res.status);

    // setAnswer(data.text);
  }

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Ask Daniyal
      </h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded w-full p-3"
        placeholder="Ask me anything..."
      />

      <button
        onClick={ask}
        className="bg-black text-white px-5 py-3 rounded"
      >
        Ask
      </button>

      <div className="rounded border p-6 whitespace-pre-wrap">
        {answer}
      </div>
    </main>
  );
}