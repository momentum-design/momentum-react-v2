/**
 * Cleans the param of any leading or trailing spaces and non-string values
 * @param secondLine
 * @returns an array containing all trimmed, non-empty strings in secondLine
 */
export const cleanSecondLine = (secondLine: string | string[] | null): Array<string> => {
  if (secondLine === null || secondLine === undefined) {
    return [];
  }

  const secondLineArray: string[] = typeof secondLine === 'string' ? [secondLine] : secondLine;

  const secondLineArrayClean = secondLineArray.reduce((filteredArray, nextElement) => {
    if (typeof nextElement === 'string') {
      const nextElementClean = nextElement.trim();
      if (nextElementClean) {
        filteredArray.push(nextElementClean);
      }
    }
    return filteredArray;
  }, []);

  return secondLineArrayClean;
};
