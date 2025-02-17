import { timeout } from './promise';

describe('timeout', () => {
  it('resolve in the specified time', async () => {
    const now = Date.now();
    const time = 1_000;
    await expect(timeout(time)).resolves.toBe(undefined);

    const ellapsed = Date.now() - now;
    expect(ellapsed).toBeGreaterThanOrEqual(time);
    expect(ellapsed).toBeLessThan(time * 1.1);
  });
});
