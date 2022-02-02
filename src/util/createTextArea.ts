import type { Coordinate, GraghDrawData, TextDrawData } from "@/type";
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from "@/config";
import { splitContent } from ".";

const getTextArea = () => {
  const oldTextarea = document.querySelector("textarea");
  if (oldTextarea) {
    return null;
  }

  return document.createElement("textarea");
};

const setTextAreaStyle = (
  textArea: HTMLTextAreaElement,
  style: Record<string, unknown>
) => {
  Object.assign(textArea.style, {
    position: "absolute",
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    background: "transparent",
    resize: "none",
    fontSize: DEFAULT_FONT_SIZE + "px",
    lineHeight: "1em",
    fontFamily: DEFAULT_FONT_FAMILY,
    overflow: "hidden",
    ...style,
  });
};

const addEventListener = (
  textarea: HTMLTextAreaElement,
  {
    oninput,
    onChange,
  }: {
    oninput?: () => void;
    onChange: (value: string) => void;
  }
) => {
  textarea.onkeydown = (e) => {
    e.stopPropagation();
  };

  textarea.oninput = () => {
    textarea.style.height = textarea.scrollHeight + "px";
    oninput?.();
  };

  textarea.onblur = (e: Event) => {
    onChange((e.target as HTMLInputElement).value);
    document.body.removeChild(textarea);
  };

  setTimeout(() => {
    textarea.focus();
  });
};

export const createTextWithContainer = (
  container: GraghDrawData,
  onChange: (value: string, height: number) => void,
  textElement?: TextDrawData
) => {
  const textarea = getTextArea();
  if (!textarea) {
    return;
  }

  setTextAreaStyle(textarea, {
    top: container.y + container.height / 2 - DEFAULT_FONT_SIZE + "px",
    left: container.x + "px",
    width: container.width + "px",
    textAlign: "center",
  });

  if (textElement) {
    const initialValue = textElement.content;
    textarea.value = initialValue;
    textarea.setSelectionRange(0, initialValue.length);
    textarea.style.height = textElement.height + "px";
    textarea.style.top =
      container.y + container.height / 2 - textElement.height / 2 + "px";
  }

  addEventListener(textarea, {
    oninput: () => {
      textarea.style.top =
        container.y + container.height / 2 - textarea.scrollHeight / 2 + "px";
    },
    onChange: (value: string) => {
      onChange(value, textarea.scrollHeight);
    },
  });

  document.body.appendChild(textarea);
};

export const createTextArea = (
  { x, y }: Coordinate,
  onChange: (value: string) => void,
  initialValue?: string
) => {
  const textarea = getTextArea();
  if (!textarea) {
    return;
  }

  if (initialValue) {
    textarea.value = initialValue;
    textarea.setSelectionRange(0, initialValue.length);
    textarea.style.height =
      DEFAULT_FONT_SIZE * splitContent(initialValue).length + "px";
  }

  setTextAreaStyle(textarea, {
    top: y + "px",
    left: x + "px",
    width: `${window.innerWidth - x}px`,
    whiteSpace: "nowrap",
  });

  addEventListener(textarea, {
    onChange,
  });

  document.body.appendChild(textarea);
};
