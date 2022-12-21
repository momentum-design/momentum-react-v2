import type { Plugin } from 'tippy.js';
import { addBackdropPlugin, hideOnEscPlugin } from './tippyPlugins';

export const addTippyPlugins = (hideOnEsc: boolean, addBackdrop: boolean): Array<Plugin> => {
  if (hideOnEsc && addBackdrop) {
    return [hideOnEscPlugin, addBackdropPlugin];
  } else if (hideOnEsc) {
    return [hideOnEscPlugin];
  } else if (addBackdrop) {
    return [addBackdropPlugin];
  }
  return [];
};
