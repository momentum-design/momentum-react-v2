import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import GlobalSearchInput, { GlobalSearchInputProps } from './';
import argTypes from './GlobalSearchInput.stories.args';
import Documentation from './GlobalSearchInput.stories.docs.mdx';
import React, { useState, FC } from 'react';

export default {
  title: 'Momentum UI/GlobalSearchInput',
  component: GlobalSearchInput,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    // Args provided to all stories by default.
    placeholder: 'Search, meet, and call',
    initialText: 'From: ',
    initialNumHighlighted: 5,
  },
};

interface GlobalSearchInputExampleProps extends GlobalSearchInputProps {
  initialText: string;
  initialNumHighlighted: number;
}

const BetterExample: FC<GlobalSearchInputExampleProps> = (props: GlobalSearchInputExampleProps) => {
  const { initialText, initialNumHighlighted } = props;

  const mutatedProps = { ...props };
  delete mutatedProps.initialText;
  delete mutatedProps.initialNumHighlighted;

  const [val, setVal] = useState(initialText);
  const [numHighlighted, setNumHighlighted] = useState(initialNumHighlighted);

  const handleChange = (e) => {
    setVal(e);
    if (!val) {
      setNumHighlighted(0);
    }
  };

  return (
    <GlobalSearchInput
      value={val}
      numHighlighted={numHighlighted}
      onChange={handleChange}
      {...mutatedProps}
    />
  );
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<GlobalSearchInputExampleProps>(BetterExample).bind({});

Example.argTypes = { ...argTypes };

// TODO: Inject additional stories here.

/**
 * Common variants story. This renders multiple variants of a single component.
 */
const Common = MultiTemplate<GlobalSearchInputProps>(GlobalSearchInput).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    { value: 'Typed' },
    { searching: true, placeholder: 'Searching...' },
    { disabled: true },
    { value: 'With: Joe', numHighlighted: 5 },
    { value: 'From: Fred', numHighlighted: 5 },
    { value: 'In: Example Space', numHighlighted: 3 },
  ],
};

export { Example, Common };
