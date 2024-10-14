import { ComponentProps } from 'react';

export type AllowedTagNames = 'div' | 'section';
export type Props<TComponent extends AllowedTagNames = AllowedTagNames> =
  ComponentProps<TComponent> & {
    as?: TComponent;
  };
