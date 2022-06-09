import classnames from 'classnames';
import React, { FC } from 'react';

import Icon from 'components/Icon';
import Text from 'components/Text';

import { DEFAULTS, STYLE } from './TextToast.constants';
import { Props } from './TextToast.types';
import './TextToast.style.scss';

/**
 * The `<TextToast />` component. This component is designed to retrieve props like the `text` to display and the `textAlignment`, which can be `center` or `left` at the moment.
 * If no or an empty `text` is passed in, the component will not be rendered. If no `textAlignment` is passed in, the default alignment will be `center`.
 * Also the `iconProps` from the `Icon` component can be passed in to render a Icon on the left-hand side of the text.
 */
const TextToast: FC<Props> = (props: Props) => {
  const { text, textAlignment = DEFAULTS.ALIGNMENT, iconProps, className, id, style } = props;

  return (
    <>
      {text?.length > 0 && (
        <div
          className={classnames(className, STYLE.wrapper)}
          id={id}
          data-text-alignment={textAlignment}
          style={style}
        >
          {iconProps && iconProps.name && <Icon {...iconProps} />}
          <Text type="body-secondary" className={classnames(STYLE.text)}>
            {text}
          </Text>
        </div>
      )}
    </>
  );
};

export default TextToast;
