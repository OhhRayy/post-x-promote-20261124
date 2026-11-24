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

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
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

// Success prints nothing, by design.
