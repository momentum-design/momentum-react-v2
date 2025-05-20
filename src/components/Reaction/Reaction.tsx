import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import classnames from 'classnames';

import { STYLE, GLYPH_NOT_FOUND, DEFAULTS } from './Reaction.constants';
import { STYLE as ICON_STYLE } from '../Icon/Icon.constants';
import { AnimationLoadingState, Props } from './Reaction.types';
import './Reaction.style.scss';
import LoadingSpinner from '../LoadingSpinner';
import { Animation as MdcAnimation } from '@momentum-design/components/dist/react';

const Reaction: FC<Props> = (props: Props) => {
  const {
    autoPlay,
    className,
    id,
    loop,
    name,
    style,
    onComplete,
    size,
    hideLoadingSpinner = DEFAULTS.HIDE_LOADING_SPINNER,
    ...otherProps
  } = props;

  const [loadingState, setLoadingState] = useState<AnimationLoadingState>('loading');

  const onLoad = useCallback(() => setLoadingState('loaded'), []);
  const onError = useCallback(() => setLoadingState('error'), []);

  // useEffect runs after dynamic import is resolved and sets the wrong state when
  // the component rendered with the first animation
  useLayoutEffect(() => setLoadingState('loading'), [name]);

  return (
    <div
      className={classnames(className, STYLE.wrapper, ICON_STYLE.scales, STYLE[loadingState])}
      data-scale={size || DEFAULTS.SIZE}
      style={style}
    >
      <MdcAnimation
        name={name}
        loop={loop}
        autoplay={autoPlay}
        onLoad={onLoad}
        onError={onError}
        onComplete={onComplete}
        data-name={name}
        id={id}
        {...otherProps}
      />

      {!hideLoadingSpinner && loadingState === 'loading' && (
        <LoadingSpinner
          scale={Math.min(Number(size) || DEFAULTS.SIZE, DEFAULTS.SIZE)}
          aria-hidden
          variant="button"
        />
      )}

      {loadingState === 'error' && (
        <div data-error={`not-found:${name}`} className={STYLE.notFound}>
          {GLYPH_NOT_FOUND}
        </div>
      )}
    </div>
  );
};

export default Reaction;
