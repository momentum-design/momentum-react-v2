import React, { FC, useRef, useEffect } from 'react';
import classnames from 'classnames';
import lottie from 'lottie-web';
import { useDynamicJSONImport } from '../../hooks/useDynamicJSONImport';

import Icon from '../Icon';
import { DEFAULTS, STYLE } from './Reaction.constants';
import { Props } from './Reaction.types';
import './Reaction.style.scss';

const Reaction: FC<Props> = (props: Props) => {
  const { autoPlay, className, id, loop, name, size, style } = props;
  const { animationData, loading, error } = useDynamicJSONImport(name);
  const svgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationData) {
      lottie.loadAnimation({
        container: svgContainer.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: loop,
        autoplay: autoPlay,
        animationData: animationData,
      });
    }
  });

  if (error) {
    return <Icon name={'warning'} scale={16} />;
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
  if (loading) {
    // TODO: revisit this
    return <Icon name={'spinner'} scale={16} />;
  } else {
    // TODO: im not sure how this can possibly happen, but maybe?
    return <Icon name={'warning'} scale={16} />;
  }
};

export default Reaction;
