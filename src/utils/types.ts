/**
 * Utility type to require one or more from a set of attributes.
 *
 * For example, this is used to check that `aria-label` or `aria-labelledby` is defined on components when consumed.
 * `RequireOneOf<AriaAttributes, ['aria-label', 'aria-labelledby']>` = `{'aria-label': string} | {'aria-labelledby': string}`
 *
 * More examples can be found in src/utils/types.test.ts
 *
 * @typeParam TFrom - Used to get the type of the required attributes
 * @typeParam TAttributes - One of these attributes satifies this requirement. Must be given as an array.
 */
export type RequireOneOf<TFrom, TAttributes extends (keyof TFrom)[]> = TAttributes extends [
  // Get the first attribute defintion in TAttributes
  infer TFirst extends keyof TFrom,
  // Get the remaining attribute definitions in TAttributes
  ...infer TLast extends (keyof TFrom)[]
]
  ? Required<{ [K in TFirst]: TFrom[K] }> | RequireOneOf<TFrom, TLast>
  : never;
