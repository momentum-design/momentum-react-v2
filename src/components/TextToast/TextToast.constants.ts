import { TextToastTextAlign } from './TextToast.types';

const CLASS_PREFIX = 'md-text-toast';

const DEFAULTS = {
  ALIGNMENT: 'center' as TextToastTextAlign,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  text: `${CLASS_PREFIX}-text`,
};

const ALIGNMENT: Record<string, TextToastTextAlign> = {
  LEFT: 'left',
  CENTER: 'center',
};

export { CLASS_PREFIX, DEFAULTS, STYLE, ALIGNMENT };
