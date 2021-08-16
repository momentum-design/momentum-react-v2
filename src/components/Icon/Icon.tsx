import React from 'react';
import './Icon.style.scss';
import { Props } from './Icon.types';
import { useDynamicSVGImport } from '../../hooks/useDynamicSVGImport';
import { DEFAULTS, GLYPH_NOT_FOUND, STYLE } from './Icon.constants';
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
    if (!isColoredIcon) {
      const style: Record<string, string> = {};

      if (fillColor) {
        style.fill = fillColor;
      }

      if (strokeColor) {
        style.stroke = strokeColor;
      }

      if (color) {
        style.fill = color;
        style.stroke = color;
      }

      return style;
    }

    return null;
  };

  if (SvgIcon) {
    return (
      <div className={classnames(STYLE.wrapper, className)} id={id} style={style}>
        <SvgIcon
          // coloured class is added to avoid theming the fixed colours inside coloured icons
          className={classnames({ [STYLE.coloured]: isColoredIcon })}
          style={{ ...getColors() }}
          stroke="currentColor"
          fill="currentColor"
          viewBox="0, 0, 32, 32"
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
