import { CSSProperties, ReactNode } from 'react';
import { AriaButtonProps } from '@react-types/button';

<<<<<<< HEAD:src/components/ListItemBase/ListItemBase.types.ts
export type ListItemBaseSize = 32 | 40 | 50;

export interface Props {
=======
export interface Props extends AriaButtonProps {
>>>>>>> master:src/components/AlertBadge/AlertBadge.types.ts
  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color for this component.
   */
  color?: 'error' | 'success' | 'theme' | 'warning';

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Image to use for this component.
   */
<<<<<<< HEAD:src/components/ListItemBase/ListItemBase.types.ts
  size?: ListItemBaseSize;
=======
  image?: ReactNode;
>>>>>>> master:src/components/AlertBadge/AlertBadge.types.ts

  /**
   * Label to use for this component.
   */
  label?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
