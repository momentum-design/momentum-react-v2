import type { MdcButtonProps } from '../../types';

export type Props = Omit<MdcButtonProps, 'active'> & {
  isSelected?: boolean;
  outline?: boolean;
  onChange?: (isSelected: boolean) => void;
};
