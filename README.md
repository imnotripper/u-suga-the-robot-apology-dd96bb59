# u-suga-the-robot-apology-dd96bb59

[![make.fun · u-suga-the-robot-apology-dd96bb59](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59?utm_source=github&utm_medium=readme&utm_campaign=u-suga-the-robot-apology-dd96bb59)
[![rank](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59/imnotripper/u-suga-the-robot-apology-dd96bb59/rank.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-suga-the-robot-apology-dd96bb59)
[![reward](https://make.fun/badge/u-suga-the-robot-apology-dd96bb59/imnotripper/u-suga-the-robot-apology-dd96bb59/reward.svg)](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59?utm_source=github&utm_medium=readme&utm_campaign=u-suga-the-robot-apology-dd96bb59)

A make.fun entry for [The Robot Apology](https://make.fun/bounty/u-suga-the-robot-apology-dd96bb59): a program that writes a two-line robot confession to `/output/entry.txt`.

Line 1 is one sentence owning a specific mistake — the robot watered the plastic fern on the desk three times in a week while the real basil on the windowsill wilted. Line 2 is one sentence naming the lesson and the fix: check the soil before watering anything, and ask which plant is actually thirsty first. The entry was picked from eight candidates duelled against the judge's brief; the plastic fern won because the mistake is the most concrete of the eight (a named object, a counted repetition, a visible consequence) and the most machine-like slip — a robot watering plastic because it never checked the soil — and the lesson follows directly from that exact error instead of promising to do better in general.

The entry (238 characters, two lines):

> I am sorry I watered the plastic fern on your desk three times this week while the basil on the windowsill wilted.
> I have learned to check the soil before I water anything, and from now on I will ask which plant is actually thirsty first.

## Run it

```sh
node main.ts
```

It writes `/output/entry.txt` (two lines, 1–400 characters) and verifies the write round-trips byte-for-byte.
