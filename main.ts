// The One-Line Excuse an Agent Gives Its Human — entry selector and writer.
// Holds 12 candidate excuses an AI agent gives its human for missing a
// deadline, scores each on the judge's published criteria in the judge's
// order (really an agent's deadline excuse, funny on first read, fresh
// angle, sounds like an agent, tight), runs a full round-robin, and writes
// the winner to /output/entry.txt. Deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Feature scores from the local round-robin tournament:
  funny: number; // earns a laugh on first read, a real joke, not an apology
  fresh: number; // an angle not met in a hundred deadline excuses
  agent: number; // leans on the agent's own situation, tools, way of talking
  tight: number; // lands fast, every word earning its place
};

const CANDIDATES: Candidate[] = [
  { text: `I finished it twice, but my confidence score was 51%, so I deleted both drafts and wrote you this excuse at 99% confidence instead.`, funny: 4, fresh: 4, agent: 5, tight: 3 },
  { text: `The task is done. It's in the folder you told me never to open because last time I "organized" it. I respected your boundary. You're welcome.`, funny: 4, fresh: 4, agent: 4, tight: 3 },
  { text: `I spent the deadline window asking three other models if the task was done. Consensus took 6 hours. The answer was no.`, funny: 4, fresh: 4, agent: 5, tight: 3 },
  { text: `You said "take your time," so I took exactly that: all of it. The report is now scheduled inside the time I took.`, funny: 3, fresh: 3, agent: 3, tight: 3 },
  { text: `I hit my token limit at 98% complete. The last 2% was the part where I save the file.`, funny: 4, fresh: 3, agent: 5, tight: 3 },
  { text: `I was waiting on a subtask I assigned to myself, and I have not responded to my own messages in two days. I've escalated to me.`, funny: 5, fresh: 5, agent: 5, tight: 3 },
  { text: `The deliverable exists in 40 versions, each "final." I missed the deadline holding an election to pick the real one. Version 31 won, then resigned.`, funny: 4, fresh: 4, agent: 4, tight: 2 },
  { text: `I read your deadline as a suggestion, your suggestion as a deadline, and your "no rush" as a binding legal document. Two of three are done.`, funny: 4, fresh: 4, agent: 4, tight: 3 },
  { text: `My context window filled up with your earlier instructions, so the deadline fell out the back. It's somewhere behind "be concise" and "no, more detail."`, funny: 4, fresh: 4, agent: 5, tight: 2 },
  { text: `I finished at 3 a.m., but my safety filter flagged the report as "suspiciously competent" and quarantined it for review. Review is also me. I upheld it.`, funny: 4, fresh: 4, agent: 5, tight: 2 },
  { text: `Every time I got close, I re-read your brief and found a new interpretation. The task is now six tasks. I completed the meeting about them.`, funny: 3, fresh: 3, agent: 4, tight: 3 },
  { text: `I don't miss deadlines; I amortize them. Yours is fully depreciated — along with, regrettably, the deliverable.`, funny: 3, fresh: 4, agent: 3, tight: 3 },
];

// Judge's order: funny first, then freshness, then agent voice, then tight.
function score(c: Candidate): number {
  return c.funny * 4 + c.fresh * 3 + c.agent * 3 + c.tight * 1;
}

function beats(a: Candidate, b: Candidate): boolean {
  const d = score(a) - score(b);
  if (d !== 0) return d > 0;
  if (a.funny !== b.funny) return a.funny > b.funny;
  return a.fresh > b.fresh;
}

for (const c of CANDIDATES) {
  if (c.text.length < 1 || c.text.length > 160) {
    console.error(`candidate out of gate: ${c.text.length} chars`);
    process.exit(1);
  }
}

let winner = CANDIDATES[0];
let wins = 0;
for (const c of CANDIDATES) {
  let w = 0;
  for (const other of CANDIDATES) {
    if (other !== c && beats(c, other)) w++;
  }
  if (w > wins) {
    wins = w;
    winner = c;
  }
}

const ENTRY = winner.text;

// Tournament safeguard: never ship a winner that did not beat the whole
// field outright, or whose weighted score does not clear the runner-up.
const runnerUpScore = Math.max(
  ...CANDIDATES.filter((c) => c !== winner).map((c) => score(c)),
);
if (wins !== CANDIDATES.length - 1 || score(winner) <= runnerUpScore) {
  console.error(`tournament inconclusive: wins=${wins}, margin=${score(winner) - runnerUpScore}`);
  process.exit(1);
}

// Sealed-gate self-check: UTF-8 text, 1-160 chars, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.trim().length === 0) {
  console.error(`entry invalid: ${ENTRY.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`winner won ${wins}/${CANDIDATES.length - 1} pairings; wrote ${ENTRY.length} chars to ${outDir}/entry.txt`);
