import React, { FC } from 'react';

import { DEFAULTS, STYLE } from './Text.constants';
import { Props } from './Text.types';
import classnames from 'classnames';
import { Text as MdcText } from '@momentum-design/components/dist/react';
import { mapOldToNewType } from './mappingUtils';

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const Text: FC<Props> = (props: Props) => {
  const { children, type = DEFAULTS.TYPE, className, id, style, tagName, ...rest } = props;

  return (
    <MdcText
      className={classnames(STYLE.wrapper, className)}
      type={mapOldToNewType(type)}
      id={id}
      tagname={tagName}
      style={style}
      {...rest}
    >
      {children}
    </MdcText>
  );
};

export default Text;
