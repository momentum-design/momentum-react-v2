import { PressEvent } from '@react-types/shared/src/events';
import { CSSProperties } from 'react';
import { CollectionChildren } from '@react-types/shared/src/collections';


export type IComboboxItem = {
  key: string;
  label: string;
};

export type IComboboxGroup = {
  items: IComboboxItem[];
  section: string;
};

export interface Props {
  onSelectionChange?: (item: IComboboxItem) => void;
  onInputChange?: (event: InputEvent) => void;
  onAction?: (item: IComboboxItem) => void;
  onPress?: (event: PressEvent) => void;
  id?: string;
  style?: CSSProperties;
  className?: string;
  label?: string;
  description?: string;
  width?: string;
  placeholder?: string;
  noResultText?: string;
  items: IComboboxGroup[];
  disabledKeys?: string[];
  selectedKey?: string; 
  children: CollectionChildren<any>;
}
