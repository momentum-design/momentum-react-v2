import React from 'react';
import './Icon.style.scss';
import { Props } from './Icon.types';
import { useDynamicSVGImport } from '../../hooks/useDynamicSVGImport';
import { DEFAULTS, STYLE } from './Icon.constants';
import classnames from 'classnames';
const Icon: React.FC<Props> = (props: Props) => {
  const { className, scale, name, weight = DEFAULTS.WEIGHT } = props;
  const { SvgIcon, error } = useDynamicSVGImport(`${name}-${weight}`);

  if (error) {
    return <p className={STYLE.notFound}>Icon not found.</p>;
  }

  if (SvgIcon) {
    return (
      <div className={STYLE.wrapper}>
        <SvgIcon
          className={classnames(className, { "coloured" : name.indexOf("coloured") > 0})}
          viewBox="0, 0, 32, 32"
          width="100%"
          height="100%"
          data-scale={scale || DEFAULTS.SCALE}
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
