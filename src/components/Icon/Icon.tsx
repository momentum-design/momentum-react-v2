import classnames from 'classnames';
import React from 'react';

import './Icon.style.scss';
import { useDynamicSVGImport } from 'hooks/useDynamicSVGImport';

import {
  COLOR_INHERIT,
  DEFAULTS,
  EXCEPTION_ICONS_LIST,
  GLYPH_NOT_FOUND,
  STYLE,
  VIEW_BOX_SPECS,
} from './Icon.constants';
import { Props } from './Icon.types';

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
    ...otherProps
  } = props;
  const { SvgIcon, error } = useDynamicSVGImport(`${name}-${weight || DEFAULTS.WEIGHT}`);

  const isColoredIcon = name.indexOf('coloured') > 0;

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

  if (SvgIcon) {
    return (
      <div className={classnames(STYLE.wrapper, className)} id={id} style={style} title={title}>
        <SvgIcon
          // coloured class is added to avoid theming the fixed colours inside coloured icons
          data-test={name}
          className={classnames({ [STYLE.coloured]: isColoredIcon })}
          style={{ ...styleColors }}
          {...inheritedColors}
          viewBox={
            EXCEPTION_ICONS_LIST.includes(name) ? VIEW_BOX_SPECS.SMALL : VIEW_BOX_SPECS.NORMAL
          }
          width="100%"
          height="100%"
          data-scale={!autoScale && (scale || DEFAULTS.SCALE)}
          data-autoscale={autoScale || DEFAULTS.AUTO_SCALE}
          {...otherProps}
        />
      </div>
    );
  }

  return null;
};

export default Icon;
