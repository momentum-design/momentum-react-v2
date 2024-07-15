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

  const Separator = () => (
    <div
      className={STYLE.separator}
      data-outline={outline}
      data-outline-position={outlinePosition}
      data-outline-color={outlineColor}
      data-outline-only={!children}
    />
  );

  return (
    <>
    {outline && outlinePosition === 'top' && <Separator />}
    <ListItemBase
      interactive={false}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      isPadded={true}
      data-bold={bold}
      size={32}
      style={style}
    >
      {children}  
    </ListItemBase>
    {outline && outlinePosition === 'bottom' && <Separator />}
    </>

  );
};

export default ListHeader;
