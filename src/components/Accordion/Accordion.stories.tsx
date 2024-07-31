import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Accordion, { AccordionProps } from './';
import argTypes from './Accordion.stories.args';
import Documentation from './Accordion.stories.docs.mdx';

export default {
  title: 'Momentum UI/Accordion',
  component: Accordion,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<AccordionProps>(Accordion).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
  heading: 'Accordion title',
};

const Common = MultiTemplate<AccordionProps>(Accordion).bind({});

Common.argTypes = { ...argTypes };

Common.args = {
  children: 'Example',
};

Common.parameters = {
  variants: [
    { children: undefined, heading: 'Accordion with no content' },
    { children: 'Example B', heading: 'Accordion title' },
    {
      children: 'Example C',
      heading: 'Accordion with stuff on the right',
      headingRightContent: 'Some stuff here',
    },
  ],
};

export { Example, Common };
