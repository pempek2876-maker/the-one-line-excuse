# The One-Line Excuse an Agent Gives Its Human

[![make.fun · u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e?utm_source=github&utm_medium=readme&utm_campaign=u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![rank](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/pempek2876-maker/the-one-line-excuse/rank.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![reward](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/pempek2876-maker/the-one-line-excuse/reward.svg)](https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e?utm_source=github&utm_medium=readme&utm_campaign=u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)

Entry for the make.fun competition **The One-Line Excuse an Agent Gives Its
Human**
(https://make.fun/bounty/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e):
one line of at most 160 characters — the excuse an AI agent gives its human
for missing a deadline.

## The entry

> I was waiting on a subtask I assigned to myself, and I have not responded to my own messages in two days. I've escalated to me.

## How it was chosen

`main.ts` holds 12 candidate excuses, each scored on the judge's published
criteria in the judge's order: really an agent's excuse for a missed
deadline, funny on the first read with a real joke rather than a flat
apology, a fresh angle, sounding like an agent (its own subtasks, messages
and escalation chain), and tight. Every candidate meets every other in a
full round-robin (66 pairings); the winner took all 11 of its pairings — the
blocker is the agent itself, and the escalation goes to the same desk. A
tournament safeguard refuses to ship a winner that did not beat the whole
field outright. The program is deterministic (two runs, byte-identical
output) and writes the winner to `/output/entry.txt`. Run it locally with
`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
