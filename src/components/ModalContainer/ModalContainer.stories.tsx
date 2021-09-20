import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Text from '../Text';

import ModalContainer, { ModalContainerProps, MODAL_CONTAINER_CONSTANTS as CONSTANTS } from './';
import argTypes from './ModalContainer.stories.args';
import Documentation from './ModalContainer.stories.docs.mdx';

export default {
  title: 'Momentum UI/ModalContainer',
  component: ModalContainer,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const commonChildren = <Text style={{ margin: '0.5rem' }}>Example Text</Text>;

const Example = Template<ModalContainerProps>(ModalContainer).bind({});

Example.argTypes = { ...argTypes };
Example.args = {
  children: commonChildren,
};

const Colors = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

Colors.parameters = {
  variants: Object.values(CONSTANTS.COLORS).map((color) => ({ color })),
};

Colors.args = {
  children: commonChildren,
};

const Elevations = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Elevations.argTypes = { ...argTypes };
delete Elevations.argTypes.elevation;

Elevations.parameters = {
  variants: Object.values(CONSTANTS.ELEVATIONS).map((elevation) => ({ elevation })),
};

Elevations.args = {
  children: commonChildren,
};

const Common = MultiTemplate<ModalContainerProps>(ModalContainer).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    { children: commonChildren },
    {
      color: 'secondary',
      children: (
        <Text style={{ margin: '0.5rem' }}>
          This is a very long example text section. This shows a wide Modal.
        </Text>
      ),
      elevation: 16,
    },
    {
      children: (
        <div>
          {commonChildren}
          {commonChildren}
          {commonChildren}
          {commonChildren}
        </div>
      ),
      color: 'tertiary',
      elevation: 48,
    },
  ],
};

export { Example, Colors, Elevations, Common };
