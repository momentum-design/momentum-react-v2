import { MenuContextValue } from '../components/Menu/Menu.types';

declare module '@react-types/shared' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface ItemProps<T> extends Pick<MenuContextValue, 'closeOnSelect'> {}
}
