import { mount } from 'enzyme';
import React from 'react';

import Avatar from 'components/Avatar';
import ButtonCircle from 'components/ButtonCircle';
import ButtonGroup from 'components/ButtonGroup';
import Icon from 'components/Icon';

import { mountAndWait } from '../../../test/utils';

import Banner, { BANNER_CONSTANTS as CONSTANTS } from './';

describe('<Banner />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Banner />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Banner className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Banner id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Banner style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with actions', async () => {
      expect.assertions(1);

      const actions = (
        <ButtonGroup spaced>
          <ButtonCircle color="join">
            <Icon name="camera" autoScale={125} />
          </ButtonCircle>
          <ButtonCircle color="cancel">
            <Icon name="cancel" autoScale={125} />
          </ButtonCircle>
        </ButtonGroup>
      );

      const container = await mountAndWait(<Banner actions={actions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with description', () => {
      expect.assertions(1);

      const description = 'Description';

      const container = mount(<Banner description={description} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details', () => {
      expect.assertions(1);

      const details = 'Details';

      const container = mount(<Banner details={details} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with image', async () => {
      expect.assertions(1);

      const image = <Avatar initials="CW" />;

      const container = await mountAndWait(<Banner image={image} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isAlert', () => {
      expect.assertions(1);

      const isAlert = true;

      const container = mount(<Banner isAlert={isAlert} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with shape', () => {
      expect.assertions(1);

      const shape = Object.values(CONSTANTS.SHAPES).pop();

      const container = mount(<Banner shape={shape} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Title';

      const container = mount(<Banner title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match a complex snapshot', async () => {
      expect.assertions(1);

      const props = {
        actions: (
          <ButtonGroup spaced>
            <ButtonCircle color="join">
              <Icon name="camera" autoScale={125} />
            </ButtonCircle>
            <ButtonCircle color="cancel">
              <Icon name="cancel" autoScale={125} />
            </ButtonCircle>
          </ButtonGroup>
        ),
        description: 'Description',
        details: '(Details)',
        image: <Avatar initials="CW" size={88} />,
        isAlert: true,
        shape: Object.values(CONSTANTS.SHAPES).pop(),
        title: 'Title',
      };

      const container = await mountAndWait(<Banner {...props} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Banner />)
        .find(Banner)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Banner className={className} />)
        .find(Banner)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Banner id={id} />)
        .find(Banner)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Banner style={style} />)
        .find(Banner)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided actions when actions is provided', async () => {
      expect.assertions(1);

      const actions = (
        <ButtonGroup spaced>
          <ButtonCircle color="join">
            <Icon name="camera" autoScale={125} />
          </ButtonCircle>
          <ButtonCircle color="cancel">
            <Icon name="cancel" autoScale={125} />
          </ButtonCircle>
        </ButtonGroup>
      );

      const container = await mountAndWait(<Banner actions={actions} />);

      expect(container.contains(actions)).toBe(true);
    });

    it('should have provided description when description is provided', () => {
      expect.assertions(1);

      const description = 'Description';

      const container = mount(<Banner description={description} />);
      const target = container.getDOMNode().getElementsByClassName(CONSTANTS.STYLE.description)[0];

      expect(target.innerHTML).toBe(description);
    });

    it('should have provided details when details is provided', () => {
      expect.assertions(1);

      const details = 'Details';

      const container = mount(<Banner details={details} />);
      const target = container.getDOMNode().getElementsByClassName(CONSTANTS.STYLE.details)[0];

      expect(target.innerHTML).toBe(details);
    });

    it('should have provided image when image is provided', async () => {
      expect.assertions(1);

      const image = <Avatar initials="CW" />;

      const container = await mountAndWait(<Banner image={image} />);

      expect(container.contains(image)).toBe(true);
    });

    it('should have provided data-alert when isAlert is provided', () => {
      expect.assertions(1);

      const isAlert = true;

      const container = mount(<Banner isAlert={isAlert} />);
      const target = container.find(Banner).getDOMNode();

      expect(target.getAttribute('data-alert')).toBe(`${isAlert}`);
    });

    it('should have provided data-shape when shape is provided', () => {
      expect.assertions(1);

      const shape = Object.values(CONSTANTS.SHAPES).pop();

      const container = mount(<Banner shape={shape} />);
      const target = container.find(Banner).getDOMNode();

      expect(target.getAttribute('data-shape')).toBe(shape);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Title';

      const container = mount(<Banner title={title} />);
      const target = container.getDOMNode().getElementsByClassName(CONSTANTS.STYLE.title)[0];

      expect(target.innerHTML).toBe(title);
    });
  });
});
