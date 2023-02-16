import type { Plugin } from 'tippy.js';
import { addBackdropPlugin, hideOnEscPlugin } from './tippyPlugins';

export const addTippyPlugins = (hideOnEsc: boolean, addBackdrop: boolean): Array<Plugin> => {
  const plugins = [];
  if (hideOnEsc) {
    plugins.push(hideOnEscPlugin);
  }
  if (addBackdrop) {
    plugins.push(addBackdropPlugin);
  }
  return plugins;
};
