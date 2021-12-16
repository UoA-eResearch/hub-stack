/**
 * This is a type guard which checks at compile time whether {@linkcode value} is of type {@linkcode TValue}.
 * It can, for example, be used as a type safe predicate for the `array.filter()` method to filter out empty values.
 * ```typescript
 * const array: (number|null|undefined)[] = [1, 2, null, 3, undefined];
 * const filteredArray: number[] = array.filter(notEmpty); // filteredArray = [1, 2, 3]
 * ```
 * [More information here](https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array)
 * @param value
 * @returns `false` if `value` is `undefined | null`
 */
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}
