import React, { FC, useContext, useRef, useState } from 'react';
import { FocusRing } from '@react-aria/focus';
import { useRadio } from '@react-aria/radio';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { RadioProps } from './RadioGroup.types';
import { RadioContext } from './RadioGroup';

import Text from '../Text';

import './RadioGroup.style.scss';

const Radio: FC<RadioProps> = (props: RadioProps) => {
  const { className, isDisabled = DEFAULTS.OPTION_DISABLED, id, description, style, label } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);

  const [radioUuid] = useState(uuidv4);
  const radioId = id || radioUuid;

  const radioProps = {
    'aria-label': label,
    ...(description ? { 'aria-describedby': `radio-description-${radioId}` } : {}),
    ...props,
  };
  const { inputProps } = useRadio(radioProps, state, ref);

  // remove id from input to only apply it to the label
  delete inputProps.id;

  return (
    <div data-disabled={isDisabled} className={classnames(STYLE.wrapper, className)} style={style}>
      <label id={radioId} className={STYLE.label}>
        <FocusRing>
          <input {...inputProps} className={STYLE.button} ref={ref} />
        </FocusRing>
        {label}
      </label>
      {description && (
        <Text
          tagName="small"
          type="body-secondary"
          className={STYLE.radioDescription}
          id={`radio-description-${radioId}`}
        >
          {description}
        </Text>
      )}
    </div>
  );
};

export default Radio;
