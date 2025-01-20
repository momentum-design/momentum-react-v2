/**
 * Wait for the specified time
 *
 * @param time timeout duration in milliseconds
 */
export const timeout = (time = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time));
