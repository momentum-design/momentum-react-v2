const tabsProviderArgTypes = {
  selectedTab: {
    description: 'The key of the selected tab',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'React.Key',
      },
    },
  },
  id: {
    description:
      'Define the prefix for the ids of the tabs and the tabpanel. Otherwise a uuid will be used',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'uuidv4()',
      },
    },
  },
};

export { tabsProviderArgTypes };

export default {
  ...tabsProviderArgTypes,
};
