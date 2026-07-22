// types/project.ts
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Greenova",
    category: "Full-Stack E-Commerce",
    year: "2024",
    description: "A high-performance digital storefront focusing on sustainable lifestyle goods and seamless checkout flows.",
    image: "/greenova.jpg",
    technologies: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    liveUrl: "https://greenova-pi.vercel.app",
    githubUrl: "#",
  },
  {
    id: "02",
    title: "Salon Studio",
    category: "Business Website",
    year: "2024",
    description: "An editorial-style platform for a boutique hair studio, featuring complex booking integrations and motion-heavy galleries.",
    image: "/salon.jpg",
    technologies: ["React", "Framer Motion", "Tailwind"],
    liveUrl: "https://salon-template-pink.vercel.app/",
  },
  {
    id: "03",
    title: "WriteWise AI",
    category: "Digital Experience",
    year: "2023",
    description: "WriteWise AI helps you quickly generate clear, engaging, and error-free content for emails, reports, social media, and more.",
    image: "/writewiseAi.jpg",
    technologies: ["Next.js", "Supabase", "PostgreSQL"],
    liveUrl: "https://writewise-ai.vercel.app/",
    githubUrl: "#",
  },
];