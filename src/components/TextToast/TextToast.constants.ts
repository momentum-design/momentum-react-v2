import { TextToastTextAlign } from './TextToast.types';

const CLASS_PREFIX = 'md-text-toast';

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  text: `${CLASS_PREFIX}-text`,
};

const ALIGNMENTS: Record<string, TextToastTextAlign> = {
  LEFT: 'left',
  CENTER: 'center',
};

const DEFAULTS = {
  ALIGNMENT: ALIGNMENTS.CENTER,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, ALIGNMENTS };
