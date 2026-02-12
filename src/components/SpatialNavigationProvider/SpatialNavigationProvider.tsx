/* eslint-disable react/prop-types */
import React, { FC, useEffect, useMemo } from 'react';
import { SpatialNavigationContext } from './SpatialNavigationProvider.utils';
import { Props } from './SpatialNavigationProvider.types';
import { DEFAULTS } from './SpatialNavigationProvider.constants';
import { setupHideOnPlugin } from '../Popover/tippy-plugins/hideOnEscPlugin';
import { SpatialNavigation } from './SpatialNavigation';

/**
 * Spatial Navigation Provider
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const SpatialNavigationProvider: FC<Props> = ({
  children,
  onGoBack,
  navigationKeyMapping = DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING,
}) => {
  const spatial = useMemo(() => new SpatialNavigation(onGoBack), [onGoBack]);
  const value = useMemo(
    () => ({
      ...navigationKeyMapping,
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
    setupHideOnPlugin({ hideKeys: [navigationKeyMapping.back], stopEventPropagation: true });
  });

  useEffect(() => {
    const validKeys = [
      navigationKeyMapping.up,
      navigationKeyMapping.down,
      navigationKeyMapping.left,
      navigationKeyMapping.right,
      navigationKeyMapping.back,
    ];
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.shiftKey || evt.ctrlKey || evt.altKey || evt.metaKey || !validKeys.includes(evt.key))
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
        case navigationKeyMapping.back:
          return spatial.goBack();
      }
    };

    const handleFocus = (evt: FocusEvent) => {
      if (evt.target instanceof HTMLElement) {
        spatial.setActiveElement(evt.target);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focus', handleFocus);
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focus', handleFocus);
    };
  }, [navigationKeyMapping, spatial, value.back, value.directionKeys]);

  return (
    <SpatialNavigationContext.Provider value={value}>{children}</SpatialNavigationContext.Provider>
  );
};

export default SpatialNavigationProvider;
