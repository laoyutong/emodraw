import type { Coordinate } from "@/type";
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from "@/config";

const createTextArea = (
  { x, y }: Coordinate,
  onChange: (value: string) => void
) => {
  const oldTextarea = document.querySelector("textarea");
  if (oldTextarea) {
    return;
  }

  const textarea = document.createElement("textarea");
  Object.assign(textarea.style, {
    position: "absolute",
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    background: "transparent",
    resize: "none",
    top: y + "px",
    left: x + "px",
    fontSize: DEFAULT_FONT_SIZE + "px",
    lineHeight: "1em",
    fontFamily: DEFAULT_FONT_FAMILY,
  });

  textarea.onkeydown = (e) => {
    e.stopPropagation();
  };

  textarea.oninput = () => {
    textarea.style.height = textarea.scrollHeight + "px";
  };

  textarea.onblur = () => {
    document.body.removeChild(textarea);
  };
  textarea.onchange = (e: any) => {
    onChange(e.target.value);
  };

  document.body.appendChild(textarea);

  setTimeout(() => {
    textarea.focus();
  });
};

export default createTextArea;
