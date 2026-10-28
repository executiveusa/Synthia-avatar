# Existing Alex and contact delivery

This backend patch preserves the site's layout, typography, colors, media and navigation.
Baseline: `ae4e9487147d0300f77ffd602b0676c7d10eae3d`.

## Alex

Alex is the existing Instinct orchestration agent. The cockpit's old `POST /api/alex`
created a separate Anthropic conversation and could spend a server key without
authorizing the caller. That legacy proxy is retired: it always returns HTTP 410,
does not parse request bodies, and never reads keys or calls a provider.

This intentionally does not invent an Instinct API contract. To connect the cockpit
later, first verify the real Instinct external-action contract, authenticate the
owner server-side, scope allowed actions, enforce spending/approval boundaries and
test delegation receipts. A browser-stored API key is not server authorization.
Do not restore the old proxy as a connectivity workaround.

## Contact

The form continues to use `NEXT_PUBLIC_ALEX_GATEWAY_URL` plus `/contact`. Deploy the
matching gateway adapter from the private workplace repository and allow only the
actual site origin. The gateway must return `received: true` and a persisted record
`id`; HTTP 200 alone is not delivery proof. `notified: false` does not negate a
persisted inquiry, but does mean no notification was confirmed.

The form waits for that receipt before clearing input, prevents repeated submits
while awaiting delivery, and retains input on network, timeout or storage failure.
Timeout is 20 seconds. A timeout is an unknown delivery outcome; manually retrying
can create a duplicate because the existing gateway has no idempotency key contract.

## Verification and release

Run `node --test tests/contact-persistence.test.mjs cockpit/tests/alex-route.test.mjs`
with Node 24. The route test executes the actual retired route without Next or a
model call. The helper tests exercise mocked HTTP contracts. The form test checks
wiring statically, and is not browser interaction proof.

Root and cockpit now both build with exact Next/eslint-config-next 15.5.28. Root
generates 10 pages and cockpit generates 6 pages/routes, including lint and type
validation. Browser React 18, Three, fiber and drei versions are retained. Existing
Canvas/model code is loaded behind browser-only dynamic boundaries because R3F 8
cannot execute against Next 15's server React internals. Scene props, classes,
models and assets are unchanged; the original Canvas implementation is moved
byte-for-byte into `CanvasScene.tsx`.

Local production-server smoke tests return HTTP 200 for root `/`, `/contact`,
`/about`, `/projects`, cockpit `/` and `/cockpit`; the actual cockpit `/api/alex`
returns the intended 410. This proves server rendering and route containment,
not browser hydration, WebGL, or real contact delivery. Playwright browser install
failed on truncated CDN archives, so browser interaction is explicitly unverified.

Narrow dependency fixes update compatible lockfile versions and override only
Next's PostCSS to 8.5.32 and minimatch 3.1.5's brace-expansion to 1.1.21. Root audit
has zero high/critical and two moderate package entries for one underlying
`drei -> uuid@9.0.1` advisory, GHSA-w5hq-g745-h8pq; cockpit audit has zero findings.
The remaining advisory is recorded as unresolved, not dismissed. See
`backend-dependency-audit.json`. No forced audit upgrade or React/Three major
upgrade was used. Framework guidance:
https://nextjs.org/blog/nextjs-security-update-october-14-2026

Before a production-ready claim: run root and cockpit builds with their lockfiles,
review framework advisories, verify the current deployment revision, and test the
real form through gateway persistence. Test an invalid submission, refused origin,
storage outage, timeout and a second click. No credentials are needed in Git.

Rollback is a code revert, but reintroducing the unauthenticated funded proxy is
unsafe. If reverting the form, keep the legacy proxy disabled. Existing stored
inquiries are retained. This patch does not configure deployments or Instinct.
