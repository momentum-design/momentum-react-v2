import { KEYCODES } from './TabGroup.constants';
import { TabGroupOrientation } from './TabGroup.types';

export const handleOnKeyDown = (event: KeyboardEvent, containerRef: any, orientation: TabGroupOrientation) => {
    const { key, target: currentElement } = event;
    const containerElement = containerRef.current?.querySelectorAll ? containerRef.current : containerRef.current?.containerNode;
    const tabItems: HTMLElement[] = containerElement?.querySelectorAll('.md-tab-wrapper');

    if (!tabItems.length) return;

    let needResetTabIndex = true;
    let nextElementToFocus;
    const activeItem = Array.from(tabItems).find(
        (tabItem) => tabItem.dataset.selected === 'true' || tabItem.dataset.active === 'true'
    );
    const currentIndex = Array.from(tabItems).indexOf(currentElement as HTMLElement);
    const isFirstChild = currentIndex === 0;
    const isLastChild = currentIndex === tabItems.length - 1;

    switch (key) {
        case KEYCODES.TAB_KEY:
            setTimeout(() => {
                if (activeItem as HTMLElement) {
                    activeItem.tabIndex = 0;
                } else {
                    (currentElement as HTMLElement).tabIndex = 0;
                }
            });
            break;
        case KEYCODES.ARROW_LEFT_KEY:
            if(orientation === 'horizontal'){
                nextElementToFocus = isFirstChild ? tabItems[tabItems.length - 1] : tabItems[currentIndex - 1];
            };
            break;
        case KEYCODES.ARROW_UP_KEY:
            if(orientation === 'vertical'){
                nextElementToFocus = isFirstChild ? tabItems[tabItems.length - 1] : tabItems[currentIndex - 1];
            };
            break;
        case KEYCODES.ARROW_RIGHT_KEY:
            if(orientation === 'horizontal'){
                nextElementToFocus = isLastChild ? tabItems[0] : tabItems[currentIndex + 1];
            };
            break;
        case KEYCODES.ARROW_DOWN_KEY:
            if(orientation === 'vertical'){
                nextElementToFocus = isLastChild ? tabItems[0] : tabItems[currentIndex + 1];
            };
            break;
        default:
            needResetTabIndex = false;
    };

    if (needResetTabIndex) {
        tabItems.forEach((tabItem) => {
            tabItem.tabIndex = -1;
        });
    };

    if (nextElementToFocus) {
        nextElementToFocus.focus();
        nextElementToFocus.tabIndex = 0;
    };
};