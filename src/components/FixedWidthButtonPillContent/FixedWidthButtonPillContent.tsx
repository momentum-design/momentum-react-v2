import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './FixedWidthButtonPillContent.constants';
import { Props } from './FixedWidthButtonPillContent.types';
import './FixedWidthButtonPillContent.style.scss';
import Icon from '../Icon';
import Text from '../Text';
import { getTextTypeFromButtonPillSize } from './FixedWidthButtonPillContent.utils';

/**
 * The FixedWidthButtonPillContent component.
 */
const FixedWidthButtonPillContent: FC<Props> = (props: Props) => {
  const {
    className,
    stringContentVariations,
    icon = DEFAULTS.ICON,
    iconScale = DEFAULTS.ICON_SCALE,
    buttonPillSize = DEFAULTS.BUTTON_PILL_SIZE,
    children,
  } = props;
  const textType = getTextTypeFromButtonPillSize(buttonPillSize);

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
            {icon && <Icon name="placeholder" scale={iconScale} />}
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

export default FixedWidthButtonPillContent;
