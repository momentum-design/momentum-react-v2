import React, { FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './TextToast.constants';
import { Props } from './TextToast.types';
import './TextToast.style.scss';
import Text from '../Text/Text';

/**
 * The TextToast component renders a provided text.
 */
const TextToast: FC<Props> = (props: Props) => {
  const { text, textAlignment = DEFAULTS.ALIGNMENT, className, id, style } = props;

  return (
    <>
      {text?.length > 0 && (
        <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
          <Text
            type="body-secondary"
            className={classnames(className, STYLE.text)}
            style={{ textAlign: textAlignment }}
          >
            {text}
          </Text>
        </div>
      )}
    </>
  );
};

export default TextToast;
