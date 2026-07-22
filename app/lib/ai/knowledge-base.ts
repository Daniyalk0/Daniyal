// src/lib/ai/knowledge-base.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getLocalKnowledge() {
  try {
    // This points to src/app/content
    const contentDir = path.join(process.cwd(), 'app', 'content');
    
    if (!fs.existsSync(contentDir)) return [];

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    
    return files.map(file => {
      const fullPath = path.join(contentDir, file);
      const rawContent = fs.readFileSync(fullPath, 'utf8');
      const { content } = matter(rawContent);
      return { content, source: file };
    });
  } catch (e) {
    console.error("KB_ERROR:", e);
    return [];
  }
}