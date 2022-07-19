import React, { FC, ReactElement, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useRadioGroup, useRadio } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { GroupProps, Props } from './RadioGroup.types';
import './RadioGroup.style.scss';
import { useFocusRing, VisuallyHidden } from 'react-aria';

import Icon from '../Icon';

// TODO: Update JSDOC for this component.
/**
 * The RadioGroup component.
 */

export const RadioContext = React.createContext(null);

const RadioGroup: FC<GroupProps> = (props: GroupProps) => {
  const { className, label, children, id, style, options, isDisabled, orientation } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  const direction = orientation || DEFAULTS.GROUP_ORIENTATION;
  const disabled = isDisabled || DEFAULTS.GROUP_DISABLED;

  let childElement: ReactElement;
  if (React.isValidElement(children)) {
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
          } else {
            const value = option.value;
            return <Radio key={value} {...option} isDisabled={disabled} />;
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
      <RadioContext.Provider value={state}>{childElement}</RadioContext.Provider>
    </div>
  );
};

// Where should passed style, id, and className go?

const Radio: FC<Props> = (props: Props) => {
  const { className, children, isDisabled, id, style } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const selected = state.selectedValue === props.value;
  const disabled = isDisabled || DEFAULTS.OPTION_DISABLED;

  const icon = <Icon className={STYLE.icon} name="shape-circle" weight="filled" scale={8} />;

  const radio = (
    <div
      className={classnames(
        {
          [STYLE.selected]: selected,
          [STYLE.notSelected]: !selected,
          [STYLE.focus]: isFocusVisible,
        },
        'radio'
      )}
    >
      {selected && icon}
    </div>
  );

  return (
    <label
      data-disabled={disabled}
      className={classnames(STYLE.wrapper, className)}
      style={style}
      id={id}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {radio}
      {children}
    </label>
  );
};

export default RadioGroup;
export { RadioGroup, Radio };
