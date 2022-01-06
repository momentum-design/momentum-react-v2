import React, { RefObject } from 'react';
import classnames from 'classnames';
import { DEFAULTS, PLACEMENTS, STYLE } from './Arrow.constants';
import './Popover.style.scss';
import type { Props } from './Arrow.types';

/**
 * The Arrow component.
 */
const Arrow = React.forwardRef((props: Props, ref: RefObject<SVGSVGElement>) => {
  const { className, color, id, placement = PLACEMENTS.BOTTOM, style } = props;

  // Point Reference.
  const pr = {
    end: '',
    start: '',
    tipEnd: '',
    tipPeak: '',
    tipStart: '',
  };

  const isVertical =
    placement.startsWith(PLACEMENTS.TOP) || placement.startsWith(PLACEMENTS.BOTTOM);

  switch (placement) {
    case PLACEMENTS.BOTTOM:
    case PLACEMENTS.BOTTOM_START:
    case PLACEMENTS.BOTTOM_END:
      pr.start = '0 12';
      pr.tipStart = '10 -10';
      pr.tipPeak = '2 -2';
      pr.tipEnd = '4 0';
      pr.end = '10 10';
      break;

    case PLACEMENTS.LEFT:
    case PLACEMENTS.LEFT_START:
    case PLACEMENTS.LEFT_END:
      pr.start = '0 0';
      pr.tipStart = '10 10';
      pr.tipPeak = '2 2';
      pr.tipEnd = '0 4';
      pr.end = '-10 10';
      break;

    case PLACEMENTS.RIGHT:
    case PLACEMENTS.RIGHT_START:
    case PLACEMENTS.RIGHT_END:
      pr.start = '12 24';
      pr.tipStart = '-10 -10';
      pr.tipPeak = '-2 -2';
      pr.tipEnd = '0 -4';
      pr.end = '10 -10';
      break;

    case PLACEMENTS.TOP:
    case PLACEMENTS.TOP_START:
    case PLACEMENTS.TOP_END:
      pr.start = '24 0';
      pr.tipStart = '-10 10';
      pr.tipPeak = '-2 2';
      pr.tipEnd = '-4 0';
      pr.end = '-10 -10';
      break;
  }

  const pathData = `m ${pr.start} l ${pr.tipStart} q ${pr.tipPeak} ${pr.tipEnd} l ${pr.end}`;

  const viewBoxHeight = isVertical ? 12 : 24;
  const viewBoxWidth = isVertical ? 24 : 12;
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

  return (
    <svg
      id={id}
      ref={ref}
      className={classnames(STYLE.svg, className)}
      style={style}
      xmlns="http://www.w3.org/svg/2000"
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={viewBox}
      data-side={placement}
    >
      <defs>
        <clipPath id={`popover-arrow-cut-stroke-${placement}`}>
          <path d={pathData} />
        </clipPath>
      </defs>

      <path
        data-color={color || DEFAULTS.COLOR}
        clipPath={`url(#popover-arrow-cut-stroke-${placement})`}
        d={pathData}
      />
    </svg>
  );
});

Arrow.displayName = 'Arrow';
export default Arrow;
