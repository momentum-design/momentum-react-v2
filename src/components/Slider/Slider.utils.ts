import { clamp } from '@react-aria/utils';

export const getValuePercentage = (value: number, min: number, max: number): number => {
  const percentage = ((value - min) / (max - min)) * 100;
  return clamp(percentage, 0, 100);
};

export const setLocalValueOnElement = (element: HTMLInputElement): void => {
  // passing in the element values as numbers, using the unary plus operator:
  const percentageValue = getValuePercentage(+element.value, +element.min, +element.max);

  const existingLocalValue = element.style.getPropertyValue('--local-value');
  const newLocalValue = `${percentageValue}%`;
  if (existingLocalValue !== newLocalValue) {
    element.style.setProperty('--local-value', newLocalValue);
  }
};
