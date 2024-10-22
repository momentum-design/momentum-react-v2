const tabsArgTypes = {
  children: {
    description: 'Provides the child nodes for this element.', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'ReactNode', // NOTE: Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // NOTE: Default value for this prop.
      },
    },
  },
  selectedTab: {
    description: 'The key of the selected tab', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'React.Key', // NOTE: Explicit type of this prop.
      },
    },
  },
  id: {
    description: 'Define the prefix for the ids of the tabs and the tabpanel', // NOTE: Description of this prop.
    control: { type: 'text' }, // NOTE: Control type for this prop.
    table: {
      type: {
        summary: 'string', // NOTE: Explicit type of this prop.
      },
      defaultValue: {
        summary: 'undefined', // NOTE: Default value for this prop.
      },
    },
  },
};

export { tabsArgTypes };

export default {
  ...tabsArgTypes,
};
