import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../src/app/api/alex/route.ts';

test('legacy route never spends a server or caller model key and returns no private errors', async () => {
  const oldFetch = globalThis.fetch;
  const oldKey = process.env.ANTHROPIC_API_KEY;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('must not call model'); };
  process.env.ANTHROPIC_API_KEY = 'test-only-not-a-real-key';
  try {
    for (const body of [JSON.stringify({ messages: [], apiKey: 'caller-key', systemPrompt: 'override' }), '{', 'x'.repeat(100000)]) {
      const response = await POST(new Request('https://example.test/api/alex', { method: 'POST', body }));
      assert.equal(response.status, 410);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.deepEqual(await response.json(), { error: 'legacy_proxy_retired', content: 'Alex runs in Instinct. This legacy model proxy is disabled.' });
    }
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = oldKey;
  }
});
