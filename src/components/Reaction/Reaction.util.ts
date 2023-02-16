type Grouping<X = string, Y = string> = { type: X; skinTone: Y };
/**
 * Combines every reaction with every skin tone
 * @param x reactions
 * @param y skin tones
 * @returns array containing an object with the cartesian between the two objects (x, y)
 */
export const cartesian = <X, Y>(x: X[], y: Y[]): Grouping<X, Y>[] =>
  x.reduce(
    (acc: { type: X; skinTone: Y }[], xVal: X) =>
      acc.concat([...y.map((yVal) => ({ type: xVal, skinTone: yVal }))]),
    []
  );

/**
 * Generates object with all combinations between reactions and skin tones and applies a
 * mapping function to the key and value of the final object.
 *
 * Final object for mapping function that
 * just appends the skin tone to the reaction type will look like:
 *
 * ```js
 * {
 *  "raise_hand_yellow": "raise_hand_yellow",
 *  "raise_hand_light": "raise_hand_light",
 *  "raise_hand_medium_light": "raise_hand_medium_light",
 *  "raise_hand_medium": "raise_hand_medium",
 *  "raise_hand_medium_dark": "raise_hand_dark",
 * ...
 * }
 * ```
 *
 * @param grouping array with all the combinations between reactions and skin tones
 * @param mapping mapping function
 * @returns object with keys and value that represent valid reactions
 */
export const generateReactionsWithSkinTone = (
  grouping: Grouping[],
  mapping: (key: Grouping) => string
): { [key: string]: string } => {
  return grouping.reduce((acc, { type, skinTone }) => {
    const key = mapping({ type, skinTone });
    return { ...acc, [key]: key };
  }, {});
};
