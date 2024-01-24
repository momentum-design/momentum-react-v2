import React, { FC, useRef, useEffect } from 'react';
import classnames from 'classnames';
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light';
import { useDynamicJSONImport } from '../../hooks/useDynamicJSONImport';

import { DEFAULTS, STYLE } from './Reaction.constants';
import { STYLE as ICON_STYLE, GLYPH_NOT_FOUND } from '../Icon/Icon.constants';
import { Props } from './Reaction.types';
import './Reaction.style.scss';
import LoadingSpinner from '../LoadingSpinner';

const Reaction: FC<Props> = (props: Props) => {
  const { autoPlay, className, id, loop, name, size, style, onComplete, ...otherProps } = props;
  const { animationData, error } = useDynamicJSONImport(name);
  const svgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: AnimationItem;
    if (animationData) {
      animation = lottie.loadAnimation({
        container: svgContainer.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: loop,
        autoplay: autoPlay,
        animationData: animationData,
        name,
      });
      if (onComplete) {
        animation.addEventListener('complete', onComplete);
      }
    }
    return () => {
      if (animation) {
        if (onComplete) {
          animation.removeEventListener('complete', onComplete);
        }
        animation.destroy();
      }
    };
  }, [svgContainer, animationData, autoPlay, loop]);

  if (error) {
    return (
      <div data-error={`not-found:${name}`} className={STYLE.notFound}>
        {GLYPH_NOT_FOUND}
      </div>
    );
  }
  if (animationData) {
    return (
      <div
        className={classnames(className, STYLE.wrapper, ICON_STYLE.scales)}
        data-scale={size || DEFAULTS.SIZE}
        data-name={name}
        id={id}
        ref={svgContainer}
        style={style}
        {...otherProps}
      />
    );
  }
  if (!animationData) {
    return <LoadingSpinner scale={size} />;
  }
};

export default Reaction;
