import React, { FC } from 'react';
import classnames from 'classnames';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { GroupProps, Props } from './RadioGroup.types';
import './RadioGroup.style.scss';
import Radio from './Radio';
import Text, { TEXT_CONSTANTS } from '../Text';

/**
 * The RadioGroup component.
 */
export const RadioContext = React.createContext(null);

const RadioGroup: FC<GroupProps> = (props: GroupProps) => {
  const {
    className,
    description = DEFAULTS.GROUP_DESCRIPTION,
    id,
    isDisabled = DEFAULTS.GROUP_DISABLED,
    label = DEFAULTS.GROUP_LABEL,
    options,
    setValue,
    style,
  } = props;

  const onChange = (value: string) => {
    setValue?.(value);
  };

  const state = useRadioGroupState({ ...props, onChange });
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className={classnames(className, STYLE.group)} id={id} style={style}>
      <span {...labelProps}>{label}</span>
      {description && <Text type={TEXT_CONSTANTS.TYPES.BODY_SECONDARY}>{description}</Text>}
      <RadioContext.Provider value={state}>
        {options &&
          options.map((option: string | Props) => {
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
