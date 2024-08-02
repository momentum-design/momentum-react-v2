import { ListContextValue } from '../List/List.types';

/**
 * Returns the intended tabIndex for the ListItemBase
 */
export const getListItemBaseTabIndex = ({
  interactive,
  listContext,
  focus,
}: {
  interactive: boolean;
  listContext?: ListContextValue;
  focus: boolean;
}): number => {
  if (!interactive || (listContext && !focus)) {
    return -1;
  } else {
    return 0;
  }
};
