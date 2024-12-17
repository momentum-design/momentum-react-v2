import type { Plugin } from 'tippy.js';
import { hideOnEscPlugin } from './tippy-plugins/hideOnEscPlugin';
import { addBackdropPlugin } from './tippy-plugins/backdropPlugin';
import { hideOnBlurPlugin } from './tippy-plugins/hideOnBlurPlugin';
import { getSingleOpenPlugin } from './tippy-plugins/singleOpenPlugin';

export const addTippyPlugins = (
  hideOnEsc: boolean,
  hideOnBlur: boolean,
  addBackdrop: boolean,
  singleOpenGroupId?: string
): Array<Plugin> => {
  const plugins = [];
  if (hideOnEsc) {
    plugins.push(hideOnEscPlugin);
  }
  if (addBackdrop) {
    plugins.push(addBackdropPlugin);
  }
  if (hideOnBlur) {
    plugins.push(hideOnBlurPlugin);
  }
  if (singleOpenGroupId) {
    plugins.push(getSingleOpenPlugin(singleOpenGroupId));
  }
  return plugins;
};
