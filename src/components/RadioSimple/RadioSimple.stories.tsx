import React from 'react';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './RadioSimple.stories.args';

import RadioSimple, { RadioSimpleProps } from '.';

import Documentation from './RadioSimple.stories.docs.mdx';
import RadioSimpleGroup from '../RadioSimpleGroup';
import Text from '../Text';
import Icon from '../Icon';

export default {
  title: 'Momentum UI/RadioSimple',
  component: RadioSimple,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<RadioSimpleProps>((args: RadioSimpleProps) => {
  return (
    <RadioSimpleGroup label="Example" description="Value of the group is 'red'" value={'red'}>
      <RadioSimple {...args} />
    </RadioSimpleGroup>
  );
}).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: (
    [
      <Icon key="1" name="accessibility" autoScale />,
      <Text key="2">My value is 'red'</Text>
    ]
  ),
  className: 'example-className',
  id: 'example-id',
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid red',
    padding: '8px',
    margin: '8px 8px'
  },
};

export { Example };
