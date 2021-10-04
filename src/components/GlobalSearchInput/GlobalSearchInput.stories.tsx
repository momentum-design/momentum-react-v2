import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import GlobalSearchInput, { GlobalSearchInputProps, GlobalSearchInputSearchFilter } from './';
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
    placeholder: 'Search',
    initialText: 'message',
    initialLabel: 'Search messages by person or space',
    clearButtonAriaLabel: 'CLEAR',
    initialFilters: [
      {
        term: 'from',
        value: 'Joe',
        translations: {
          filterRemoved: 'From Joe removed',
          filterAdded: 'From filter added',
          text: 'From: Joe',
          empty: 'Choose who to filter by',
          nonempty: 'Filtering by Joe',
        },
      },
      {
        term: 'in',
        value: 'a space',
        translations: {
          filterRemoved: 'In a space removed',
          filterAdded: 'In filter added',
          text: 'In: a space',
          empty: 'Choose a space to filter by',
          nonempty: 'Filtering in a space',
        },
      },
    ],
    searching: false,
  },
};

interface GlobalSearchInputExampleProps extends GlobalSearchInputProps {
  initialText: string;
  initialFilters: GlobalSearchInputSearchFilter[];
}

const BetterExample: FC<GlobalSearchInputExampleProps> = (props: GlobalSearchInputExampleProps) => {
  const { initialText, initialFilters, initialLabel } = props;

  const mutatedProps = { ...props };
  delete mutatedProps.initialText;
  delete mutatedProps.initialFilters;

  const [val, setVal] = useState(initialText);
  const [filters, setFilters] = useState(initialFilters);
  const [searching, setSearching] = useState(false);

  const handleChange = (e: string) => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 500);
    if (e.toLowerCase().startsWith('from:')) {
      setFilters([
        {
          term: 'from',
          value: '',
          translations: {
            filterAdded: 'From filter added',
            filterRemoved: 'From filter removed',
            text: 'From:',
            empty: 'Choose who to filter by',
            nonempty: '',
          },
        },
        ...filters,
      ]);
      setVal(e.slice('From:'.length, e.length));
    } else {
      setVal(e);
    }
  };

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  return (
    <GlobalSearchInput
      value={val}
      filters={filters}
      onFiltersChange={handleFiltersChange}
      onChange={handleChange}
      initialLabel={initialLabel}
      {...mutatedProps}
      searching={searching}
    />
  );
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<GlobalSearchInputExampleProps>(BetterExample).bind({});

Example.argTypes = { ...argTypes };

/**
 * Common variants story. This renders multiple variants of a single component.
 */

const PaddedExample: FC<GlobalSearchInputProps> = (props: GlobalSearchInputProps) => {
  return (
    <div style={{ margin: '1rem' }}>
      <GlobalSearchInput {...props} />
    </div>
  );
};

const Common = MultiTemplate<GlobalSearchInputProps>(PaddedExample).bind({});

Common.argTypes = { ...argTypes };

Common.parameters = {
  variants: [
    { value: 'Typed' },
    { searching: true, placeholder: 'Searching...' },
    { disabled: true },
    {
      value: 'Joe',
      filters: [
        {
          term: 'from',
          value: '',
          translations: {
            filterAdded: 'From filter added',
            filterRemoved: 'From filter removed',
            text: 'From:',
            empty: 'Choose who to filter by',
            nonempty: '',
          },
        },
      ],
    },
    {
      value: '',
      filters: [
        {
          term: 'from',
          value: 'Joe',
          translations: {
            filterAdded: 'From filter added',
            filterRemoved: 'From filter removed',
            text: 'From: Joe',
            empty: 'Choose who to filter by',
            nonempty: 'Filtering by Joe',
          },
        },
      ],
    },
    {
      value: 'a message',
      filters: [
        {
          term: 'in',
          value: 'Joe',
          translations: {
            filterAdded: 'In filter added',
            filterRemoved: 'In filter removed',
            text: 'In: A Space',
            empty: 'Choose a space to filter by',
            nonempty: 'Filtering in a space',
          },
        },
      ],
    },
  ],
};

export { Example, Common };
