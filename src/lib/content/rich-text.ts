// ============================================================
//  Форматирование текста материалов: лёгкая разметка
//  (**жирный**, *курсив*, [текст](ссылка)) с экранированием HTML
//  и проверкой протокола ссылок.
// ============================================================

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, "https://example.com");
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function formatRichText(text: string): string {
  return text
    .split("\n\n")
    .map((paragraph) => {
      const escaped = escapeHtml(paragraph);
      const formatted = escaped
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\[(.+?)\]\((.+?)\)/g, (match, label: string, url: string) => {
          if (isSafeUrl(url)) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
          }
          return match;
        });
      return `<p>${formatted}</p>`;
    })
    .join("");
}
