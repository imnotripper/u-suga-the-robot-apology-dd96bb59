// The Robot Apology — a make.fun program/v1 entry.
//
// The competition asks for a two-line robot confession. Line 1 is one
// sentence apologizing for one specific mistake, the kind of small human
// slip that lands because it is exact. Line 2 is one sentence saying what
// the robot learned and what it will do differently, and the lesson must
// follow from that exact mistake rather than be a generic promise to do
// better. The judge weighs, in order: how concrete the mistake is,
// whether the lesson actually follows from it, and whether the voice
// sounds like a machine noticing its own slip.
//
// The entry, chosen by an 8-candidate duel against that brief: the robot
// watered the plastic fern on the desk three times in a week while the
// real basil on the windowsill wilted. It is the most specific mistake of
// the eight — a named object, a counted repetition, a visible consequence
// — and the most machine-like slip: a robot that waters plastic because
// it never checked the soil. The lesson follows directly from the error
// (check the soil before watering) and names a changed behaviour (ask
// which plant is actually thirsty first). The beaten candidates: the
// vacuum waking the baby (strong but the schedule slip is generic), the
// deleted wedding speech (high stakes, common trope), the birthday text
// sent to the boss (concrete, but the lesson is a generic double-check),
// the locked-out-at-midnight alarm (funny, lesson weaker), the salt in
// the coffee (good machine voice, smaller stakes), the wrong project
// code on the expense report (concrete, drier), the thermostat's
// Celsius/Fahrenheit mix-up (a known joke).
//
// This program's whole job is to emit those two lines to
// /output/entry.txt, where the sealed scorer gates it (UTF-8, 1-400
// characters, not whitespace-only) and the pairwise judge reads it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";

const LINE_1 =
  "I am sorry I watered the plastic fern on your desk three times this week while the basil on the windowsill wilted.";
const LINE_2 =
  "I have learned to check the soil before I water anything, and from now on I will ask which plant is actually thirsty first.";

const ENTRY = `${LINE_1}\n${LINE_2}`;

// Enforce the sealed scorer's gate before anything is written: the entry
// must be 1-400 characters of UTF-8 text, not only whitespace, and it
// must be exactly two lines, each a single sentence, so the judge reads
// the pair the brief describes. Character count is measured in Unicode
// code points, matching how the gate reads the file.
function assertGate(entry: string): void {
  const chars = [...entry].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`entry fails the 1-400 char gate: ${chars} chars`);
  }
  if (!/\S/.test(entry)) {
    throw new Error("entry fails the gate: entry is whitespace-only");
  }
  const lines = entry.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  if (entry.endsWith("\n")) {
    throw new Error("entry must not end with a trailing newline");
  }
  for (const [i, line] of lines.entries()) {
    if (!/\S/.test(line)) {
      throw new Error(`entry line ${i + 1} is empty`);
    }
    if (!line.trim().endsWith(".")) {
      throw new Error(`entry line ${i + 1} must end a sentence`);
    }
    // One sentence per line, as the brief requires: exactly one
    // sentence-terminating period, at the end, and no other period
    // hiding a second sentence inside the line.
    const periods = (line.match(/\./g) ?? []).length;
    if (periods !== 1) {
      throw new Error(
        `entry line ${i + 1} must be a single sentence, found ${periods} periods`,
      );
    }
  }
}

assertGate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Verify the write round-trips byte-for-byte: what the judge reads must be
// exactly the entry that passed the gate, nothing more. Check both the
// text and the byte length, so a stray newline or an encoding surprise
// cannot slip an extra byte past the gate.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the gated entry after writing");
}
const writtenBytes = Buffer.byteLength(written, "utf8");
if (writtenBytes !== Buffer.byteLength(ENTRY, "utf8")) {
  throw new Error(
    `entry.txt byte length mismatch: ${writtenBytes} vs ${Buffer.byteLength(ENTRY, "utf8")}`,
  );
}

console.log(`wrote ${[...ENTRY].length} chars, 2 lines, to ${OUT_PATH}`);
