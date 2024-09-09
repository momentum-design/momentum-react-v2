import { act } from '@testing-library/react-hooks';
import { KEYCODES } from './TabGroup.constants';
import { handleTabOnKeyDown, handleOnPress } from './TabGroup.utils';


describe('TabGroup utils', () => {
    let container: HTMLDivElement | null;
    let tabItems: HTMLElement[] | null;
    const activeIndex = Math.floor(Math.random() * 3);

    beforeEach(() => {
        container = document.createElement('div');
        tabItems = ['tab0', 'tab1', 'tab2'].map((text, index) => {
            const tab = document.createElement('button');

            tab.textContent = text;
            tab.className = 'md-tab-wrapper';
            if (index === activeIndex) {
                tab.dataset.active = 'true';
            }
            container?.appendChild(tab);

            return tab;
        });
        document.body.appendChild(container);
        jest.useFakeTimers();
    });

    afterEach(() => {
        document.body.removeChild(container as any);
        container = null;
        tabItems = null;
        jest.useRealTimers();
    });

    describe('handleTabOnKeyDown', () => {
        const checkKeyDown = ({ expectFoucsTabIndex, key, triggerTabIndex }) => {
            const ref = { current: container };
            if (tabItems?.length) {
                tabItems[triggerTabIndex].focus();
                expect(document.activeElement).toBe(tabItems[triggerTabIndex]);
            }
            const event = new KeyboardEvent('keydown', { key });
            document.activeElement?.dispatchEvent(event);
            act(() => handleTabOnKeyDown(event, ref));
            jest.runAllTimers();

            
            switch (key) {
                case KEYCODES.TAB_KEY:
                    tabItems.forEach((item, index) => {
                        if (index === activeIndex) {
                            expect(item.tabIndex).toEqual(0);
                        } else {
                            expect(item.tabIndex).toEqual(-1);
                        }
                    });
                    break;
                case KEYCODES.ARROW_DOWN_KEY:
                case KEYCODES.ARROW_LEFT_KEY:
                case KEYCODES.ARROW_UP_KEY:
                case KEYCODES.ARROW_RIGHT_KEY:
                    expect(document.activeElement).toBe(tabItems[expectFoucsTabIndex]);
                    expect(tabItems[expectFoucsTabIndex].tabIndex).toEqual(0);
                    tabItems.forEach((item, index) => {
                        if (expectFoucsTabIndex === index) {
                            expect(item.tabIndex).toEqual(0);
                        } else {
                            expect(item.tabIndex).toEqual(-1);
                        }
                    });
                    break;
            }
        };

        it.each`
            triggerTabIndex | key                | expectFoucsTabIndex
            ${0}               | ${KEYCODES.ARROW_DOWN_KEY}  | ${1}
            ${0}               | ${KEYCODES.ARROW_LEFT_KEY}  | ${2}
            ${0}               | ${KEYCODES.ARROW_RIGHT_KEY} | ${1}
            ${0}               | ${KEYCODES.TAB_KEY}         | ${0}
            ${1}               | ${KEYCODES.ARROW_UP_KEY}    | ${0}
            ${0}               | ${KEYCODES.ARROW_UP_KEY}    | ${2}
            ${1}               | ${KEYCODES.ARROW_DOWN_KEY}  | ${2}
            ${1}               | ${KEYCODES.ARROW_LEFT_KEY}  | ${0}
            ${1}               | ${KEYCODES.ARROW_RIGHT_KEY} | ${2}
            ${1}               | ${KEYCODES.TAB_KEY}         | ${1}
            ${2}               | ${KEYCODES.ARROW_UP_KEY}    | ${1}
            ${2}               | ${KEYCODES.ARROW_DOWN_KEY}  | ${0}
            ${2}               | ${KEYCODES.ARROW_LEFT_KEY}  | ${1}
            ${2}               | ${KEYCODES.ARROW_RIGHT_KEY} | ${0}
            ${2}               | ${KEYCODES.TAB_KEY}         | ${2}
        `(
            'trigger tab $triggerTabIndex with key $key, tab $expectFoucsTabIndex should be focus',
            ({ expectFoucsTabIndex, key, triggerTabIndex }) => {
                checkKeyDown({ triggerTabIndex, key, expectFoucsTabIndex });
            }
        );
    });

    describe('handleTabOnPress', ()=>{
        const checkOnPress = ({ triggerTabIndex }) => {
            const ref = { current: container };
            tabItems[triggerTabIndex].focus();
            expect(document.activeElement).toBe(tabItems[triggerTabIndex]);

            const event = new KeyboardEvent('keydown', { key: 'Enter' || 'Space' });
            document.activeElement.dispatchEvent(event);

            act(() => handleOnPress(event, ref));
            jest.runAllTimers();
            
            tabItems.forEach((tabItem, index) => {
                if (index === triggerTabIndex) {
                    expect(tabItem.dataset.active).toBe('true');
                } else {
                    expect(tabItem.dataset.active).toBe('false');
                }
            });
        };

        it.each`triggerTabIndex ${0} ${1} ${2}`(
            'trigger tab $triggerTabIndex should be active',
            ({ triggerTabIndex }) => {
                checkOnPress({ triggerTabIndex });
            }
        );
    });
});
