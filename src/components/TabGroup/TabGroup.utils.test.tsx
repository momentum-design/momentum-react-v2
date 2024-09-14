import { act } from '@testing-library/react-hooks';
import { KEYCODES } from './TabGroup.constants';
import { handleOnKeyDown } from './TabGroup.utils';

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
        const checkKeyDown = ({ expectFoucsTabIndex, key, orientation, triggerTabIndex }) => {
            const ref = { current: container };
            if (tabItems?.length) {
                tabItems[triggerTabIndex].focus();
                expect(document.activeElement).toBe(tabItems[triggerTabIndex]);
            }
            const event = new KeyboardEvent('keydown', { key });
            document.activeElement?.dispatchEvent(event);
            act(() => handleOnKeyDown(event, ref, orientation));
            jest.runAllTimers();

            const forwardKey = orientation === 'horizontal' ? KEYCODES.ARROW_LEFT_KEY : KEYCODES.ARROW_UP_KEY;
            const backwardKey = orientation === 'horizontal' ? KEYCODES.ARROW_RIGHT_KEY : KEYCODES.ARROW_DOWN_KEY;

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
                case forwardKey:
                case backwardKey:
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
            };
        };

        it.each`
            triggerTabIndex  | key                           |orientation         | expectFoucsTabIndex
            ${0}             | ${KEYCODES.ARROW_DOWN_KEY}    | ${'vertical'}      | ${1}
            ${0}             | ${KEYCODES.ARROW_LEFT_KEY}    | ${'horizontal'}    | ${2}
            ${0}             | ${KEYCODES.ARROW_RIGHT_KEY}   | ${'horizontal'}    | ${1}
            ${0}             | ${KEYCODES.ARROW_UP_KEY}      | ${'vertical'}      | ${2}
            ${0}             | ${KEYCODES.TAB_KEY}           | ${'horizontal'}    | ${0}
            ${1}             | ${KEYCODES.ARROW_UP_KEY}      | ${'vertical'}      | ${0}
            ${1}             | ${KEYCODES.ARROW_DOWN_KEY}    | ${'horizontal'}    | ${2}
            ${1}             | ${KEYCODES.ARROW_LEFT_KEY}    | ${'horizontal'}    | ${0}
            ${1}             | ${KEYCODES.ARROW_RIGHT_KEY}   | ${'horizontal'}    | ${2}
            ${1}             | ${KEYCODES.TAB_KEY}           | ${'vertical'}      | ${1}
            ${2}             | ${KEYCODES.ARROW_UP_KEY}      | ${'vertical'}      | ${1}
            ${2}             | ${KEYCODES.ARROW_DOWN_KEY}    | ${'vertical'}      | ${0}
            ${2}             | ${KEYCODES.ARROW_LEFT_KEY}    | ${'horizontal'}    | ${1}
            ${2}             | ${KEYCODES.ARROW_RIGHT_KEY}   | ${'horizontal'}    | ${0}
            ${2}             | ${KEYCODES.TAB_KEY}           | ${'horizontal'}    | ${2}
        `(
            'trigger tab $triggerTabIndex with key $key when orientation is $orientation, tab $expectFoucsTabIndex should be focus',
            ({ expectFoucsTabIndex, key, orientation, triggerTabIndex }) => {
                checkKeyDown({ triggerTabIndex, key, orientation, expectFoucsTabIndex });
            }
        );
    });
});
