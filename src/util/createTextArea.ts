import type { Coordinate } from "@/type";
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from "@/config";

const createTextArea = (
  { x, y }: Coordinate,
  onChange: (value: string) => void,
  initialValue?: string
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
    width: `${window.innerWidth - x}px`,
    whiteSpace: "nowrap",
    overflowX: "hidden",
  });

  if (initialValue) {
    textarea.value = initialValue;
    textarea.setSelectionRange(0, initialValue.length);
  }

  textarea.onkeydown = (e) => {
    e.stopPropagation();
  };

  textarea.oninput = () => {
    textarea.style.height = textarea.scrollHeight + "px";
  };

  textarea.onblur = (e: any) => {
    onChange(e.target.value);
    document.body.removeChild(textarea);
  };

  document.body.appendChild(textarea);

  setTimeout(() => {
    textarea.focus();
  });
};

export default createTextArea;
