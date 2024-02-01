const CLASS_PREFIX = 'md-inputSelect';

const DEFAULTS = {
  HEIGHT:'2rem',
  WIDTH:'15rem',
  ICON_SCALE:12 as const,
  PLACEHOLDER:'Search or select an option',
  NO_RESULT_TEXT:'No results found',
  SELECTEDKEY:'',
  DISABLEDKEYS:[],
  ERROR:false,
};

const STYLE = {
  description: `${CLASS_PREFIX}-description`,
  label: `${CLASS_PREFIX}-label`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
  inputSection: `${CLASS_PREFIX}-inputSection`,
  input: `${CLASS_PREFIX}-input`,
  divider: `${CLASS_PREFIX}-divider`,
  btnContainer: `${CLASS_PREFIX}-btnContainer`,
  button: `${CLASS_PREFIX}-button`,
  arrowIcon: `${CLASS_PREFIX}-arrowIcon`,
  selectionContainer: `${CLASS_PREFIX}-selectionContainer`,
  selection: `${CLASS_PREFIX}-selection`,
  noResultText: `${CLASS_PREFIX}-noResultText`,
};

const KEYS = {
  INPUT_SEARCH_NO_RESULT: 'inputSearch_noResult',
};

export{STYLE,DEFAULTS,KEYS};



