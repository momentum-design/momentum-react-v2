import {IComboBoxGroup, IComboBoxItem} from './ComboBox.types';

export const handleFilter = (comboBoxGroup:IComboBoxGroup[],inputValue:string):IComboBoxGroup[] => {
    const queryLowerCase = inputValue.toLowerCase().trim();
    const filterItem = Array.prototype.map.call(comboBoxGroup,(group:IComboBoxGroup) => {
        return {
            ...group,
            items: group.items.filter((item) => item.label?.toLowerCase()?.includes(queryLowerCase)),
        };
    }).filter((group:IComboBoxGroup) => group.items?.length > 0);

    return filterItem;
};

export const searchItem = (key: string,originComboBoxGroups:IComboBoxGroup[]) : IComboBoxItem | undefined => {
    let target: IComboBoxItem | undefined;
    key && Array.prototype.some.call(originComboBoxGroups,(group: IComboBoxGroup) => {
        const foundItem = group.items.find((item: IComboBoxItem) => item.key === key);
        if (foundItem) {
            target = foundItem;
            return true;
        }
        return false;
    });
    return target ?? {key:undefined,label:undefined};
};

export const getSumScrollTop = (element:Element):number => {
    let sum = 0;
    while (element) {
        element = element.parentElement;
        if (element) {
            const scrollTop = Number.isNaN(element.scrollTop) ? 0 : element.scrollTop;
            sum += scrollTop ;
        }
    }
    return sum;
};
