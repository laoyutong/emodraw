import type { Coordinate, GraghDrawData, TextDrawData } from "@/type";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  TEXTAREA_PER_HEIGHT,
} from "@/config";
import { calculateText } from ".";

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
  textElement: TextDrawData | null
) => {
  const textarea = getTextArea();
  if (!textarea) {
    return;
  }

  setTextAreaStyle(textarea, {
    top: container.y + container.height / 2 - TEXTAREA_PER_HEIGHT + "px",
    left: container.x + "px",
    width: container.width + "px",
    height: TEXTAREA_PER_HEIGHT + "px",
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

  const calculateLinesNumber = () => {
    const [lines] = calculateText(textarea.value, container.width);
    return lines.length;
  };

  addEventListener(textarea, {
    oninput: () => {
      const length = calculateLinesNumber();
      textarea.style.height = length * TEXTAREA_PER_HEIGHT + "px";
      textarea.style.top =
        container.y +
        container.height / 2 -
        (length * DEFAULT_FONT_SIZE) / 2 +
        "px";
    },
    onChange: (value: string) => {
      onChange(value, DEFAULT_FONT_SIZE * calculateLinesNumber());
    },
  });

  document.body.appendChild(textarea);
};

export const createTextArea = (
  { x, y }: Coordinate,
  onChange: (value: string) => void,
  textElement: TextDrawData | null
) => {
  const textarea = getTextArea();
  if (!textarea) {
    return;
  }

  if (textElement) {
    const initialValue = textElement.content;
    textarea.value = initialValue;
    textarea.setSelectionRange(0, initialValue.length);
    textarea.style.height = textElement.height + "px";
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
