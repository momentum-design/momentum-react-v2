import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './ButtonPillFixedWidthContent.constants';
import { Props } from './ButtonPillFixedWidthContent.types';
import './ButtonPillFixedWidthContent.style.scss';
import Icon from '../../Icon';
import Text from '../../Text';
import {
  getIconScaleFromButtonPillSize,
  getTextTypeFromButtonPillSize,
} from './ButtonPillFixedWidthContent.utils';

/**
 * The ButtonPillFixedWidthContent component.
 *
 * @internal use only. Should not be consumed from any external parties.
 */
const ButtonPillFixedWidthContent: FC<Props> = (props: Props) => {
  const { className, stringContentVariations, includeIcon, buttonPillSize, children } = props;
  const textType = getTextTypeFromButtonPillSize(buttonPillSize);
  const iconScale = getIconScaleFromButtonPillSize(buttonPillSize);

  return (
    <div className={STYLE.wrapper}>
      {stringContentVariations.length &&
        stringContentVariations.map((string) => (
          <div
            key={string}
            className={classnames(STYLE.buttonContent)}
            data-size={buttonPillSize}
            data-hidden={true}
          >
            {includeIcon && <Icon name="placeholder" scale={iconScale} />}
            <Text type={textType}>{string}</Text>
          </div>
        ))}
      <div
        className={classnames(className, STYLE.buttonContent)}
        data-size={buttonPillSize}
        data-hidden={false}
      >
        {children}
      </div>
    </div>
  );
};

export default ButtonPillFixedWidthContent;
