import React, { FC, ReactNode } from 'react';
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
  const { className, label, children, id, style, options, isDisabled, orientation, description } =
    props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  const direction = orientation || DEFAULTS.GROUP_ORIENTATION;
  const disabled = isDisabled || DEFAULTS.GROUP_DISABLED;

  let childElement: ReactNode;
  if (children) {
    childElement = children;
  } else if (Array.isArray(options)) {
    childElement = (
      <>
        {options.map((option: string | Props) => {
          if (typeof option === 'string') {
            return (
              <Radio key={option} value={option} isDisabled={disabled}>
                {option}
              </Radio>
            );
          } else if (React.isValidElement(option)) {
            return option;
          } else {
            const value = option.value;
            return <Radio key={value} isDisabled={disabled} {...option} />;
          }
        })}
      </>
    );
  }

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
      <RadioContext.Provider value={state}>{childElement}</RadioContext.Provider>
    </div>
  );
};

export default RadioGroup;
