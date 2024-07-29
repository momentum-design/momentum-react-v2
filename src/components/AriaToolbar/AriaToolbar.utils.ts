import React, { useContext } from 'react';
import { AriaToolbarContextValue } from './AriaToolbar.types';

export const AriaToolbarContext = React.createContext<AriaToolbarContextValue>(null);

export const useAriaToolbarContext = (): AriaToolbarContextValue => useContext(AriaToolbarContext);
