/* eslint-disable import/extensions */
import React from 'react';
import Text from '.';
import { AllowedTagNames, FontStyle } from './Text.types';

import { TYPES, STYLE } from './Text.constants';
import { render, waitFor } from '@testing-library/react';
import { TYPE as FONT_TYPE } from '@momentum-design/components/dist/components/text/text.constants.js';

describe('Text', () => {
  let container;

  const setup = async (component: any) => {
    const {container} = render(component);

    // we have to wait for the web component to be rendered
    await waitFor(() => {
      expect(container.querySelector('mdc-text')).toBeTruthy();
    });

    return container;
  };

  it('should match snapshot', async () => {
    expect.assertions(2);

    container = await setup(<Text>Hello</Text>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with className', async () => {
    expect.assertions(2);

    const className = 'example-class';

    container = await setup(<Text className={className} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with id', async () => {
    expect.assertions(2);

    const id = 'example-id';

    container = await setup(<Text id={id} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with style', async () => {
    expect.assertions(2);

    const style = { color: 'red' };

    container = await setup(<Text style={style} />);

    expect(container).toMatchSnapshot();
  });

  it(`should match snapshot with type`, async () => {
    expect.assertions(2);

    const texts = Object.values(TYPES).map((type, index) => {
      return (
        <Text key={index} type={type as FontStyle}>
          Example Text
        </Text>
      );
    });
    container = await setup(<div>{texts}</div>);

    expect(container).toMatchSnapshot();
  });

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'small', 'div', 'span'])(
    'should match snapshot with type and tagName override',
    async (tagName) => {
      expect.assertions(2);

      const texts = Object.values(TYPES).map((type, index) => {
        return (
          <Text key={index} type={type as FontStyle} tagName={tagName as AllowedTagNames}>
            Example Text
          </Text>
        );
      });
      container = await setup(<div>{texts}</div>);

      expect(container).toMatchSnapshot();
    }
  );

  describe('attributes', () => {
    it('should have its main class', async () => {
      expect.assertions(2);

      const container = await setup(<Text />);

      expect(container.querySelector('mdc-text').classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(2);

      const id = 'example-id';

      const container = await setup(<Text id={id} />);
       
      expect(container.querySelector('mdc-text').id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(2);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const container = await setup(<Text style={style} />);

      expect(container.querySelector('mdc-text').getAttribute('style')).toBe(styleString);
    });

    it('should pass type prop to MdcText web componet', async () => {
      expect.assertions(2);

      const type = TYPES.LABEL_COMPACT;
      const expectedMdcTextType = FONT_TYPE.BODY_SMALL_MEDIUM;

      const container = await setup(<Text type={type} />);


      expect(container.querySelector('mdc-text').getAttribute('type')).toBe(expectedMdcTextType);
    });
  });
});
