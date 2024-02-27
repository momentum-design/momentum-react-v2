import {IComboboxGroup, IComboboxItem} from './Combobox.types'

export const handleFilter = (comboboxGroup:IComboboxGroup[],inputValue:string):IComboboxGroup[] => {
    const queryLowerCase = inputValue.toLowerCase().trim();
    const filterItem = Array.prototype.map.call(comboboxGroup,(group:IComboboxGroup) => {
        return {
            ...group,
            items: group.items.filter((item) => item.label?.toLowerCase()?.includes(queryLowerCase)),
        };
    }).filter((group:IComboboxGroup) => group.items?.length > 0);

    return filterItem;
};

export const searchItem = (key: string,originComboboxGroups:IComboboxGroup[]) : IComboboxItem | undefined => {
    let target: IComboboxItem | undefined;
    Array.prototype.some.call(originComboboxGroups,(group: IComboboxGroup) => {
        const foundItem = group.items.find((item: IComboboxItem) => item.key === key);
        if (foundItem) {
            target = foundItem;
            return true;
        }
        return false;
    });
    return target ?? {key:undefined,label:undefined};
};
