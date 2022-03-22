import React from 'react';

import Avatar from 'components/Avatar';
import ButtonControl from 'components/ButtonControl';

import { mountAndWait } from '../../../test/utils';

import ToastDetails, { TOAST_DETAILS_CONSTANTS as CONSTANTS, ToastDetailsProps } from './';

describe('<ToastDetails />', () => {
  const avatar = <Avatar initials="T" />;

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ToastDetails image={avatar} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<ToastDetails image={avatar} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<ToastDetails image={avatar} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<ToastDetails image={avatar} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with badges', async () => {
      expect.assertions(1);

      const badges = ['Static1', 'Static2', 'Static3'];

      const container = await mountAndWait(<ToastDetails image={avatar} badges={badges} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', async () => {
      expect.assertions(1);

      const children = 'Children';

      const container = await mountAndWait(<ToastDetails image={avatar}>{children}</ToastDetails>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with controls', async () => {
      expect.assertions(1);

      const controls = [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="mute" />,
        <ButtonControl key={2} control="favorite" />,
      ];

      const container = await mountAndWait(<ToastDetails image={avatar} controls={controls} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with info', async () => {
      expect.assertions(1);

      const info = 'Information';

      const container = await mountAndWait(<ToastDetails image={avatar} info={info} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with infoColor', async () => {
      expect.assertions(1);

      const info = 'Information';
      const infoColor = 'join';

      const container = await mountAndWait(
        <ToastDetails image={avatar} info={info} infoColor={infoColor} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with subject', async () => {
      expect.assertions(1);

      const subject = 'Subject';

      const container = await mountAndWait(<ToastDetails image={avatar} subject={subject} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      expect.assertions(1);

      const title = 'Title';

      const container = await mountAndWait(<ToastDetails image={avatar} title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with complete props', async () => {
      expect.assertions(1);

      const props: ToastDetailsProps = {
        controls: [
          <ButtonControl key={0} control="close" />,
          <ButtonControl key={1} control="mute" />,
          <ButtonControl key={2} control="favorite" />,
        ],
        image: avatar,
        info: 'Information',
        infoColor: 'join',
        subject: 'Subject',
        title: 'Title',
      };

      const container = await mountAndWait(<ToastDetails {...props} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with complete props and badges', async () => {
      expect.assertions(1);

      const props: ToastDetailsProps = {
        badges: ['Badge 1', 'Badge 2'],
        controls: [
          <ButtonControl key={0} control="close" />,
          <ButtonControl key={1} control="mute" />,
          <ButtonControl key={2} control="favorite" />,
        ],
        image: avatar,
        info: 'Information',
        infoColor: 'join',
        subject: 'Subject',
        title: 'Title',
      };

      const container = await mountAndWait(<ToastDetails {...props} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ToastDetails image={avatar} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<ToastDetails image={avatar} className={className} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<ToastDetails image={avatar} id={id} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<ToastDetails image={avatar} style={style} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have a badges element when badges is provided', async () => {
      expect.assertions(1);

      const badges = ['Badge 1', 'Badge 2'];

      const wrapper = await mountAndWait(<ToastDetails image={avatar} badges={badges} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.badges)[0];

      expect(target).toBeDefined();
    });

    it('should have a title element when children is provided', async () => {
      expect.assertions(1);

      const children = 'Children';

      const wrapper = await mountAndWait(<ToastDetails image={avatar}>{children}</ToastDetails>);
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.title)[0];

      expect(target).toBeDefined();
    });

    it('should have a controls element when controls is provided', async () => {
      expect.assertions(1);

      const controls = [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="mute" />,
        <ButtonControl key={2} control="favorite" />,
      ];

      const wrapper = await mountAndWait(<ToastDetails image={avatar} controls={controls} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.controls)[0];

      expect(target).toBeDefined();
    });

    it('should have an info element when info is provided', async () => {
      expect.assertions(1);

      const info = 'Information';

      const wrapper = await mountAndWait(<ToastDetails image={avatar} info={info} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.info)[0];

      expect(target).toBeDefined();
    });

    it('should have a data-color attribute on the info element when infoColor is provided', async () => {
      expect.assertions(1);

      const info = 'Information';
      const infoColor = 'join';

      const wrapper = await mountAndWait(
        <ToastDetails image={avatar} info={info} infoColor={infoColor} />
      );
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.info)[0];

      expect(target.getAttribute('data-color')).toBe(infoColor);
    });

    it('should have a subject element when subject is provided', async () => {
      expect.assertions(1);

      const subject = 'Subject';

      const wrapper = await mountAndWait(<ToastDetails image={avatar} subject={subject} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.subject)[0];

      expect(target).toBeDefined();
    });

    it('should have a title element when title is provided', async () => {
      expect.assertions(1);

      const title = 'Title';

      const wrapper = await mountAndWait(<ToastDetails image={avatar} title={title} />);
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.title)[0];

      expect(target).toBeDefined();
    });

    it('should display the title prop when children and title are provided', async () => {
      expect.assertions(1);

      const children = 'Children';
      const title = 'Title';

      const wrapper = await mountAndWait(
        <ToastDetails image={avatar} title={title}>
          {children}
        </ToastDetails>
      );
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.title)[0];

      expect(target.innerHTML).toBe(title);
    });

    it('should display the badges prop when badges and info are provided', async () => {
      expect.assertions(2);

      const info = 'Information';
      const badges = ['Badge 1', 'Badge 2'];

      const wrapper = await mountAndWait(
        <ToastDetails image={avatar} badges={badges} info={info} />
      );
      const element = wrapper.find(ToastDetails).getDOMNode();

      const target = element.getElementsByClassName(CONSTANTS.STYLE.badges);
      const invalidTarget = element.getElementsByClassName(CONSTANTS.STYLE.info);

      expect(target.length > 0).toBe(true);
      expect(invalidTarget.length === 0).toBe(true);
    });
  });
});
