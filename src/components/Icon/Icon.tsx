import React from 'react';
import './Icon.style.scss';
import { Props } from './Icon.types';
import { DEFAULTS, STYLE } from './Icon.constants';
import classnames from 'classnames';
import { getResolvedSVGName } from './Icon.utils';
import Tooltip from '../Tooltip';
import { Icon as MdcIcon } from '@momentum-design/components/dist/react';
import type IconKeys from '@momentum-design/icons/dist/types/types';

/**
 * Icon component that can dynamically display SVG icons with a valid name.
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const Icon: React.FC<Props> = (props: Props) => {
  const {
    autoScale,
    className,
    id,
    name,
    scale,
    style,
    title,
    weight,
    weightless = DEFAULTS.WEIGHTLESS,
    ariaLabel,
    tooltipProps,
    fillColor,
    ...otherProps
  } = props;
  const resolvedSVGName = getResolvedSVGName(name, weight, weightless);

  const accessibleName = ariaLabel || otherProps['aria-label'] || title;

  delete otherProps['aria-label'];

  const isTooltipWrapped = tooltipProps?.children;

  const fillColorStyle = fillColor ? { '--mdc-icon-fill-color': fillColor } : {};

  const content = (
    <MdcIcon
      className={classnames(
        STYLE.wrapper,
        STYLE.autoScales,
        STYLE.scales,
        STYLE.noShrink,
        className
      )}
      data-test={name}
      data-scale={!autoScale && scale}
      data-autoscale={autoScale || DEFAULTS.AUTO_SCALE}
      name={resolvedSVGName as IconKeys}
      aria-label={isTooltipWrapped ? undefined : accessibleName}
      tabIndex={isTooltipWrapped ? 0 : undefined}
      style={{ ...fillColorStyle, ...style }}
      id={id}
      {...otherProps}
    />
  );

  return isTooltipWrapped ? (
    <Tooltip
      placement="top"
      strategy="fixed"
      type="label"
      triggerComponent={content}
      {...tooltipProps}
    />
  ) : (
    content
  );
};

Icon.displayName = 'Mrv2Icon';

export default Icon;
