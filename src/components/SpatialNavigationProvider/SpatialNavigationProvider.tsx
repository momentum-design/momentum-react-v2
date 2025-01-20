/* eslint-disable react/prop-types */
import React, { FC, useEffect, useMemo } from 'react';
import { SpatialNavigationContext } from './SpatialNavigationProvider.utils';
import { Props } from './SpatialNavigationProvider.types';
import { DEFAULTS } from './SpatialNavigationProvider.constants';
import { setHideKeys } from '../Popover/tippy-plugins/hideOnEscPlugin';
import { SpatialNavigation } from './SpatialNavigation';

/**
 * Spatial Navigation Provider
 */
const SpatialNavigationProvider: FC<Props> = ({
  children,
  navigationKeyMapping = DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING,
}) => {
  const spatial = useMemo(() => new SpatialNavigation(), []);
  const value = useMemo(
    () => ({
      enterKey: navigationKeyMapping.enter,
      backKey: navigationKeyMapping.back,
      directionKeys: [
        navigationKeyMapping.up,
        navigationKeyMapping.down,
        navigationKeyMapping.left,
        navigationKeyMapping.right,
      ],
    }),
    [navigationKeyMapping]
  );

  // Initialize and dispose the spatial navigation
  useEffect(() => {
    spatial.initActiveElement();

    return () => spatial.dispose();
  }, [spatial]);

  /**
   * Setup other components
   */
  useEffect(() => {
    setHideKeys([navigationKeyMapping.back]);
  });

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (
        evt.shiftKey ||
        evt.ctrlKey ||
        evt.altKey ||
        evt.metaKey ||
        !value.directionKeys.includes(evt.key)
      )
        return;
      if (evt.target instanceof HTMLElement) {
        spatial.setActiveElement(evt.target);
      }

      switch (evt.key) {
        case navigationKeyMapping.up:
          return spatial.focusNext('up');
        case navigationKeyMapping.down:
          return spatial.focusNext('down');
        case navigationKeyMapping.left:
          return spatial.focusNext('left');
        case navigationKeyMapping.right:
          return spatial.focusNext('right');
      }
    };

    const handleFocus = (evt: FocusEvent) => {
      if (evt.target instanceof HTMLElement) {
        spatial.setActiveElement(evt.target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focus', handleFocus);
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleFocus);
    };
  }, [navigationKeyMapping, spatial, value.directionKeys]);

  return (
    <SpatialNavigationContext.Provider value={value}>{children}</SpatialNavigationContext.Provider>
  );
};

export default SpatialNavigationProvider;
