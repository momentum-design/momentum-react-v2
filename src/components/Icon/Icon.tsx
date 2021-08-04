import React from 'react';
import './Icon.style.scss';
import { Props } from './Icon.types';
import { useDynamicSVGImport } from '../../hooks/useDynamicSVGImport';
import { DEFAULTS, STYLE } from './Icon.constants';
import classnames from 'classnames';

const Icon: React.FC<Props> = (props: Props) => {
  const { className, scale, name, weight, autoScale, fillColor } = props;
  const { SvgIcon, error } = useDynamicSVGImport(`${name}-${weight || DEFAULTS.WEIGHT}`);

  const isColoredIcon = name.indexOf('coloured') > 0;

  if (error) {
    return <p className={STYLE.notFound}>Icon not found.</p>;
  }

  const getFillColor = () => {
    if (fillColor && !isColoredIcon) {
      return { fill: fillColor };
    } else {
      return null;
    }
  };

  if (SvgIcon) {
    return (
      <div className={STYLE.wrapper}>
        <SvgIcon
          // coloured class is added to avoid theming the fixed colours inside coloured icons
          className={classnames(className, { [STYLE.coloured]: isColoredIcon })}
          viewBox="0, 0, 32, 32"
          width="100%"
          height="100%"
          data-scale={!autoScale && (scale || DEFAULTS.SCALE)}
          data-autoscale={autoScale || DEFAULTS.AUTO_SCALE}
          style={getFillColor()}
        />
      </div>
    );
  }

  return null;
};

/**
 * Icon component that can dynamically display SVG icons with a valid name.
 */

export default Icon;
