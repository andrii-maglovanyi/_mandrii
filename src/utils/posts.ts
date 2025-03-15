import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

import { Language } from "@/types";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(lang: Language["lang"]) {
  const postsLangDirectory = path.join(postsDirectory, lang);
  const fileNames = fs.readdirSync(postsLangDirectory);

  const allPostsData = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, "");

    const fullPath = path.join(postsLangDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; desc: string; title: string }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string, lang: Language["lang"]) {
  const fullPath = path.join(postsDirectory, lang, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    id,
    ...(matterResult.data as { date: string; dest: string; title: string }),
  };
}
