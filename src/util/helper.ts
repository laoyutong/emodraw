export const splitContent = (content: string): string[] =>
  content
    .replace(/\r\n?/g, "\n")
    .split("\n")
    // .filter((c) => !!c.trim());

export const getDownloadUri = (data: any) => {
  const _utf = "\uFEFF";
  const blob = new Blob([_utf + data], {
    type: "text/json",
  });
  return URL.createObjectURL(blob);
};

export const calculateText = (
  text: string,
  containerWidth: number,
  canvasIns?: CanvasRenderingContext2D
): [string[], number] => {
  const ctx = canvasIns ?? document.createElement("canvas").getContext("2d")!;
  const lines: string[] = [];
  const tempLine = splitContent(text);
  tempLine.forEach((line) => {
    let text = "";
    let startIndex = 0;
    for (let i = 1; i <= line.length; i++) {
      text = line.substring(startIndex, i);
      const { width } = ctx.measureText(text);
      if (width > containerWidth) {
        lines.push(line.substring(startIndex, i - 1));
        startIndex = i - 1;
      }
    }
    lines.push(text);
  });

  let maxWidth = 0;
  lines.forEach((line) => {
    const { width } = ctx.measureText(line);
    if (width > maxWidth) {
      maxWidth = width;
    }
  });
  return [lines, maxWidth];
};

export const downLoad = (url: string, name: string) => {
  const a = document.createElement("a");
  a.download = name;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
