import React, { FC } from 'react';
import classnames from 'classnames';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { GroupProps, Props } from './RadioGroup.types';
import './RadioGroup.style.scss';
import Radio from './Radio';

/**
 * The RadioGroup component.
 */

export const RadioContext = React.createContext(null);

const RadioGroup: FC<GroupProps> = (props: GroupProps) => {
  const { className, label, id, style, options, isDisabled, setValue, orientation, description } =
    props;

  let onChange: (value: string) => void = props.onChange;

  if (setValue) {
    onChange = props.onChange
      ? (value: string) => {
          setValue(value);
          props.onChange(value);
        }
      : setValue;
  }

  const state = useRadioGroupState({ ...props, onChange });
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  const direction = orientation || DEFAULTS.GROUP_ORIENTATION;
  const disabled = isDisabled || DEFAULTS.GROUP_DISABLED;

  return (
    <div
      {...radioGroupProps}
      className={classnames(className, STYLE.group)}
      id={id}
      style={style}
      data-direction={direction}
    >
      <span {...labelProps}>{label || DEFAULTS.GROUP_LABEL}</span>
      {description && <div className={STYLE.description}>{description}</div>}
      <RadioContext.Provider value={state}>
        {options &&
          options.map((option: string | Props) => {
            if (typeof option === 'string') {
              return (
                <Radio key={option} value={option} isDisabled={disabled}>
                  {option}
                </Radio>
              );
            } else {
              return <Radio key={option.value} isDisabled={disabled} {...option} />;
            }
          })}
      </RadioContext.Provider>
    </div>
  );
};

export default RadioGroup;
