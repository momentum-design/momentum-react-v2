import type { Plugin } from 'tippy.js';
import { hideOnEscPlugin } from './tippy-plugins/hideOnEscPlugin';
import { addBackdropPlugin } from './tippy-plugins/backdropPlugin';

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
