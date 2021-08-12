import React, { CSSProperties, FC } from 'react';
import classnames from 'classnames';

import './Flex.style.scss';
import { Props } from './Flex.types';
import { DEFAULTS, STYLE } from './Flex.constants';

const Flex: FC<Props> = (props: Props) => {
  const {
    className,
    children,
    xgap,
    ygap,
    direction,
    justifyContent,
    alignItems,
    alignContent,
    ...rest
  } = props;
  const style: CSSProperties = {
    flexDirection: direction || 'row',
    justifyContent: justifyContent || 'start',
    alignItems: alignItems || 'start',
    alignContent: alignContent || 'start',
  };
  return (
    <div
      {...rest}
      data-xgap={style.flexDirection === 'row' && true}
      data-ygap={style.flexDirection === 'column' && true}
      style={{
        display: 'flex',
        ...style,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--flex-xgap-size' as any]: xgap,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--flex-ygap-size' as any]: ygap,
      }}
      className={classnames(className, STYLE.wrapper)}
    >
      {children}
    </div>
  );
};

/**
 * TODO: Add description of component here.
 */

export default Flex;
