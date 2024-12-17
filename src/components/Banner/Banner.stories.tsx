import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Avatar from '../Avatar';
import ButtonCircle from '../ButtonCircle';
import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';

import Banner, { BannerProps, BANNER_CONSTANTS as CONSTANTS } from './';
import argTypes from './Banner.stories.args';
import Documentation from './Banner.stories.docs.mdx';

export default {
  title: 'Momentum UI/Banner',
  component: Banner,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<BannerProps>(Banner).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  actions: (
    <ButtonGroup spaced>
      <ButtonCircle aria-label="camera" color="join">
        <Icon name="camera" autoScale={125} />
      </ButtonCircle>
      <ButtonCircle aria-label="cancel" color="cancel">
        <Icon name="cancel" autoScale={125} />
      </ButtonCircle>
    </ButtonGroup>
  ),
  color: 'tertiary',
  description: 'Description',
  details: '(Details)',
  image: <Avatar initials="CW" size={88} />,
  title: 'Title',
};

const Alerting = MultiTemplate<BannerProps>(Banner).bind({});

Alerting.argTypes = { ...argTypes };
delete Alerting.argTypes.isAlert;

Alerting.args = {
  description: 'Description',
  image: <Avatar initials="CW" size={88} />,
};

Alerting.parameters = {
  variants: [false, true].map((val) => ({
    isAlert: val,
    title: `${val}`,
  })),
};

const Shapes = MultiTemplate<BannerProps>(Banner).bind({});

Shapes.argTypes = { ...argTypes };
delete Shapes.argTypes.color;

Shapes.args = {
  description: 'Description',
  image: <Avatar initials="CW" size={88} />,
};

Shapes.parameters = {
  variants: Object.values(CONSTANTS.SHAPES).map((shape) => ({
    shape,
    title: `"${shape}"`,
  })),
};

const Common = MultiTemplate<BannerProps>(Banner).bind({});

Common.argTypes = { ...argTypes };

Common.args = {};

Common.parameters = {
  variants: [
    {
      actions: (
        <ButtonGroup spaced>
          <ButtonCircle aria-label="camera" color="join">
            <Icon name="camera" autoScale={125} />
          </ButtonCircle>
          <ButtonCircle aria-label="cancel" color="cancel">
            <Icon name="cancel" autoScale={125} />
          </ButtonCircle>
        </ButtonGroup>
      ),
      color: 'primary',
      description: 'Lorem Ipsum',
      details: '( lorem.ipsum@domain.com )',
      image: <Avatar initials="LI" size={88} />,
      title: 'Incoming Call',
    },
  ],
};

export { Example, Alerting, Shapes, Common };
