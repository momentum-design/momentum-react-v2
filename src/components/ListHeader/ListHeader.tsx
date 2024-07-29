import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './ListHeader.constants';
import { Props } from './ListHeader.types';
import './ListHeader.style.scss';
import ListItemBase from '../ListItemBase';

/**
 * The ListHeader component.
 * This is just the non-interactive version. (non-collapsible)
 */
const ListHeader: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    children,
    outline = DEFAULTS.OUTLINE,
    outlinePosition = DEFAULTS.OUTLINE_POSITION,
    outlineColor = DEFAULTS.OUTLINE_COLOR,
    bold = DEFAULTS.BOLD,
  } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      style={style}
      data-outline={outline}
      data-outline-position={outlinePosition}
      data-outline-color={outlineColor}
      data-outline-only={!children}
      data-bold={bold}
      id={id}
    >
      {outline && outlinePosition === 'top' && <div role="separator" className={STYLE.separator} />}
      <ListItemBase interactive={false} isPadded={true} size={32} className={STYLE.listItemBase}>
        {children}
      </ListItemBase>
      {outline && outlinePosition === 'bottom' && (
        <div role="separator" className={STYLE.separator} />
      )}
    </div>
  );
};

export default ListHeader;
