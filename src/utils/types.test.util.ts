// https://github.com/type-challenges/type-challenges/blob/main/utils/index.d.ts
// These types are used for testing to check that 2 types are the same
export type Expect<T extends true> = T;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;
