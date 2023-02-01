/**
 * Combines every reaction with every skin tone
 * @param x reactions
 * @param y skin tones
 * @returns array containing an object with the cartesian between the two objects (x, y)
 */
export const cartesian = <X, Y>(x: X[], y: Y[]): { type: X; skinTone: Y }[] =>
  x.reduce(
    (acc: { type: X; skinTone: Y }[], xVal: X) =>
      acc.concat([...y.map((yVal) => ({ type: xVal, skinTone: yVal }))]),
    []
  );
