function convertMarkdown() {
  let markdown = document.getElementById("markdown-input").value;

  // Headings (must start at beginning of line, only leading whitespace allowed)
  markdown = markdown.replace(/^\s*### (.*)$/gm, "<h3>$1</h3>");
  markdown = markdown.replace(/^\s*## (.*)$/gm, "<h2>$1</h2>");
  markdown = markdown.replace(/^\s*# (.*)$/gm, "<h1>$1</h1>");

  // Bold (must come before italic so single * / _ aren't matched first)
  markdown = markdown.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  markdown = markdown.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  markdown = markdown.replace(/\*(.+?)\*/g, "<em>$1</em>");
  markdown = markdown.replace(/_(.+?)_/g, "<em>$1</em>");

  // Images (must come before links, since link syntax is a subset of image syntax)
  markdown = markdown.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img alt="$1" src="$2">'
  );

  // Links
  markdown = markdown.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2">$1</a>'
  );

  // Blockquotes (run last so bold/italic inside quotes are already converted)
  markdown = markdown.replace(/^\s*> (.*)$/gm, "<blockquote>$1</blockquote>");

  return markdown;
}

function updateOutput() {
  const html = convertMarkdown();
  const outputEl = document.getElementById("html-output");
  const previewEl = document.getElementById("preview");

  outputEl.textContent = html;
  previewEl.innerHTML = html;
}

document
  .getElementById("markdown-input")
  .addEventListener("input", updateOutput);

// Render once on load in case the textarea has default content
document.addEventListener("DOMContentLoaded", updateOutput);