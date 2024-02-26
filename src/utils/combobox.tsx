import {IComboboxGroup} from '../components/Combobox/Combobox.types'

export const handleFilter = (comboboxGroup:IComboboxGroup[],inputValue:string):IComboboxGroup[]=>{
    const queryLowerCase = inputValue.toLowerCase().trim();
    const filterItem = Array.prototype.map.call(comboboxGroup,(group:IComboboxGroup) => {
        return {
            ...group,
            items: group.items.filter((item) => item.label?.toLowerCase()?.includes(queryLowerCase)),
        };
    }).filter((group:IComboboxGroup) => group.items?.length > 0);

    return filterItem;
};