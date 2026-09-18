function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(url) {
  var trimmed = url.trim();
  var normalized = trimmed.toLowerCase();
  var allowed = /^(https?:|mailto:|\/|#|\.{1,2}\/)/.test(normalized) || !/^[a-z]+:/.test(normalized);
  return allowed ? escapeHtml(trimmed) : "#";
}

function convertInlineMarkdown(text) {
  var escaped = escapeHtml(text);

  escaped = escaped.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (_, alt, src) {
    return '<img src="' + sanitizeUrl(src) + '" alt="' + alt + '">';
  });

  escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, href) {
    return '<a href="' + sanitizeUrl(href) + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
  });

  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  escaped = escaped.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return escaped;
}

function convertMarkdown(markdown) {
  return markdown
    .split(/\r?\n/)
    .map(function (line) {
      if (/^\s*###\s+/.test(line)) {
        return "<h3>" + convertInlineMarkdown(line.replace(/^\s*###\s+/, "")) + "</h3>";
      }
      if (/^\s*##\s+/.test(line)) {
        return "<h2>" + convertInlineMarkdown(line.replace(/^\s*##\s+/, "")) + "</h2>";
      }
      if (/^\s*#\s+/.test(line)) {
        return "<h1>" + convertInlineMarkdown(line.replace(/^\s*#\s+/, "")) + "</h1>";
      }
      if (/^\s*>\s?/.test(line)) {
        return "<blockquote>" + convertInlineMarkdown(line.replace(/^\s*>\s?/, "")) + "</blockquote>";
      }
      if (!line.trim()) {
        return "";
      }
      return "<p>" + convertInlineMarkdown(line.trim()) + "</p>";
    })
    .join("\n");
}

function renderMarkdown() {
  var markdownInput = document.getElementById("markdown-input");
  var htmlOutput = document.getElementById("html-output");
  var preview = document.getElementById("preview");

  if (!markdownInput || !htmlOutput || !preview) {
    return;
  }

  var html = convertMarkdown(markdownInput.value);
  htmlOutput.textContent = html;
  preview.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  var markdownInput = document.getElementById("markdown-input");
  if (!markdownInput) {
    return;
  }

  markdownInput.addEventListener("input", renderMarkdown);
  renderMarkdown();
});
