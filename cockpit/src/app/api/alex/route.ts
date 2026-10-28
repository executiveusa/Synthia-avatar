/**
 * The existing Alex lives in Instinct. This retired endpoint used to create an
 * unauthenticated second model proxy with server-funded credentials. No verified
 * Instinct action contract is available in this repository, so it cannot safely
 * forward requests. Do not re-enable it by attaching a model key.
 */
export async function POST(_request: Request) {
  // Deliberately do not read or buffer caller bodies, keys, prompts or messages.
  // A fixed response bounds work and cannot expose upstream errors or secrets.
  return Response.json(
    {
      error: 'legacy_proxy_retired',
      content: 'Alex runs in Instinct. This legacy model proxy is disabled.',
    },
    { status: 410, headers: { 'Cache-Control': 'no-store' } },
  );
}
