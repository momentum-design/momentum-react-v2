import { PressEvent } from '@react-types/shared/src/events';
import { IconScale } from '../Icon/Icon.types';
import { CSSProperties } from 'react';
import { CollectionChildren } from '@react-types/shared/src/collections';


export type IInputSelectItem = {
  key: string;
  label: string;
  [propName: string]: any;
};

export type IInputSelectGroup = {
  items: IInputSelectItem[];
  [propName: string]: any;
};

export interface Props {
  onSelectionChange?: (item: IInputSelectItem) => void;
  onInputChange?: (event: InputEvent) => void;
  onAction?: (item: IInputSelectItem) => void;
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
  items: IInputSelectGroup[];
  disabledKeys?: string[];
  selectedKey?: string; 
  children: CollectionChildren<any>;
}