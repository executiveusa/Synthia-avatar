# Agent Alex - Avatar (Kupuri Media)

The embodied avatar surface for Agent Alex, Kupuri Media's First Mate persona
(es-MX first). Next.js + TypeScript + Tailwind + Three.js (@react-three/fiber,
drei). The 3D magician character (public/models/) is preserved per the Kupuri
OS spec and becomes the visual body of Alex.

## Status

Work in progress, invite-gated. Contact form routes to the Alex gateway seam
(NEXT_PUBLIC_ALEX_GATEWAY_URL); without that endpoint configured it fails
honestly instead of pretending to send.

## Provenance and licensing (OPEN)

Derived from Amit Amrutiya's open-source `profilepalette` portfolio template
(https://github.com/amitamrutiya/profilepalette). Upstream license must be
verified before any public release; this repo currently has no LICENSE file.
The GLB character models' provenance and license are not yet identified with
evidence. Do not deploy publicly until both are resolved.
(Tracked in kupuri-agent-city docs/STEP3_AVATAR_FINDINGS.md.)

## Develop

```
npm install
npm run build   # verified: 10/10 pages, 2026-09-13
npm run dev
```

Copy .env.example to .env.local and set NEXT_PUBLIC_ALEX_GATEWAY_URL when the
Step 4 gateway runtime exists.
