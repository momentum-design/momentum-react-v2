interface Item {
  label: string;
  key: string;
}

interface ItemGroup {
  section?: string;
  items: Item[];
}

type FilterFn = (label: string, inputValue: string) => boolean;

export const filterItems = (
  items: Array<Item | ItemGroup>,
  inputValue: string,
  filterFn: FilterFn
): Array<Item | ItemGroup> => {
  const filteredItems = [];
  for (const item of items) {
    if ((item as ItemGroup).section && (item as ItemGroup).items) {
      const filtered = filterItems((item as ItemGroup).items, inputValue, filterFn);
      if ([...filtered].length > 0) {
        filteredItems.push({ ...item, items: filtered });
      }
    } else if (!(item as ItemGroup).section && filterFn((item as Item).label, inputValue)) {
      filteredItems.push({ ...item });
    }
  }
  return filteredItems;
};
