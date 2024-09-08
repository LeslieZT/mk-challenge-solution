export function sanitizeInput(input) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  return input
    .replace(/[&<>"'/]/g, function (match) {
      return map[match];
    })
    .trim();
}
