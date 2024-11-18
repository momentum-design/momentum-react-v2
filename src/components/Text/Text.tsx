import React, { FC } from 'react';

import { DEFAULTS, STYLE } from './Text.constants';
import { Props } from './Text.types';
import './Text.style.scss';
import classnames from 'classnames';
import {Text as MdcText} from '@momentum-design/components/dist/react';
import { inferTagName, mapOldToNewType } from './mappingUtils';

const Text: FC<Props> = (props: Props) => {
  const { children, type = DEFAULTS.TYPE, className, id, style, tagName, ...rest } = props;

  const tagNameLocal = tagName || inferTagName(type);

  return (
    <MdcText
      className={classnames(STYLE.wrapper, className)}
      type={mapOldToNewType(type)}
      id={id}
      tagname={tagNameLocal}
      style={style}
      {...rest}
    >
      {children}
    </MdcText>
  );
};

export default Text;
