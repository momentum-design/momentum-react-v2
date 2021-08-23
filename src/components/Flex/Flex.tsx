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
    wrap,
    style,
    id,
    ...rest
  } = props;
  const _style = {
    flexDirection: direction || DEFAULTS.DIRECTION,
    justifyContent: justifyContent || DEFAULTS.JUSTIFY_CONTENT,
    alignItems: alignItems || DEFAULTS.ALIGN_ITEMS,
    alignContent: alignContent || DEFAULTS.ALIGN_CONTENT,
    flexWrap: wrap || 'nowrap',
  };
  return (
    <div
      {...rest}
      id={id}
      data-xgap={_style.flexDirection === 'row' && true}
      data-ygap={_style.flexDirection === 'column' && true}
      style={{
        display: 'flex',
        ...(_style as CSSProperties),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--flex-xgap-size' as any]: xgap,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--flex-ygap-size' as any]: ygap,
        ...style,
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
