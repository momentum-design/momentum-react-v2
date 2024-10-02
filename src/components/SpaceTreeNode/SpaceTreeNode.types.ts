import { ContextMenuActionsProp } from '../ContextMenu/ContextMenu.types';
import { SpaceRowContentProps } from '../SpaceRowContent';
import { TreeNodeBaseProps } from '../TreeNodeBase';

export interface Props
  extends Omit<TreeNodeBaseProps, 'children'>,
    SpaceRowContentProps,
    ContextMenuActionsProp {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Title of this SpaceTreeNode. Appears below the item box.
   */
  title?: string;
}
