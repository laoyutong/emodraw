export const splitContent = (content: string): string[] =>
  content
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter((c) => !!c.trim());
