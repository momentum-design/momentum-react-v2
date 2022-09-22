import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import SearchInput, { SearchInputProps, SearchInputSearchFilter } from '.';
import argTypes from './SearchInput.stories.args';
import Documentation from './SearchInput.stories.docs.mdx';
import React, { useState, FC, useRef } from 'react';

export default {
  title: 'Momentum UI/SearchInput',
  component: SearchInput,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    // Args provided to all stories by default.
    placeholder: 'Search',
    label: 'This is a search',
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

interface SearchInputExampleProps extends SearchInputProps {
  initialText: string;
  initialFilters: SearchInputSearchFilter[];
}

const BetterExample: FC<SearchInputExampleProps> = (props: SearchInputExampleProps) => {
  const { initialText, initialFilters, initialLabel } = props;

  const mutatedProps = { ...props };
  delete mutatedProps.initialText;
  delete mutatedProps.initialFilters;

  const [val, setVal] = useState(initialText);
  const [filters, setFilters] = useState(initialFilters);
  const [searching, setSearching] = useState(false);
  const ref = useRef<HTMLInputElement>();

  const handleChange = (e: string) => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 1500);
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
    if (ref.current) {
      // eslint-disable-next-line no-console
      console.log('ref value:', ref.current.value);
    }
  };

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  return (
    <SearchInput
      ref={ref}
      value={val}
      filters={filters}
      onFiltersChange={handleFiltersChange}
      onChange={handleChange}
      label={initialLabel}
      {...mutatedProps}
      searching={searching}
    />
  );
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<SearchInputExampleProps>(BetterExample).bind({});

Example.argTypes = { ...argTypes };
delete Example.argTypes.searching;

/**
 * Common variants story. This renders multiple variants of a single component.
 */

const PaddedExample: FC<SearchInputProps> = (props: SearchInputProps) => {
  return (
    <>
      <div style={{ margin: '1rem' }}>
        <SearchInput height={32} {...props} />
      </div>
    </>
  );
};

const Common = MultiTemplate<SearchInputProps>(PaddedExample).bind({});

Common.argTypes = { ...argTypes };

Common.parameters = {
  variants: [
    { value: 'Typed' },
    { searching: true, placeholder: 'Searching...' },
    { isDisabled: true, value: 'Disabled' },
    {
      value: 'Joe',
    },
    {
      value: '',
    },
    {
      value: 'a message',
    },
  ],
};

export { Example, Common };
