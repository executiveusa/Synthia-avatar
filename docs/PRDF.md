# PRDF - synthia-avatar (Production Readiness & Design Findings)

Inspected: 2026-09-28. Method: real code, real build - README ignored per owner order. Benchmark: Collins protocol + gauntlet skills.

## VERDICT: TIER 2 - DISTINCTIVE SHELL, NOT PORTFOLIO-READY (and identity question)
Live: https://synthia-avatar.vercel.app (200). Next.js + three.js 3D avatar site (Wizard/Staff/Hat models, FireFlies background, sound). Honest provenance in git history (template cleanup commit, package renamed kupuri-alex-avatar). NOTE: repo description says "Ivette Personal Site" but package name + content = Agent Alex avatar body (matches agent-city Step 3). An identity call for the owner: is this Alex's shell, Synthia's, or Ivette's personal site?

## EVIDENCE (verified this inspection)
- Background PNGs, models, audio all present in public/ (assets committed).
- Build compiles successfully; local build then OOM-killed on audit box (environment, 800MB free - same as fleet-wide note; Vercel live 200 stands).
- Contact form uses a local sendEmail (Form.tsx) - no external email key in tree.
- i18n (request.ts), LanguageSwitcher, InviteOnlyModal present.

## VIOLATIONS / GAPS (severity + standard broken)
1. HIGH - PORTFOLIO IS 100% PLACEHOLDER: every project in src/data.ts is "Proximamente" with demoLink "#" - the projects page shows only coming-soon cards with dead links. Breaks Collins 2.6 proof-before-claims + no-dead-ends. Fix: ship real projects (the fleet has them: recetario-vivo, vallarta, lamonarca, soltar, butterflytracker) or cut the page until real.
2. MED - `tsc --noEmit` FAILS: TS2307 on all background-image imports - missing next-env.d.ts / image type declarations in repo. Typecheck gate broken on a fresh clone. Fix: commit next-env.d.ts (or images.d.ts) and add typecheck to CI.
3. MED - NFT SURFACE: AgentAlexNFTCard component renders an NFT card (i18n key NFTCard). Crypto/NFT on a personal/portfolio site is a brand-risk decision only the owner makes. Fix: owner call - wire, gate, or delete.
4. LOW - `next lint` dead script (same fleet-wide class). No tests (no test script).
5. LOW - InviteOnlyModal + "Solo por invitacion" copy: exclusivity framing with no invite mechanism behind it (modal is decorative). Wire or reword.
6. INFO - three.js heavy hero: mobile/perf + reduced-motion audit required before Collins gate (Krug usability).

## FIX LIST TO PRODUCTION-READY (ordered)
0 (owner) identity decision - Alex shell vs Ivette personal site; 1 (2h) real projects or cut page; 2 (30m) commit type declarations; 3 (owner) NFT decision; 5 (30m) wire-or-reword invite; 6 (1h) perf/reduced-motion pass. Estimated: one day + two owner calls.

## PORTFOLIO ROLE
Do NOT present to clients in current state (placeholder portfolio). The 3D craft is real and could become a signature "Synthia/Alex" interactive piece after the identity and content fixes.
