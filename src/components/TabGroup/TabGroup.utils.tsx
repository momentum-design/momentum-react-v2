import { KEYCODES } from './TabGroup.constants';

export const handleTabOnKeyDown = (event:KeyboardEvent, containerRef:any) => {
    const { key, target: currentElement } = event;
    const containerElement = containerRef?.current?.querySelectorAll ? containerRef.current : containerRef?.current?.containerNode;
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
        case KEYCODES.ARROW_RIGHT_KEY:
        case KEYCODES.ARROW_DOWN_KEY:
            nextElementToFocus = isLastChild ? tabItems[0] : tabItems[currentIndex + 1];
            break;
        case KEYCODES.ARROW_LEFT_KEY:
        case KEYCODES.ARROW_UP_KEY:
            nextElementToFocus = isFirstChild ? tabItems[tabItems.length - 1] : tabItems[currentIndex - 1];
            break;
        default:
            needResetTabIndex = false;
    }

    if (needResetTabIndex) {
        tabItems.forEach((tabItem) => {
            tabItem.tabIndex = -1;
        });
    }

    if (nextElementToFocus) {
        nextElementToFocus.focus();
        nextElementToFocus.tabIndex = 0;
    }
};

export const handleOnPress = (event:KeyboardEvent, containerRef:any) => {
    const currentElement = event.target as HTMLElement;
    const containerElement = containerRef?.current?.querySelectorAll ? containerRef.current : containerRef?.current?.containerNode;
    const tabItems: HTMLElement[] = containerElement?.querySelectorAll('.md-tab-wrapper');
    
    tabItems.forEach((tabItem) => {
        tabItem.dataset.active = tabItem === currentElement ? 'true' : 'false';
    });
};