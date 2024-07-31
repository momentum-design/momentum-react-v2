import React, { FC, useMemo, useState } from 'react';
import classnames from 'classnames';

import { STYLE } from './Accordion.constants';
import {
  STYLE as LIST_ITEM_BASE_STYLE,
  SHAPES as LIST_ITEM_BASE_SHAPES,
} from '../ListItemBase/ListItemBase.constants';
import type { Props } from './Accordion.types';
import './Accordion.style.scss';
import Icon from '../Icon';
import { v4 as uuidV4 } from 'uuid';
import Text from '../Text';
import ButtonSimple from '../ButtonSimple';

const Accordion: FC<Props> = (props: Props) => {
  const {
    children,
    className,
    id,
    style,
    heading,
    headingRightContent,
    defaultExpanded = true,
    ariaLevel,
  } = props;

  const [expanded, setExpanded] = useState(defaultExpanded);
  const accordionId = useMemo(() => id || uuidV4(), [id]);

  const headerButtonId = `${accordionId}-header-button`;
  const panelId = `${accordionId}-panel`;

  const onClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classnames(className, STYLE.wrapper)} id={accordionId} style={style}>
      <div className={STYLE.headerRow}>
        <div className={STYLE.headerHeading} role="heading" aria-level={ariaLevel}>
          <ButtonSimple
            className={classnames(STYLE.headerButton, LIST_ITEM_BASE_STYLE.wrapper)}
            data-interactive
            data-shape={LIST_ITEM_BASE_SHAPES.isPilled}
            data-padded
            id={headerButtonId}
            aria-expanded={expanded}
            aria-controls={panelId}
            onPress={onClick}
          >
            <Icon name={expanded ? 'arrow-down' : 'arrow-right'} scale={12} />
            {typeof heading === 'string' ? <Text type="body-secondary">{heading}</Text> : heading}
          </ButtonSimple>
        </div>
        {headingRightContent}
      </div>
      {expanded ? (
        <div role="region" aria-labelledby={headerButtonId} id={panelId}>
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Accordion;
