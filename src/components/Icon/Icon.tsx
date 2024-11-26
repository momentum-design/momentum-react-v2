import React from 'react';
import './Icon.style.scss';
import { Props } from './Icon.types';
import { useDynamicSVGImport } from '../../hooks/useDynamicSVGImport';
import {
  COLOR_INHERIT,
  DEFAULTS,
  EXCEPTION_ICONS_LIST,
  GLYPH_NOT_FOUND,
  STYLE,
  VIEW_BOX_SPECS,
} from './Icon.constants';
import classnames from 'classnames';
import { getResolvedSVGName } from './Icon.utils';
import Tooltip from '../Tooltip';

/**
 * Icon component that can dynamically display SVG icons with a valid name.
 */
const Icon: React.FC<Props> = (props: Props) => {
  const {
    autoScale,
    className,
    color,
    fillColor,
    id,
    name,
    scale,
    strokeColor,
    style,
    title,
    weight,
    weightless = DEFAULTS.WEIGHTLESS,
    ariaLabel,
    tooltipProps,
    ...otherProps
  } = props;
  const resolvedSVGName = getResolvedSVGName(name, weight, weightless);
  const { SvgIcon, error } = useDynamicSVGImport(resolvedSVGName);

  const isColoredIcon = /-colou?red$/.test(name as string);

  if (error) {
    console.warn('Icon load failed:', error);
    return (
      <div className={STYLE.wrapper} id={id} style={style}>
        <div
          className={STYLE.notFound}
          data-scale={!autoScale && (scale || DEFAULTS.SCALE)}
          data-autoscale={autoScale || DEFAULTS.AUTO_SCALE}
        >
          {GLYPH_NOT_FOUND}
        </div>
      </div>
    );
  }

  if (!SvgIcon) {
    return null;
  }

  const getColors = () => {
    const inheritedColors: { fill?: string; stroke?: string } = {};
    const styleColors: { fill?: string; stroke?: string } = {};

    if (!isColoredIcon) {
      if (fillColor) {
        styleColors.fill = fillColor;
      }

      if (strokeColor) {
        styleColors.stroke = strokeColor;
      }

      if (color) {
        styleColors.fill = color;
        styleColors.stroke = color;
      }
    }

    if (!styleColors.fill) {
      inheritedColors.fill = COLOR_INHERIT;
    }

    return { inheritedColors, styleColors };
  };

  const { inheritedColors, styleColors } = getColors();

  const accessibleName = ariaLabel || otherProps['aria-label'] || title;

  delete otherProps['aria-label'];

  const isTooltipWrapped = tooltipProps?.children;

  const content = (
    <div
      className={classnames(STYLE.wrapper, STYLE.autoScales, STYLE.scales, className, {
        [STYLE.noShrink]: scale,
      })}
      id={id}
      style={style}
      title={title}
      role="img"
      aria-label={isTooltipWrapped ? undefined : accessibleName}
      aria-hidden={!accessibleName && !isTooltipWrapped}
      // icon must be focusable to trigger the tooltip
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={isTooltipWrapped ? 0 : undefined}
    >
      <SvgIcon
        // coloured class is added to avoid theming the fixed colours inside coloured icons
        data-test={name}
        className={classnames({ [STYLE.coloured]: isColoredIcon })}
        aria-hidden="true"
        style={{ ...styleColors }}
        {...inheritedColors}
        viewBox={EXCEPTION_ICONS_LIST.includes(name) ? VIEW_BOX_SPECS.SMALL : VIEW_BOX_SPECS.NORMAL}
        width="100%"
        height="100%"
        data-scale={!autoScale && (scale || DEFAULTS.SCALE)}
        data-autoscale={autoScale || DEFAULTS.AUTO_SCALE}
        {...otherProps}
      />
    </div>
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

export default Icon;
