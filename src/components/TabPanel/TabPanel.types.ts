import { ComponentProps } from 'react';

export type AllowedTagNames = 'div' | 'section';
export type Props<TComponent extends AllowedTagNames = AllowedTagNames> = Omit<
  ComponentProps<TComponent>,
  'id'
> & {
  as?: TComponent;
};
