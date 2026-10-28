# Independent backend and compatibility review

Observed 2026-10-28. Targeted candidate state: **READY FOR PREVIEW**. Production: **NOT READY**. Baseline: `ae4e9487147d0300f77ffd602b0676c7d10eae3d`. No unresolved blocking S0/S1 finding was identified in this targeted security/compatibility patch. This review does not certify the whole application or public release.

The independent reviewer read the baseline Git diff and new client-boundary files, compared all 20 candidate files byte-for-byte with the full build checkout, and reran the Node suite: **6 passed, 0 failed**. That suite executes the retired route, exercises mocked contact delivery/error/timeout contracts, and checks form wiring; it does not prove browser interaction or remote persistence.

The root and cockpit pin Next and eslint-config-next to 15.5.28. The official Next.js update published 2026-10-14 identifies 15.5.28 as its patched Maintenance LTS release: https://nextjs.org/blog/nextjs-security-update-october-14-2026 . This source was independently opened and checked during review. Package-lock comparison against baseline confirms these root resolved versions are unchanged:

| Package | Before and after |
|---|---|
| react / react-dom | 18.3.1 |
| three | 0.164.1 |
| @react-three/fiber | 8.16.5 |
| @react-three/drei | 9.105.6 |
| react-reconciler | 0.27.0 |

The client-boundary change is limited to loading Canvas and the three existing models through client components with SSR disabled. New `CanvasScene.tsx` is byte-identical to baseline `RenderModel.tsx`, preserving scene props, Suspense, environment and classes. Existing page/form className expressions compare equal; the full checkout has no public asset changes. This is static compatibility evidence. Browser hydration, WebGL, rendering, responsiveness and interaction remain unverified.

The full build checkout has completed root and cockpit `.next/BUILD_ID` artifacts and installed Next 15.5.28 in both workspaces. The implementation's recorded full builds and local HTTP checks report root/contact/about/projects and cockpit HTML success plus fixed POST `/api/alex` HTTP 410. The reviewer checked build artifact presence and matching source bytes; the reviewer did not independently rerun those whole builds or HTTP shell checks. HTML success does not establish visual or browser correctness.

The retired route reads no request body or model credentials and makes no upstream calls. The contact helper requires a persisted receipt ID and `received:true` before the form clears. Input is retained on delivery failure and simultaneous duplicate submissions are guarded. A timeout followed by a manual retry is not exactly-once delivery. No Instinct bridge or live gateway deployment is claimed.

The retained dependency-audit artifact reports zero high/critical findings, two root moderate dependency entries for the same unresolved uuid advisory (`GHSA-w5hq-g745-h8pq` through drei), and zero cockpit findings. These are recorded audit observations, not an assertion of complete dependency security. Reachability of affected uuid APIs remains unqualified. Narrow postcss and brace-expansion overrides are visible in both manifests. No React/Three major migration was introduced.

Before public release, reproduce the locked installs/builds on the exact committed revision, verify the real browser and gateway persistence/failure flows, resolve the remaining dependency finding or document its qualified disposition, and resolve existing template/GLB licensing blockers. No license clearance, production deployment, paid model activation or restored cockpit chat is supplied by this review. Preserve stored inquiries and retirement of the unsafe funded proxy during rollback.

The added GitHub workflow was statically reviewed: checkout/setup-node use fixed 40-character SHAs, checkout credentials are not persisted, permissions are contents-read, and the job has a 15-minute limit. It uses Node 24, locked installs with lifecycle scripts disabled, the six Node tests, audit with a high-severity failure threshold, and both builds. No deployment step or secret reference exists. It does not require moderate audit findings to be fixed. Actual CI execution remains unverified; workflow presence is not a passing run.

## Content binding

The initial 20 application/configuration/document files matched the full build checkout at review. The subsequent workflow and updated verification document were independently read in the final local candidate. Final 21-file aggregate SHA-256 of compact JSON sorted `[path,file_sha256]` pairs: `6b96920d59a4712f4fa11a422369e6645ee6e8dcbc97e027b9a4a2ad2d915126`. The report is excluded to avoid a circular hash. A containing commit must preserve these bytes for this review to apply.

```json
[
  [
    ".github/workflows/backend-checks.yml",
    "f5dfd8e1b0e54202ae3042179a54b2d71a077c0bffb4c3c033b65f58512059c6"
  ],
  [
    "cockpit/package-lock.json",
    "59122505bd72cb957e498422d20c2f963d313e184100abc682ab4f27f1ac6100"
  ],
  [
    "cockpit/package.json",
    "fe3769b4e826b1e4a9ab29294e5f3ee2c370344234f59420bb36d087a88c3f82"
  ],
  [
    "cockpit/src/app/api/alex/route.ts",
    "bb132e3b18d4de7d73834521599f51daa5713514cd87e1e18b8ec616680946a0"
  ],
  [
    "cockpit/tests/alex-route.test.mjs",
    "fb66d8f78286fb1e0f76fb9b6b42acfc53ee87c625e67f5e7b76492fb4328f0c"
  ],
  [
    "cockpit/tsconfig.json",
    "211c6856e8137868a22e8ee33a8b4182a6a6983f6f7bcf36b84b7cdcf3ffa431"
  ],
  [
    "docs/backend-dependency-audit.json",
    "1d1b66d61f39d90c75612755f6050c4ebaa9e77e7f084a64e6c8e251e9339424"
  ],
  [
    "docs/backend-safety.md",
    "51170eed06be6a7b168b5e43f2e071fd8bdace6d9449b6908607ce44e5466573"
  ],
  [
    "docs/backend-verification.json",
    "0d36e4d1c4bec9e858b70f6befe13cbd38c737f185f0dc78b2dfafa17525469a"
  ],
  [
    "package-lock.json",
    "fc526aa42ff0917650469a7eb26622a42a087dba69db466a072d0ea72db46868"
  ],
  [
    "package.json",
    "09d7fdfeb6255cdbe128323a84843394ba974a4b4bff81839612e3873c18526c"
  ],
  [
    "src/app/about/page.tsx",
    "ccf2af87d991eb1a1cf59c9381e299f1e8e334c4f5ea83e6b19095784eb15157"
  ],
  [
    "src/app/page.tsx",
    "0c37833028c9336d55c934fa10c80c060529689a89ecb44e366505bd047b514b"
  ],
  [
    "src/app/projects/page.tsx",
    "52bb2230647526199f62efd832ac75ae589fd0a6575c24fe89b8e13a67586aac"
  ],
  [
    "src/components/CanvasScene.tsx",
    "3b3190da5938ea9ec0f49a835ca5be4592308d22c64049b58d9c75ac6cafc216"
  ],
  [
    "src/components/RenderModel.tsx",
    "063ae661aced5c31c17b59968cf9b412dce4681c7438bbcb0f5de8c635e4503f"
  ],
  [
    "src/components/contact/Form.tsx",
    "84142380b626451454951887494f29bf89b7ecf0749ff28ea3f05fedf4020790"
  ],
  [
    "src/components/models/ClientModels.tsx",
    "904ab144fbffb4991718529fda5fa9ef73a6e7bb5d8f37e8f7c64136beff6403"
  ],
  [
    "src/lib/contact.mjs",
    "6d91ce717e4e9111d7090a5b54534cdc8a1486c82fbb95cd0fed689e32d3a29b"
  ],
  [
    "tests/contact-persistence.test.mjs",
    "26efdedba8401a0694377f101da851372d54d4a7fa373161ff61b66a84c573e3"
  ],
  [
    "tsconfig.json",
    "aa24d20779bd08e93652aa3886a0d4c04e3a464ab65ec9b8683665f499347eb8"
  ]
]
```
