import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  html: string;
}

/** Minimal, self-authored markdown -> HTML. Only supports the subset our own posts use. */
function markdownToHtml(md: string): string {
  const lines = md.trim().split("\n");
  const blocks: string[] = [];
  let listBuffer: string[] = [];

  function inline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  }

  function flushList() {
    if (listBuffer.length) {
      blocks.push(`<ul>${listBuffer.map((li) => `<li>${inline(li)}</li>`).join("")}</ul>`);
      listBuffer = [];
    }
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("> ")) {
      flushList();
      blocks.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else {
      flushList();
      blocks.push(`<p>${inline(line)}</p>`);
    }
  }
  flushList();
  return blocks.join("\n");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      category: data.category || "Guide",
      image: data.image || "",
      readTime: readingTime(content).text,
      html: markdownToHtml(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: data.category || "Guide",
    image: data.image || "",
    readTime: readingTime(content).text,
    html: markdownToHtml(content),
  };
}
