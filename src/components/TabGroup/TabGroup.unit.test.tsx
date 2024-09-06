import { TabGroup, TabNext } from "@momentum-ui/react-collaboration"
import { mount } from "enzyme";
import React from "react"
import { DEFAULTS, STYLE } from "./TabGroup.constants";



describe('<TabGroup/>', () => {
    const childrenTemplate = [
        <TabNext key="0">tabA</TabNext>,
        <TabNext key="1">tabB</TabNext>,
        <TabNext key="2">tabC</TabNext>,
    ];

    let container;

    describe('attributes', () => {
        it('should have its wrapper class', () => {
            expect.assertions(1);

            const element = mount(<TabGroup>{childrenTemplate}</TabGroup>)
                .find(TabGroup)
                .getDOMNode();

            expect(element.classList.contains(STYLE.wrapper)).toBe(true);
        });

        it('should have provided class when className is provided', () => {
            expect.assertions(1);

            const className = 'example-class';

            const element = mount(<TabNext className={className} />)
                .find(TabNext)
                .getDOMNode();

            expect(element.classList.contains(className)).toBe(true);
        });

        it('should have provided id when id is provided', () => {
            expect.assertions(1);

            const id = 'example-id';

            const element = mount(<TabNext id={id} />)
                .find(TabNext)
                .getDOMNode();

            expect(element.id).toBe(id);
        });

        it('should have provided style when style is provided', () => {
            expect.assertions(1);

            const style = { color: 'pink' };
            const styleString = 'color: pink;';

            const element = mount(<TabNext style={style} />)
                .find(TabNext)
                .getDOMNode();

            expect(element.getAttribute('style')).toBe(styleString);
        });

        it('should pass spaced prop', () => {
            expect.assertions(1);

            const spaced = !DEFAULTS.SPACED;

            const element = mount(<TabGroup spaced={spaced}>{childrenTemplate}</TabGroup>)
                .find(TabGroup)
                .getDOMNode();

            expect(element.getAttribute('data-spaced')).toBe(`${spaced}`);
        });

        it('should pass role prop', () => {
            expect.assertions(1);

            const role = 'tablist';

            const element = mount(<TabGroup role={role}>{childrenTemplate}</TabGroup>)
                .find(TabGroup)
                .getDOMNode();

            expect(element.getAttribute('role')).toBe(role);
        });

        it('should pass orientation prop', () => {
            expect.assertions(1);

            const orientation = 'vertical';

            const element = mount(<TabGroup orientation={orientation}>{childrenTemplate}</TabGroup>)
                .find(TabGroup)
                .getDOMNode();

            expect(element.getAttribute('data-orientation')).toBe(`${orientation}`);
        });

        it('should pass aria-label prop', () => {
            expect.assertions(1);

            const ariaLabel = 'tabGroup aria label';

            const element = mount(<TabGroup aria-label={ariaLabel}>{childrenTemplate}</TabGroup>)
                .find(TabGroup)
                .getDOMNode();

            expect(element.getAttribute('aria-label')).toBe(`${ariaLabel}`);
        });
    });

    describe('snapshot', () => {
        it('should match snapshot', () => {
            expect.assertions(1);

            container = mount(<TabGroup>{childrenTemplate}</TabGroup>);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot when spaced', () => {
            expect.assertions(1);

            const spaced = !DEFAULTS.SPACED;

            container = mount(<TabGroup spaced={spaced}>{childrenTemplate}</TabGroup>);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with className', () => {
            expect.assertions(1);

            const className = 'example-class';

            const container = mount(<TabNext className={className} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with id', () => {
            expect.assertions(1);

            const id = 'example-id';

            const container = mount(<TabNext id={id} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with style', () => {
            expect.assertions(1);

            const style = { color: 'pink' };

            const container = mount(<TabNext style={style} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with role', () => {
            expect.assertions(1);

            const role = 'tablist';

            container = mount(<TabGroup role={role}>{childrenTemplate}</TabGroup>);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with orientation = vertical', () => {
            expect.assertions(1);

            const orientation = 'vertical';

            container = mount(<TabGroup orientation={orientation}>{childrenTemplate}</TabGroup>);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with aria-label', () => {
            expect.assertions(1);

            const ariaLabel = 'my aria label';

            container = mount(<TabGroup aria-label={ariaLabel}>{childrenTemplate}</TabGroup>);

            expect(container).toMatchSnapshot();
        });
    });
})