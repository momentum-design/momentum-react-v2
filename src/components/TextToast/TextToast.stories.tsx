import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import argTypes from './TextToast.stories.args';
import Documentation from './TextToast.stories.docs.mdx';

import TextToast, { TextToastProps } from './';

export default {
  title: 'Momentum UI/TextToast',
  component: TextToast,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<TextToastProps>(TextToast).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  text: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte adipiscing elit nullam amarte.',
  textAlignment: 'center',
  iconProps: undefined,
};

const Common = MultiTemplate<TextToastProps>(TextToast).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  text: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte adipiscing elit nullam amarte.',
  textAlignment: 'center',
  iconProps: undefined,
};

Common.parameters = {
  variants: [
    { textAlignment: 'left' },
    { textAlignment: 'center' },
    {
      text: "You're temporarily unmuted",
      textAlignment: 'center',
      iconProps: {
        name: 'sound-default',
        fillColor: 'var(--banner-success-text)',
        autoScale: true,
      },
      style: { width: 'fit-content' },
    },
  ],
};

export { Example, Common };
