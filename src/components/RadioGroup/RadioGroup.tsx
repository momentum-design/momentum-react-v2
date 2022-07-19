import React, { FC, ReactElement, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useRadioGroup, useRadio } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE } from './RadioGroup.constants';
import { GroupProps, Props, RadioValue } from './RadioGroup.types';
import './RadioGroup.style.scss';

// TODO: Update JSDOC for this component.
/**
 * The RadioGroup component.
 */

export const RadioContext = React.createContext(null);

const RadioGroup: FC<GroupProps> = (props: GroupProps) => {
  const { className, label, children, id, style } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  let childElement: ReactElement;
  if (React.isValidElement(children)) {
    childElement = children;
  } else if (Array.isArray(children)) {
    childElement = (
      <>
        {children.map((child: string | RadioValue) => {
          if (typeof child === 'string') {
            return <Radio value={child}>{child}</Radio>;
          } else {
            return <Radio value={child.value}>{child.child}</Radio>;
          }
        })}
      </>
    );
  }

  return (
    <div
      {...radioGroupProps}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
    >
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>{childElement}</RadioContext.Provider>
    </div>
  );
};

const Radio: FC<Props> = (props: Props) => {
  const { children } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio(props, state, ref);
  return (
    <label style={{ display: 'block' }}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  );
};

export default RadioGroup;
export { RadioGroup, Radio };
