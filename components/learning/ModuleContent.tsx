// src/components/learning/ModuleContent.tsx
"use client";

import { useMemo } from "react";

interface Props {
  content: string;
}

export function ModuleContent({ content }: Props) {
  const htmlContent = useMemo(() => renderMarkdown(content), [content]);

  return (
    <article
      className="prose prose-green prose-sm md:prose-base max-w-none
        prose-headings:font-heading prose-headings:text-gray-900
        prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-green-800
        prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-li:text-gray-700
        prose-strong:text-gray-900
        prose-code:bg-green-50 prose-code:text-green-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-table:text-sm
        prose-th:bg-green-50 prose-th:text-green-800
        prose-td:border-gray-200"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

function renderMarkdown(md: string): string {
  let html = md;

  // Tables
  html = html.replace(
    /^\|(.+)\|\s*\n\|[-| :]+\|\s*\n((?:\|.+\|\s*\n)*)/gm,
    (match, headerRow, bodyRows) => {
      const headers = headerRow
        .split("|")
        .map((h: string) => h.trim())
        .filter(Boolean);
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) =>
          row
            .split("|")
            .map((c: string) => c.trim())
            .filter(Boolean)
        );

      let table = '<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-200 rounded-lg">';
      table += "<thead><tr>";
      headers.forEach((h: string) => {
        table += `<th class="border border-gray-200 px-3 py-2 text-left font-semibold">${h}</th>`;
      });
      table += "</tr></thead><tbody>";
      rows.forEach((row: string[]) => {
        table += "<tr>";
        row.forEach((cell: string) => {
          table += `<td class="border border-gray-200 px-3 py-2">${cell}</td>`;
        });
        table += "</tr>";
      });
      table += "</tbody></table></div>";
      return table;
    }
  );

  // Headers
  html = html.replace(
    /^### (.*$)/gm,
    '<h3 class="text-lg font-heading font-semibold mt-4 mb-2">$1</h3>'
  );
  html = html.replace(
    /^## (.*$)/gm,
    '<h2 class="text-xl font-heading font-semibold text-green-800 mt-6 mb-3">$1</h2>'
  );
  html = html.replace(
    /^# (.*$)/gm,
    '<h1 class="text-2xl font-heading font-bold mt-8 mb-4">$1</h1>'
  );

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Unordered lists
  html = html.replace(
    /^- (.*$)/gm,
    '<li class="ml-4 list-disc text-gray-700">$1</li>'
  );

  // Ordered lists
  html = html.replace(
    /^\d+\. (.*$)/gm,
    '<li class="ml-4 list-decimal text-gray-700">$1</li>'
  );

  // Wrap consecutive <li> in <ul> or <ol>
  html = html.replace(
    /((?:<li class="ml-4 list-disc[^"]*">.*?<\/li>\s*)+)/g,
    '<ul class="my-3 space-y-1">$1</ul>'
  );
  html = html.replace(
    /((?:<li class="ml-4 list-decimal[^"]*">.*?<\/li>\s*)+)/g,
    '<ol class="my-3 space-y-1">$1</ol>'
  );

  // Callout boxes (lines starting with emoji)
  html = html.replace(
    /^(🌍|💰|🌾|🔴|✅|❌|⚡) (.*$)/gm,
    '<div class="flex items-start gap-2 my-1"><span class="text-lg flex-shrink-0">$1</span><span>$2</span></div>'
  );

  // Inline code
  html = html.replace(
    /`(.*?)`/g,
    '<code class="bg-green-50 text-green-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
  );

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="my-3 text-gray-700 leading-relaxed">');
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraph
  html = `<p class="my-3 text-gray-700 leading-relaxed">${html}</p>`;

  return html;
}