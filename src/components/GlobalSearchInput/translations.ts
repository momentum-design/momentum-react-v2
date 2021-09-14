import { defineMessages } from 'react-intl';

export default defineMessages({
  placeholder: {
    id: 'GlobalSearchInput.placeholder',
    defaultMessage: 'Search messages by person or space',
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
  fromLabelAdded: {
    id: 'GlobalSearchInput.fromLabelAdded',
    defaultMessage: 'From filter added',
  },
  fromLabelRemoved: {
    id: 'GlobalSearchInput.fromLabelRemoved',
    defaultMessage: 'From filter removed',
  },
  fromLabelRemovedFull: {
    id: 'GlobalSearchInput.fromLabelRemovedFull',
    defaultMessage: 'From {value} filter removed',
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
