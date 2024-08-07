import { Props as ButtonPillProps } from '../ButtonPill/ButtonPill.types';
import { Props as LinkProps } from '../Link/Link.types';

export type Props = Pick<ButtonPillProps, 'color' | 'shallowDisabled' | 'ghost' | 'outline' | 'size' | 'grown'> & LinkProps;
