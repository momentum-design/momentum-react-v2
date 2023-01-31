import React, { FC, useRef, useEffect } from 'react';
import classnames from 'classnames';
import lottie, { AnimationItem } from 'lottie-web';
import { useDynamicJSONImport } from '../../hooks/useDynamicJSONImport';

import { DEFAULTS, STYLE } from './Reaction.constants';
import { Props } from './Reaction.types';
import './Reaction.style.scss';
import LoadingSpinner from '../LoadingSpinner';
import { GLYPH_NOT_FOUND } from '../Icon/Icon.constants';

const Reaction: FC<Props> = (props: Props) => {
  const { autoPlay, className, id, loop, name, size, style, onComplete } = props;
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
  }, [svgContainer, animationData]);

  if (error) {
    console.warn('Reaction load failed:', error);
    return <div className={STYLE.notFound}>{GLYPH_NOT_FOUND}</div>;
  }
  if (animationData) {
    return (
      <div
        className={classnames(className, STYLE.wrapper)}
        data-size={size || DEFAULTS.SIZE}
        id={id}
        ref={svgContainer}
        style={style}
      />
    );
  }
  if (!animationData) {
    return <LoadingSpinner scale={size} />;
  }
};

export default Reaction;
