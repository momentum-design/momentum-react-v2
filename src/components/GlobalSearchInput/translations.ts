import { defineMessages } from 'react-intl';

export default defineMessages({
  placeholder: {
    id: 'GlobalSearchInput.placeholder',
    defaultMessage: 'Search, meet, and call',
  },
  from: {
    id: 'GlobalSearchInput.from',
    defaultMessage: 'From:',
  },
  fromLabelEmpty: {
    id: 'GlobalSearchInput.fromLabelEmpty',
    defaultMessage: 'Choose who to filter by',
  },
  fromLabelNonEmpty: {
    id: 'GlobalSearchInput.fromLabelNonEmpty',
    defaultMessage: 'Filtering by {value}',
  },
  in: {
    id: 'GlobalSearchInput.in',
    defaultMessage: 'In:',
  },
  inLabelEmpty: {
    id: 'GlobalSearchInput.inLabelEmpty',
    defaultMessage: 'Choose a space to filter by',
  },
  inLabelNonEmpty: {
    id: 'GlobalSearchInput.inLabelNonEmpty',
    defaultMessage: 'Searching in {value}',
  },
  with: {
    id: 'GlobalSearchInput.with',
    defaultMessage: 'With:',
  },
  withLabelEmpty: {
    id: 'GlobalSearchInput.withLabelEmpty',
    defaultMessage: 'Choose someone who is in this space with you',
  },
  withLabelNonEmpty: {
    id: 'GlobalSearchInput.withLabelNonEmpty',
    defaultMessage: 'Searching for spaces with {value}',
  },
});
