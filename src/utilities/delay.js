export const delay = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function sleep(duration, ...fn) {
  await delay(duration);
  fn.forEach(async (item) => await item());
}
