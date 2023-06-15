import { getValuePercentage, setLocalValueOnElement } from './Slider.utils';

describe('getValuePercentage', () => {
  it.each([
    {
      value: 5,
      min: 0,
      max: 10,
      expected: 50,
    },
    {
      value: 0,
      min: 0,
      max: 10,
      expected: 0,
    },
    {
      value: 10,
      min: 0,
      max: 10,
      expected: 100,
    },
    {
      value: 11,
      min: 0,
      max: 10,
      expected: 100,
    },
    {
      value: 0,
      min: 1,
      max: 10,
      expected: 0,
    },
    {
      value: -5,
      min: 0,
      max: 10,
      expected: 0,
    },
    {
      value: -5,
      min: -10,
      max: 0,
      expected: 50,
    },
  ])('returns percentage value when %o', ({ value, min, max, expected }) => {
    expect(getValuePercentage(value, min, max)).toBe(expected);
  });
});

describe('setLocalValueOnElement', () => {
  const setupElement = (existingLocalValue: string) => {
    return {
      value: 5,
      min: 0,
      max: 10,
      style: {
        getPropertyValue: jest.fn(() => existingLocalValue),
        setProperty: jest.fn(),
      },
    } as unknown as HTMLInputElement;
  };

  it('should set style on element as expected if localValue is different', () => {
    const element = setupElement('');
    setLocalValueOnElement(element);
    expect(element.style.getPropertyValue).toBeCalledWith('--local-value');
    expect(element.style.setProperty).toBeCalledWith('--local-value', '50%');
  });

  it('should not set style on element if localValue is the same', () => {
    const element = setupElement('50%');
    setLocalValueOnElement(element);
    expect(element.style.getPropertyValue).toBeCalledWith('--local-value');
    expect(element.style.setProperty).not.toHaveBeenCalled();
  });
});
