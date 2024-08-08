import { Props as ButtonCircleProps } from '../ButtonCircle/ButtonCircle.types';
import { Props as LinkProps } from '../Link/Link.types';

export type Props = Pick<ButtonCircleProps, 'color' | 'shallowDisabled' | 'ghost' | 'outline' | 'size'> & LinkProps;
