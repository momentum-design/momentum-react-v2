import React, { FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, SIDES, STYLE } from './ModalArrow.constants';
import { Props } from './ModalArrow.types';
import './ModalArrow.style.scss';

/**
 * The ModalArrow component. This is designed to be strictly consumed by the ModalContainer component.
 */
const ModalArrow: FC<Props> = (props: Props) => {
  const { className, color, id, side, style } = props;

  // Point Reference.
  const pr = {
    end: '',
    start: '',
    tipEnd: '',
    tipPeak: '',
    tipStart: '',
  };

  const isVertical = side === SIDES.TOP || side === SIDES.BOTTOM;

  switch (side) {
    case SIDES.BOTTOM:
      pr.start = '24 0';
      pr.tipStart = '-10 10';
      pr.tipPeak = '-2 2';
      pr.tipEnd = '-4 0';
      pr.end = '-10 -10';
      break;

    case SIDES.LEFT:
      pr.start = '12 24';
      pr.tipStart = '-10 -10';
      pr.tipPeak = '-2 -2';
      pr.tipEnd = '0 -4';
      pr.end = '10 -10';
      break;

    case SIDES.RIGHT:
      pr.start = '0 0';
      pr.tipStart = '10 10';
      pr.tipPeak = '2 2';
      pr.tipEnd = '0 4';
      pr.end = '-10 10';
      break;

    case SIDES.TOP:
      pr.start = '0 12';
      pr.tipStart = '10 -10';
      pr.tipPeak = '2 -2';
      pr.tipEnd = '4 0';
      pr.end = '10 10';
      break;
  }

  const pathData = `m ${pr.start} l ${pr.tipStart} q ${pr.tipPeak} ${pr.tipEnd} l ${pr.end}`;

  const viewBoxHeight = isVertical ? 12 : 24;
  const viewBoxWidth = isVertical ? 24 : 12;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

  return (
    <svg
      className={classnames(STYLE.wrapper, className)}
      id={id}
      style={style}
      xmlns="http://www.w3.org/svg/2000"
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={viewBox}
      data-side={side}
    >
      <defs>
        <clipPath id={`modal-arrow-cut-stroke-${side}`}>
          <path d={pathData} />
        </clipPath>
      </defs>

      <path
        data-color={color || DEFAULTS.COLOR}
        clipPath={`url(#modal-arrow-cut-stroke-${side})`}
        d={pathData}
      />
    </svg>
  );
};

export default ModalArrow;
