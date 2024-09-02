import { getListItemBaseTabIndex, handleEmptyListItem } from './ListItemBase.utils';

describe('getListItemBaseTabIndex', () => {
  const listContextWellDefined = { currentFocus: 1 };

  it.each`
    interactive | listContext               | focus    | expected
    ${false}    | ${undefined}              | ${true}  | ${-1}
    ${false}    | ${undefined}              | ${false} | ${-1}
    ${false}    | ${listContextWellDefined} | ${true}  | ${-1}
    ${false}    | ${listContextWellDefined} | ${false} | ${-1}
    ${true}     | ${undefined}              | ${true}  | ${0}
    ${true}     | ${undefined}              | ${false} | ${0}
    ${true}     | ${listContextWellDefined} | ${true}  | ${0}
    ${true}     | ${listContextWellDefined} | ${false} | ${-1}
  `(
    'returns $expected when interactive is $interactive, listContext is $listContext and focus is $focus',
    ({ interactive, listContext, focus, expected }) => {
      const tabIndex = getListItemBaseTabIndex({ interactive, listContext, focus });
      expect(tabIndex).toBe(expected);
    }
  );
});

describe('handleEmptyListItem', () => {
  const listSize = 3;
  const setCurrentFocus = jest.fn();
  const setDirection = jest.fn();

  beforeEach(() => {
    setCurrentFocus.mockClear();
    setDirection.mockClear();
  });

  it.each`
    direction     | itemIndex | expectedNewFocus | noLoop   | expectedSetDirection
    ${'forward'}  | ${0}      | ${1}             | ${false} | ${undefined}
    ${'forward'}  | ${1}      | ${2}             | ${false} | ${undefined}
    ${'forward'}  | ${2}      | ${0}             | ${false} | ${undefined}
    ${'backward'} | ${0}      | ${2}             | ${false} | ${undefined}
    ${'backward'} | ${1}      | ${0}             | ${false} | ${undefined}
    ${'backward'} | ${2}      | ${1}             | ${false} | ${undefined}
    ${'forward'}  | ${0}      | ${1}             | ${true}  | ${undefined}
    ${'forward'}  | ${1}      | ${2}             | ${true}  | ${undefined}
    ${'forward'}  | ${2}      | ${1}             | ${true}  | ${'backward'}
    ${'backward'} | ${0}      | ${1}             | ${true}  | ${'forward'}
    ${'backward'} | ${1}      | ${0}             | ${true}  | ${undefined}
    ${'backward'} | ${2}      | ${1}             | ${true}  | ${undefined}
  `(
    'returns $expectedNewFocus when direction is $direction and itemIndex is $itemIndex',
    ({ direction, itemIndex, expectedNewFocus, noLoop, expectedSetDirection }) => {
      handleEmptyListItem({
        direction,
        itemIndex,
        setCurrentFocus,
        setDirection,
        listSize,
        noLoop,
      });
      expect(setCurrentFocus).toHaveBeenCalledWith(expectedNewFocus);
      if (expectedSetDirection) {
        expect(setDirection).toHaveBeenCalledWith(expectedSetDirection);
      } else {
        expect(setDirection).not.toHaveBeenCalled();
      }
    }
  );

  it('handles setCurrentFocus being undefined', () => {
    handleEmptyListItem({
      direction: 'backward',
      itemIndex: 0,
      setCurrentFocus: undefined,
      setDirection,
      listSize,
      noLoop: true,
    });
  });

  it('handles setDirection being undefined', () => {
    handleEmptyListItem({
      direction: 'backward',
      itemIndex: 0,
      setCurrentFocus,
      setDirection: undefined,
      listSize,
      noLoop: true,
    });
  });
});
