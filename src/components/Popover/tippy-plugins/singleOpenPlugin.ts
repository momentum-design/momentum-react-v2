import type { Plugin, Instance } from 'tippy.js';

const pluginMap = new Map<string, Plugin>();

/*
 Before this plugin there is a bug with opening multiple selects inside of a popover, where the PopoverParent renders 2 PopoverChildren and clicking on either PopoverChildren, events get swallowed and the other PopoverChild will not close
 this plugin solves this by managing these popovers within a groupID to hide
*/
export const getSingleOpenPlugin = (groupId?: string): Plugin | undefined => {
  if (!groupId) {
    return undefined;
  }

  if (pluginMap.has(groupId)) {
    const plugin = pluginMap.get(groupId);

    return plugin ? plugin : undefined;
  }

  const openTippies = new Set<Instance>();

  const newPlugin: Plugin = {
    name: `singleOpen-${groupId}`,
    fn(instance) {
      return {
        onShow() {
          openTippies.forEach((openInstance) => {
            if (openInstance !== instance) {
              openInstance.hide();
            }
          });

          openTippies.add(instance);
        },
        onHide() {
          openTippies.delete(instance);
        },
      };
    },
  };

  pluginMap.set(groupId, newPlugin);

  return newPlugin;
};
