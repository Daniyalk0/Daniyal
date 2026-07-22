# 🚀 My Personal AI Powered Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/AI-Groq%20Llama%203.1-orange?style=flat-square)](https://groq.com/)

A high-performance, editorial-inspired portfolio built with **Next.js 15** (App Router). This project showcases my journey as a Full-Stack Developer, featuring smooth Framer Motion interactions and an intelligent AI assistant that knows everything about my professional background.

## 🌐 Live Demo

**Check it out here:** [https://your-portfolio-url.com](https://your-portfolio-url.com)

---

## ✨ Key Features

*   **🤖 AI Portfolio Assistant:** A custom chatbot powered by **Llama 3.1** via Groq Cloud. It uses a Markdown-based knowledge base to answer visitor queries in real-time.
*   **⚡ Next.js 15 Optimized:** Leveraging the latest React 19 features, Server Components, and optimized hydration.
*   **🎨 Editorial Design:** A clean, typography-focused aesthetic with seamless Dark/Light mode support.
*   **📱 Fully Responsive:** Crafted for all screen sizes, from mobile devices to ultra-wide monitors.
*   **🎬 Smooth Motion:** Integrated with `framer-motion` for meaningful transitions and micro-interactions.
*   **📄 Dynamic Content:** Projects and experience are managed via Markdown/MDX for easy updates.

---

## 🤖 The AI Assistant (Technical Details)

The core of this portfolio is the **AI Assistant**. Unlike standard chatbots, this implementation uses a "RAG-lite" (Retrieval-Augmented Generation) approach:

1.  **Knowledge Base:** My CV and project details are stored in a structured `data/knowledge-base.md`.
2.  **Context Injection:** When a user asks a question, the system reads this context and injects it into the LLM prompt.
3.  **Streaming UI:** Responses are streamed back to the client word-by-word using Vercel AI SDK patterns for a fluid user experience.
4.  **Grounding:** The system is strictly instructed to only answer based on the provided bio to prevent hallucinations.

---

## 🛠️ Tech Stack

| Category           | Technology Used                                                                 |
| ------------------ | ------------------------------------------------------------------------------- |
| **Framework**      | Next.js 15 (App Router), React 19                                               |
| **Language**       | TypeScript                                                                      |
| **Styling**        | Tailwind CSS                                                                    |
| **Animations**     | Framer Motion                                                                   |
| **AI Infrastructure**| Groq API (Llama 3.1 70B), React Markdown                                      |
| **Content**        | Gray-matter (Frontmatter parsing), Markdown                                     |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Daniyalk0/portfolio.git
cd portfolio

```
### 2. Clone the repository
```bash
npm install
# or
pnpm install

```
### 3.Environment Variables
```bash
GROQ_API_KEY=your_groq_api_key_here

```
### 4. Run the development server
```bash
npm run dev  
Open http://localhost:3000 to see the result.

```
## 📁 Project Structure

```text
├── app/
│   ├── api/
│   │   └── chat/          # AI chat API route
│   ├── components/        # Reusable UI components
│   │   ├── chatbot/
│   │   ├── sections/
│   │   └── ui/
│   ├── content/           # Markdown knowledge base
│   │   ├── about.md
│   │   └── projects/
│   │       ├── greenova.md
│   │       ├── writewise-ai.md
│   │       └── salon-template.md
│   ├── lib/               # AI logic & utility functions
│   ├── layout.tsx
│   └── page.tsx
├── public/                # Static assets
├── package.json
└── README.md
```

## 📬 Contact & Socials

I'm always open to discussing new projects, collaborations, or opportunities.

[![GitHub](https://img.shields.io/badge/GitHub-Daniyalk0-181717?style=for-the-badge&logo=github)](https://github.com/Daniyalk0)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Daniyal%20Khan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/daniyal-k-648107263/)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:getdaniyalkhan@gmail.com)
<!-- - **X (Twitter):** https://x.com/yourhandle -->