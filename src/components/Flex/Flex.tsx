import React, { FC } from 'react';
import classnames from 'classnames';

import './Flex.style.scss';
import { Props } from './Flex.types';
import { CLASS_PREFIX, DEFAULTS, STYLE } from './Flex.constants';

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

  const buildClasses = () => {
    return [
      `${CLASS_PREFIX}-direction-${_style.flexDirection}`,
      `${CLASS_PREFIX}-justify-content-${_style.justifyContent}`,
      `${CLASS_PREFIX}-align-items-${_style.alignItems}`,
      `${CLASS_PREFIX}-align-content-${_style.alignContent}`,
      `${CLASS_PREFIX}-${_style.flexWrap}`,
    ];
  };

  return (
    <div
      {...rest}
      id={id}
      data-xgap={_style.flexDirection === 'row' && true}
      data-ygap={_style.flexDirection === 'column' && true}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--flex-xgap-size' as any]: xgap,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['--flex-ygap-size' as any]: ygap,
        ...style,
      }}
      className={classnames(STYLE.wrapper, ...buildClasses(), className)}
    >
      {children}
    </div>
  );
};

/**
 * Utility component which displays children in a flex container.
 */

export default Flex;
