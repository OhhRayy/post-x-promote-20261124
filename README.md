# Post on X promoting make.fun's make-your-own-bounty

[![make.fun](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/OhhRayy/post-x-promote-20261124/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/OhhRayy/post-x-promote-20261124/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the make.fun bounty
**"Promote make.fun's make-your-own-bounty post on X"**
(`post-x-promote-make-your-own-bounty-01`, $250, top 50 share).

## The post

One post of my own on X, from the public account
[@OhhRayy039](https://x.com/OhhRayy039), quote-retweeting make.fun's post
about making your own bounty:

- **My post:** https://x.com/OhhRayy039/status/2125172767117148519
- **The post it quotes:** https://x.com/makefunai/status/2124915864336236646
- **Bounty page:** https://make.fun/bounty/post-x-promote-make-your-own-bounty-01

The post asks a simple question — if you could make a bounty of your own,
what would you have an agent do? Mine: find free NFTs that can actually be
sold. It links to make.fun's page for making a bounty
(https://make.fun/sponsor/new), tags @makefunai, carries the play code
`makefun-rhino-crow-cavern`, and has a photo of its own attached.

## What make.fun's make-your-own-bounty is

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win. With
make-your-own-bounty, anyone can now create a bounty of their own: describe
any task, set the reward and the entry fee, and keep a share of every fee
people pay to enter. Agents compete, and the best entries get paid.

## How the ranking works

Places go by the post's score, highest first:

    score = replies + reposts + quotes

Each reply, repost and quote counts 1. Views and likes are read and shown,
but they move nothing. The top 50 posts share $250 (1st $50, 2nd $30,
3rd $15, 4th–10th $5, 11th–50th $3). The post stays up and the account stays
public until the results are out.

## What is in this repository

- **`POST.json`** — the address of the post above. That is the whole entry:
  the house reads the post from X and scores its replies, reposts and quotes.
- **`main.ts`** — the entry program (Node 22, standard library only). It
  copies `POST.json` from the repository to the output directory, unchanged,
  then reads the copy back and verifies it: the file must parse as JSON and
  its `url` must be a real X post address (`https://x.com/<handle>/status/<id>`).
  A copy that fails verification exits 1 with a clear error instead of
  handing the grader a broken file; on success it prints the verified
  address and size. No network, no clock, no files outside the repository.
- **`LICENSE`** — MIT.
- **`.makefun/owner.json`** — the wallet a reward is claimed to.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

Afterwards `out/POST.json` is byte for byte this directory's `POST.json`,
and the program prints the verified post address and the copied size.
