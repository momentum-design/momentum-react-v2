import { PressEvent } from '@react-types/shared/src/events';
import { IconScale } from '../Icon/Icon.types';
import { CSSProperties } from 'react';
import { CollectionChildren } from '@react-types/shared/src/collections';


export type IComboboxItem = {
  key: string;
  label: string;
  [propName: string]: any;
};

export type IComboboxGroup = {
  items: IComboboxItem[];
  [propName: string]: any;
};

export interface Props {
  onSelectionChange?: (item: IComboboxItem) => void;
  onInputChange?: (event: InputEvent) => void;
  onAction?: (item: IComboboxItem) => void;
  onPress?: (event: PressEvent) => void;
  id?: string;
  style?: CSSProperties;
  className?: string;
  iconScale?: IconScale;
  label?: string;
  description?: string;
  height?: string;
  width?: string;
  error?: boolean;
  placeholder?: string;
  noResultText?: string;
  items: IComboboxGroup[];
  disabledKeys?: string[];
  selectedKey?: string; 
  children: CollectionChildren<any>;
}