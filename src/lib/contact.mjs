/** @typedef {{from_name: string, reply_to: string, message: string}} ContactPayload */

/**
 * Persist through the existing gateway adapter. A successful HTTP status alone
 * is insufficient: its receipt must attest persistence and contain a record id.
 * @param {string | undefined} gatewayUrl
 * @param {ContactPayload} payload
 * @param {typeof fetch} [fetcher]
 */
export async function persistContact(gatewayUrl, payload, fetcher = fetch) {
  if (!gatewayUrl?.trim()) throw new Error('service_unconfigured');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetcher(`${gatewayUrl.trim().replace(/\/+$/, '')}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('delivery_failed');
    const receipt = await response.json();
    if (receipt?.received !== true || typeof receipt.id !== 'string' || !receipt.id.trim()) {
      throw new Error('persistence_unconfirmed');
    }
    return receipt;
  } finally {
    clearTimeout(timeout);
  }
}
