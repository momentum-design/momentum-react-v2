import { getListItemBaseTabIndex } from './ListItemBase.utils';

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
