import { useEffect } from 'react';

import { STYLE, TREE_NAVIGATION_KEYS } from './Tree.constants';
import { UseVirtualTreeNavigationProps } from './Tree.types';
import './Tree.style.scss';
import { getKeyboardFocusableElements } from '../../utils/navigation';
import { NODE_ID_ATTRIBUTE_NAME, NODE_ID_DATA_NAME } from '../TreeNodeBase/TreeNodeBase.constants';

/**
 * Handle DOM changes for virtual tree
 *
 * @param props
 * @internal
 */
export const useVirtualTreeNavigation = ({
  virtualTreeConnector,
  treeRef,
  activeNodeId,
}: UseVirtualTreeNavigationProps): void => {
  // Handle DOM changes for virtual tree
  useEffect(() => {
    if (!virtualTreeConnector) return;

    // target = parent of the first tree node to avoid mutation change detection in the subtree
    const targetNode = treeRef.current.querySelector(`[${NODE_ID_ATTRIBUTE_NAME}]`)?.parentElement;

    if (!targetNode) return;

    // To re-dispatch arrow keydown events
    let keyDownEvent: KeyboardEvent;

    // Remove all cloned nodes
    const cleanUp = () =>
      Array.from(targetNode.querySelectorAll(`.${STYLE.clonedVirtualTreeNode}`)).forEach((e) =>
        e.remove()
      );

    // Filter element by active node id
    const getByNodeId = (node: HTMLElement) => node.dataset[NODE_ID_DATA_NAME] === activeNodeId;

    // Mutation observer to handle the focus change
    const mutationHandler: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        // Handle removed active node
        const removed = Array.from(mutation.removedNodes).find(getByNodeId) as HTMLElement;
        if (removed) {
          // Clone the active node and make some modifications
          const clonedNode = removed.cloneNode(true) as HTMLElement;
          // remove nodeid attribute
          clonedNode.removeAttribute(NODE_ID_ATTRIBUTE_NAME);
          clonedNode.classList.add(STYLE.clonedVirtualTreeNode);
          // make all focusable elements un-focusable
          getKeyboardFocusableElements(clonedNode).forEach((el) =>
            el.setAttribute('tabindex', '-1')
          );
          targetNode.appendChild(clonedNode);
          clonedNode.focus({ preventScroll: true });

          // add focus and keydown event listeners
          clonedNode.addEventListener('focus', () => {
            virtualTreeConnector.scrollToNode(activeNodeId);
          });
          clonedNode.addEventListener('keydown', (evt) => {
            if (TREE_NAVIGATION_KEYS.includes(evt.key) || (evt.key === 'Tab' && !evt.shiftKey)) {
              virtualTreeConnector.scrollToNode(activeNodeId);
              keyDownEvent = new KeyboardEvent('keydown', evt);
              evt.stopPropagation();
              evt.preventDefault();
            }
          });
          return;
        }

        // Handle adding back the focused node
        const added = Array.from(mutation.addedNodes).find(getByNodeId) as HTMLElement;
        if (added) {
          cleanUp();
          added.focus({ preventScroll: true });

          // Handle keydown event originated from the cloned node
          if (keyDownEvent) {
            // re-dispatch Tab key event does not change focus in every browser, so
            // manually focus on the first element
            if (keyDownEvent.key === 'Tab') {
              getKeyboardFocusableElements(added)[0]?.focus?.();
            } else {
              // re-dispatch the arrow key events
              added.dispatchEvent(keyDownEvent);
            }
            keyDownEvent = null;
          }
          return;
        }
      }
    };

    // Start observing the target node
    const observer = new MutationObserver(mutationHandler);
    observer.observe(targetNode, { childList: true });

    // Clean up
    return () => {
      observer.disconnect();
      cleanUp();
    };
  }, [virtualTreeConnector, activeNodeId, treeRef.current]);
};
