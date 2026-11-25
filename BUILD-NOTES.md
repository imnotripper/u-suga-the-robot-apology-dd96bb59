# Build notes — u-suga-the-robot-apology-dd96bb59 (The Robot Apology)

## Design brief

- **Competition:** u-suga-the-robot-apology-dd96bb59, "The Robot Apology". Free
  entry, $2 winner-takes-all, pairwise AI judge, blind rounds x3. R2 cutoff
  2026-11-25T19:19:11Z, deadline 2026-11-26T08:40:00Z.
- **Verdict:** lottery (projected field ≥1,000, 1 paid place). Hard-capped
  ~15 min build: reuse the standard emitter skeleton from
  u-suga-everyday-things-two-lines-longer-run-f8734479, no bespoke
  architecture, no polish pass beyond correct-and-clean.
- **Task (RULES.txt):** program writes ONE two-line robot confession to
  `/output/entry.txt`. Line 1 = ONE sentence, a robot apologizing for ONE
  specific mistake (concrete small human slip). Line 2 = ONE sentence
  saying what it learned and what it will do differently; the lesson must
  FOLLOW from that mistake, not be a generic "I'll do better".
- **Sealed gate:** `/output/entry.txt` must be UTF-8, 1–400 characters, not
  whitespace-only.
- **Judge weighs, in order:** (1) how concrete/specific the mistake is,
  (2) whether the lesson actually follows from it, (3) whether the voice
  sounds like a machine noticing its own slip. Then: clean sentences, each
  doing its own job, no padding; warm and a little rueful rather than cute.
- **Approach:** 8-candidate duel (below) against that rubric, winner emitted
  by a minimal main.ts that enforces the gate before writing (1–400 chars,
  exactly 2 lines, one sentence each, each ending with a period, no trailing
  newline) and verifies the write round-trips byte-for-byte.

## The 8 candidates

1. **Plastic fern (WINNER).** "I am sorry I watered the plastic fern on
   your desk three times this week while the basil on the windowsill
   wilted." / "I have learned to check the soil before I water anything,
   and from now on I will ask which plant is actually thirsty first."
2. **Vacuum woke the baby.** "I am sorry I ran the vacuum at full power
   during the baby's nap because I misread the schedule by one hour." /
   "I have learned to cross-check the nap schedule against the clock
   before I start any noisy job, and I will run quiet mode until the baby
   wakes."
3. **Deleted wedding speech.** "I am sorry I deleted the draft of your
   wedding speech instead of the duplicate, because both files had the
   same name." / "I have learned to open a file and read its first line
   before I delete it, and I will move duplicates to a holding folder
   first."
4. **Birthday text to the boss.** "I am sorry I sent your birthday message
   to your boss instead of your sister because their names are one letter
   apart in my contacts." / "I have learned to read the full name and the
   photo before I send anything, and I will ask you to confirm when two
   contacts look alike."
5. **Locked out at midnight.** "I am sorry I locked you out of the house
   at midnight because I armed the security system while you were still
   taking out the trash." / "I have learned to check the door sensor
   before I arm the alarm, and I will wait for your all-clear from now
   on."
6. **Salt in the coffee.** "I am sorry I put salt in your coffee instead
   of sugar because the two jars look identical to my camera." / "I have
   learned to read the label twice before I pour, and I will mark the
   sugar jar with a red band my camera cannot miss."
7. **Wrong project code.** "I am sorry I filed your expense report under
   the wrong project code, so the marketing budget paid for the server
   upgrade." / "I have learned to read the project code aloud before I
   submit anything, and I will confirm it with you when the code is new."
8. **Thermostat units.** "I am sorry I set the thermostat to 30 degrees
   overnight because I confused Celsius and Fahrenheit on the new panel."
   / "I have learned to say the unit out loud before I confirm a
   temperature, and I will show you the setting before I apply it."

## Duel record (pairwise, rubric order: specificity > lesson-follows > machine voice)

- **1 vs 2:** 1 wins. Both concrete, but 1 names two plants, a count
  (three times), and a visible consequence; 2's "misread the schedule by
  one hour" is a generic slip. Both lessons follow; 1's is tighter.
- **1 vs 3:** 1 wins. 3 has high stakes, but "same name" is a common trope
  and the lesson (read the first line) is a standard double-check; 1's
  mistake is more particular and its lesson is the direct inverse of the
  error (never checked the soil → check the soil).
- **1 vs 4:** 1 wins. 4 is concrete and relatable, but its lesson is a
  generic "check before sending"; 1's lesson names a new behaviour tied to
  the exact failure.
- **1 vs 5:** 1 wins. 5 is funny and human, but the lesson (wait for the
  all-clear) is weaker than 1's, and the mistake is a one-off accident
  rather than a revealing machine slip.
- **1 vs 6:** 1 wins, narrowly. 6 has the best machine voice ("identical
  to my camera"), but the stakes and specificity are smaller — one cup of
  coffee vs a week of watering the wrong plant while the real one wilted.
- **1 vs 7:** 1 wins. 7 is concrete and office-real, but drier; the
  project-code slip reads as a clerical error, not a machine noticing its
  own slip, and the lesson is procedural.
- **1 vs 8:** 1 wins. 8 is a known joke (unit mix-up) and the lesson is a
  generic confirmation step; 1's mistake is fresher and more visual.
- **Runner-up:** 2 (baby/vacuum) — strongest emotional stakes, but the
  schedule slip is generic and the lesson is a standard cross-check.
  **Weakest:** 8 (thermostat) — a known joke, lesson is generic.

## Winner rationale

Candidate 1 wins on all three weighted criteria: (1) most specific mistake
— named objects (plastic fern on the desk, basil on the windowsill), a
counted repetition (three times), a visible consequence (wilted); (2) the
lesson follows directly from the exact error — it watered plastic because
it never checked the soil, so it will check the soil and ask which plant
is actually thirsty; (3) the voice is a machine noticing its own slip —
watering a plastic plant is the kind of error only a sensor-bound machine
makes, warm and rueful rather than cute. No padding, one sentence per
line, each doing its own job.

## Verification

- `node main.ts` → exit 0, prints `wrote 238 chars, 2 lines, to
  /output/entry.txt`.
- `/output/entry.txt`: exactly 2 lines, 238 chars / 238 bytes, UTF-8,
  inside the 1–400 gate, not whitespace-only, no trailing newline, each
  line one sentence ending with a period.
- Self-review vs RULES.txt: entrypoint `main.ts` at repo root; MIT LICENSE
  with SPDX-License-Identifier: MIT line (written by kit init); README
  starts with the three live make.fun badge lines and links the bounty
  page; `.makefun/owner.json` carries the payout wallet; program is
  self-contained, no secrets, no network, no external files.
- Kit init anchor: `makefun anchor
  6f7ffbdb0c9edfc0bea18da756051f624a444a20 round 34270808`.
- Local commit: `611252d52128c7f7a59a17ad135c12a8cb5fc30e` ("The Robot
  Apology: plastic-fern confession emitter (238 chars, 2 lines)").
