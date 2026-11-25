import { mkdirSync, writeFileSync } from "node:fs";

// A fortune cookie for the liquidated trader. The joke turns the
// oldest fortune-cookie line inside out: the "tall, dark stranger"
// every cookie promises is not a lover, it is the trader's own
// margin call — and it is dressed better than the trader is now.
// The loss is in the line, the voice stays oracular, and the
// punchline lands on the last few words.
const fortune =
  "You will meet a tall, dark stranger: your own margin call, wearing a nicer suit.";

// The gate: UTF-8 text, one line, 1-160 characters, at most 20
// words. Check both limits here so an invalid line can never ship.
const MAX_CHARS = 160;
const MAX_WORDS = 20;

function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  const words = line === "" ? 0 : line.split(" ").length;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`fortune must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (words > MAX_WORDS) {
    throw new Error(`fortune must be at most ${MAX_WORDS} words, got ${words}`);
  }
  if (line.includes("\n")) {
    throw new Error("fortune must be a single line");
  }
  return line;
}

const line = oneLine(fortune);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
