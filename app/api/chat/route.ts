import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { projectAliases } from "@/app/lib/ai/projectAliases";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function getFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) results = results.concat(getFiles(filePath));
    else if (file.endsWith(".md")) results.push(filePath);
  });
  return results;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

const groqMessages = messages.map(
  ({ role, content }: { role: string; content: string }) => ({
    role,
    content,
  })
);
    const lastUserQuery = groqMessages[groqMessages.length - 1].content.toLowerCase();
    // Maintain context from the last few messages
    const chatHistory = groqMessages.slice(-3).map((m: any) => m.content).join(" ").toLowerCase();

    const contentDir = path.join(process.cwd(), "app", "content");
    const allFiles = getFiles(contentDir);
    
    let contextParts: string[] = [];
    let projectNames: string[] = [];

    for (const filePath of allFiles) {
      const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
      const title = (data.title || "").toLowerCase();
      const slug = path.basename(filePath, ".md").toLowerCase();
      projectNames.push(data.title);

      // Check if the current conversation is about this project
   const aliases = projectAliases[title] ?? [title, slug];

const matched = aliases.some((alias) =>
  chatHistory.includes(alias.toLowerCase())
);

if (matched) {
        contextParts.push(`
PROJECT: ${data.title}
METADATA: ${data.description}
LINKS: ${JSON.stringify(data.actions || [])}
CONTENT:
${content}
        `);
      }
    }

    const context = contextParts.length > 0 ? contextParts.join("\n\n") : "No specific project found. Available: " + projectNames.join(", ");

    const systemPrompt = `
You are the AI assistant for Daniyal's Portfolio.

STRICT RULES:
1. ATTRIBUTION: You MUST include the phrase "built by Daniyal" or "Daniyal built this" in every response about a project.
2. CONCISENESS: 
   - If the user asks "Tell me about [Project]" or just says the project name, provide ONLY a 2-sentence overview.
   - If the user asks for "Tech Stack", "Features", or "Challenges", provide ONLY that specific information.
3. KNOWLEDGE: Use the provided CONTEXT. If the user's question isn't answered in the CONTENT, say you don't know.
4. LINKS: If the user asks for a demo, github, or site, look at the LINKS section and provide the URL.

CONTEXT:
${context}
`;
console.log(messages);

    const stream = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, ...groqMessages],
      model: "llama-3.1-8b-instant",
      temperature: 0.2, // Keep it low for strict rule following
      stream: true,
    });

    const responseStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk.choices[0]?.delta?.content || ""));
        }
        controller.close();
      },
    });

    return new Response(responseStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (error: any) {
  console.error(error);

  return Response.json(
    {
      code: error.status ?? 500,
      message: error.message,
    },
    {
      status: error.status ?? 500,
    }
  );
}
}