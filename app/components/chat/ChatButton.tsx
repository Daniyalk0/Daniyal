"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatWindow } from "./ChatWindow";
// import { ChatWindow } from "./ChatWindow";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary hover:scale-110 transition-transform p-4 rounded-full shadow-2xl text-white bg-blue-600 dark:bg-blue-500"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh]"
          >
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}