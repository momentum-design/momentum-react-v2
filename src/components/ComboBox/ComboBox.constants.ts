const CLASS_PREFIX = 'md-combo-box';

const DEFAULTS = {
  WIDTH:'16.25rem',
  PLACEHOLDER:'',
  NO_RESULT_TEXT:'No results found',
  SHOULD_FILTER_ON_ARROW_BUTTON:true,
  ERROR:false,
  SELECTEDKEY:'',
  DISABLEDKEYS:[],
};

const STYLE = {
  description: `${CLASS_PREFIX}-description`,
  label: `${CLASS_PREFIX}-label`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
  inputSection: `${CLASS_PREFIX}-input-section`,
  input: `${CLASS_PREFIX}-input`,
  divider: `${CLASS_PREFIX}-divider`,
  button: `${CLASS_PREFIX}-button`,
  arrowIcon: `${CLASS_PREFIX}-arrow-icon`,
  selectionPosition: `${CLASS_PREFIX}-selection-position`,
  selectionContainer: `${CLASS_PREFIX}-selection-container`,
  selection: `${CLASS_PREFIX}-selection`,
  noResultText: `${CLASS_PREFIX}-no-result-text`,
};

const KEYS = {
  INPUT_SEARCH_NO_RESULT: 'input_search_no_result',
};

const ELEMENT = {
  PROPS: {
    SELECTION_CONTAINER_MAX_HEIGHT:244,
  },
};

const EVENT = {
  KEY:{
    KEYCODE:{
      ESCAPE: 'Escape',
      ENTER: 'Enter',
      TAB: 'Tab',
      ARROW_DOWN: 'ArrowDown',
      ARROW_UP: 'ArrowUp',
    }
  }
};

export{STYLE,DEFAULTS,KEYS,ELEMENT,EVENT};
