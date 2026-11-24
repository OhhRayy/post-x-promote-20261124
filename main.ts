// Entry program for make.fun bounty post-x-promote-make-your-own-bounty-01.
//
// The entry itself is the X post: a quote of make.fun's make-your-own-bounty
// post (https://x.com/makefunai/status/2124915864336236646), posted from the
// public account @OhhRayy039 with a photo of its own, the @makefunai tag and
// the play code makefun-rhino-crow-cavern in its text. POST.json at the
// repository root holds that post's address, and this program's only job is
// to hand that file to the grader: it copies POST.json from the repository
// directory into the output directory, unchanged.
//
// Node 22, standard library only. No network, no clock, no files outside
// the repository: given the same POST.json, both runs write the same bytes.
//
// Local check (mirrors how the grader runs it):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Afterwards out/POST.json is byte for byte this directory's POST.json.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Where the repository lives and where the result goes. The grader mounts
// them at /bot and /output; locally the two environment variables stand in.
const repoDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(repoDir, 'POST.json');
const target = join(outputDir, 'POST.json');

if (!existsSync(source)) {
  console.error(`POST.json not found in ${repoDir}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`Could not copy POST.json to ${outputDir}: ${(err as Error).message}`);
  process.exit(1);
}

// The copy alone is not proof the gate can read the post, so verify the
// result before finishing: read the copied file back, parse it, and check
// the address it names is a real X post address. A copy that cannot be
// read back, or an address that is not a post, fails loudly instead of
// silently handing the grader a broken file.
let copied: string;
try {
  copied = readFileSync(target, 'utf8');
} catch (err) {
  console.error(`Could not read back ${target}: ${(err as Error).message}`);
  process.exit(1);
}

let postUrl: unknown;
try {
  postUrl = (JSON.parse(copied) as { url?: unknown }).url;
} catch (err) {
  console.error(`Copied POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof postUrl !== 'string' || !/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/.test(postUrl)) {
  console.error(`Copied POST.json has no valid post address: ${JSON.stringify(postUrl)}`);
  process.exit(1);
}

// Success prints a short confirmation with the address and size, so a run
// log shows the gate got exactly the post that was handed in.
console.log(`POST.json copied and verified: ${postUrl} (${statSync(target).size} bytes)`);
