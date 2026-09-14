# Canonical Alex asset (city-wide)

Recorded 2026-09-13 by the watcher lane, per Bambú directive. This repo is the
canonical source for the Alex avatar body used across ALL Kupuri/Pauli city work.

## The asset (main @ 77a834c)
- public/models/wizard-transformed.glb (3.5 MB) - Alex wizard avatar body
- public/models/staff-transformed.glb (1.6 MB) - staff
- public/models/hat-transformed.glb (0.2 MB) - hat
- Components: src/components/models/{Wizard,Staff,Hat}.tsx,
  src/components/AlexNameplate.tsx, src/components/AgentAlexNFTCard.tsx
- Ambience: public/background/*.png (4 forest scenes), public/audio/birds39-forest-20772.mp3

## Rules
1. Any city surface that needs Alex pulls from THESE files (or this repo's raw
   URLs pinned to main). Do not fork variants into other repos.
2. The 2D witch-and-cat illustration circulating in the Kupuri site patch is NOT
   in this repo and is NOT the canonical body. It is a separate 2D marketing
   asset; its home is the kupuri-media-cdmx patch lane, held for Bambú.
3. License note: GLB usage inherits this repo's README terms (OPEN per README);
   upstream template provenance: AVATAR repo (profilepalette).
