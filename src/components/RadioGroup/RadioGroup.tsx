import React, { FC } from 'react';
import classnames from 'classnames';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { RadioGroupProps, RadioProps, RadioSimpleProps } from './RadioGroup.types';
import './RadioGroup.style.scss';
import Radio from './Radio';
import RadioSimple from './RadioSimple';
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
    isRadioSimple = DEFAULTS.GROUP_IS_RADIO_SIMPLE,
  } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup({...props}, state);

  return (
    <div {...radioGroupProps} className={classnames(className, STYLE.group)} id={id} style={style}>
      {label && <span {...labelProps}>{label}</span>}
      {description && <Text type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}>{description}</Text>}
      <RadioContext.Provider value={state}>
        {options &&
          options.map((option: string | RadioProps | RadioSimpleProps) => {
            if (isRadioSimple) {
              return (
                <RadioSimple
                  isDisabled={isDisabled}
                  value={option.value}
                >
                  {option}
                </RadioSimple>
              );
            } else if (typeof option === 'string') {
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
