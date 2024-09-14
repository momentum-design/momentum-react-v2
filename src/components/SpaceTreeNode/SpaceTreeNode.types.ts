import { SpaceRowContentProps } from '../SpaceRowContent';
import { TreeNodeBaseProps } from '../TreeNodeBase';

export interface Props extends TreeNodeBaseProps, SpaceRowContentProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Title of this SpaceTreeNode. Appears below the item box.
   */
  title?: string;
}
