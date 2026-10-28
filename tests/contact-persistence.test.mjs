import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { persistContact } from '../src/lib/contact.mjs';

const payload = { from_name: 'Test', reply_to: 'test@example.test', message: 'A representative inquiry for the existing gateway.' };

test('requires configuration before network access', async () => {
  await assert.rejects(persistContact(undefined, payload, () => { throw new Error('unexpected call'); }), /service_unconfigured/);
});

test('uses existing adapter contract and returns only a confirmed persisted receipt', async () => {
  const receipt = { received: true, id: 'fixture-id', notified: false };
  const actual = await persistContact('https://gateway.example.test/', payload, async (url, options) => {
    assert.equal(url, 'https://gateway.example.test/contact');
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), payload);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json(receipt);
  });
  assert.deepEqual(actual, receipt);
});

test('never confirms HTTP errors, invalid receipts, HTML or network failure', async () => {
  for (const response of [Response.json({ received: true, id: 'x' }, { status: 503 }), Response.json({ received: false }), Response.json({ received: true }), Response.json({ received: true, id: '' }), new Response('<html>fallback</html>')]) {
    await assert.rejects(persistContact('https://gateway.example.test', payload, async () => response));
  }
  await assert.rejects(persistContact('https://gateway.example.test', payload, async () => { throw new Error('offline'); }), /offline/);
});

test('aborts a pending delivery at the bounded timeout', async (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  let aborted = false;
  const pending = persistContact('https://gateway.example.test', payload, async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => { aborted = true; reject(new Error('aborted')); });
  }));
  context.mock.timers.tick(20000);
  await assert.rejects(pending, /aborted/);
  assert.equal(aborted, true);
});

test('form awaits confirmation before clearing and guards duplicate submissions without layout changes', async () => {
  const source = await readFile(new URL('../src/components/contact/Form.tsx', import.meta.url), 'utf8');
  assert.match(source, /event: React.FormEvent<HTMLFormElement>/);
  assert.match(source, /if \(inFlight\.current\) return/);
  assert.match(source, /if \(await sendEmail\(templateParams\)\) \{\s*setName\(""\);\s*setEmail\(""\);\s*setMessage\(""\);/);
  assert.match(source, /disabled=\{sending\}/);
  assert.doesNotMatch(source, /event!|console\.log/);
});
