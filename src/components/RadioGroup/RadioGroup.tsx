import React, { FC } from 'react';
import classnames from 'classnames';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { RadioGroupProps, RadioProps } from './RadioGroup.types';
import './RadioGroup.style.scss';
import Radio from './Radio';
import Text, { TEXT_CONSTANTS } from '../Text';

/**
 * The RadioGroup component.
 */
export const RadioContext = React.createContext(null);

const RadioGroup: FC<RadioGroupProps> = (props: RadioGroupProps) => {
  const {
    className,
    description = DEFAULTS.GROUP_DESCRIPTION,
    id,
    isDisabled = DEFAULTS.GROUP_DISABLED,
    label = DEFAULTS.GROUP_LABEL,
    options,
    style,
    ariaDescribedby,
  } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div
      {...radioGroupProps}
      className={classnames(className, STYLE.group)}
      id={id} style={style}
      aria-describedby={ariaDescribedby}
    >
      <span {...labelProps}>{label}</span>
      {description && <Text type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}>{description}</Text>}
      <RadioContext.Provider value={state}>
        {options &&
          options.map((option: string | RadioProps) => {
            if (typeof option === 'string') {
              return <Radio key={option} value={option} isDisabled={isDisabled} label={option} />;
            } else {
              return <Radio key={option.value} isDisabled={isDisabled} {...option} />;
            }
          })}
      </RadioContext.Provider>
    </div>
  );
};

export default RadioGroup;
