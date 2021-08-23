const CLASS_PREFIX = 'md-flex';

const ALIGN_CONTENT = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
  stretch: 'stretch',
  baseline: 'baseline',
};

const JUSTIFY_CONTENT = {
  ...ALIGN_CONTENT,
  left: 'left',
  right: 'right',
};

const ALIGN_ITEMS = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
  selfStart: 'self-start',
  selfEnd: 'self-end',
};

const DIRECTION = {
  row: 'row',
  column: 'column',
  rowReverse: 'row-reverse',
  columnReverse: 'column-reverse',
};

const WRAP = {
  wrap: 'wrap',
  nowrap: 'nowrap',
  wrapReverse: 'wrap-reverse',
};

const DEFAULTS = {
  DIRECTION: DIRECTION.row,
  JUSTIFY_CONTENT: JUSTIFY_CONTENT.start,
  ALIGN_ITEMS: ALIGN_ITEMS.start,
  ALIGN_CONTENT: ALIGN_CONTENT.start,
  WRAP: WRAP.nowrap,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { DEFAULTS, STYLE, ALIGN_CONTENT, JUSTIFY_CONTENT, ALIGN_ITEMS, DIRECTION, WRAP };
