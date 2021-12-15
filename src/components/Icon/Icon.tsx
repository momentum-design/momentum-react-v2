import React from 'react';
import './Icon.style.scss';
import { Props } from './Icon.types';
import { useDynamicSVGImport } from '../../hooks/useDynamicSVGImport';
import { COLOR_INHERIT, DEFAULTS, GLYPH_NOT_FOUND, STYLE } from './Icon.constants';
import classnames from 'classnames';

/**
 * Icon component that can dynamically display SVG icons with a valid name.
 */
const Icon: React.FC<Props> = (props: Props) => {
  const { autoScale, className, color, fillColor, id, name, scale, strokeColor, style, weight } =
    props;
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

    if (!styleColors.stroke) {
      inheritedColors.stroke = COLOR_INHERIT;
    }

    return { inheritedColors, styleColors };
  };

  const { inheritedColors, styleColors } = getColors();

  const viewBoxDefault = '0, 0, 32, 32';
  const viewBoxSmall = '0, 0, 14, 14';
  //This exception list is added for Icons with scale 14, so that view box can setup properly
  const exceptionIconsList = [
    'check-circle-badge',
    'error-legacy-badge',
    'info-badge',
    'priority-badge',
  ];

  if (SvgIcon) {
    return (
      <div className={classnames(STYLE.wrapper, className)} id={id} style={style}>
        <SvgIcon
          // coloured class is added to avoid theming the fixed colours inside coloured icons
          data-test={name}
          className={classnames({ [STYLE.coloured]: isColoredIcon })}
          style={{ ...styleColors }}
          {...inheritedColors}
          viewBox={exceptionIconsList.includes(name) ? viewBoxSmall : viewBoxDefault}
          width="100%"
          height="100%"
          data-scale={!autoScale && (scale || DEFAULTS.SCALE)}
          data-autoscale={autoScale || DEFAULTS.AUTO_SCALE}
        />
      </div>
    );
  }

  return null;
};

export default Icon;
