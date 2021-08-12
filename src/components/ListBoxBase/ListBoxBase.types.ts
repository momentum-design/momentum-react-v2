import { FocusStrategy } from '@react-types/shared';
import { ListState } from '@react-stately/list';

export interface Props<T> {
  /**
   * className prop description
   */
  className?: string;
  state: ListState<T>;
  autoFocus?: boolean | FocusStrategy;
  disallowEmptySelection?: boolean;
  shouldHaveMenuListBoxWrapper?: boolean;
}
