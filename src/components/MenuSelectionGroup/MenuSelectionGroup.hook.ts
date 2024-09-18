import { useContext } from 'react';
import { useMenuAppearanceContext } from '../Menu/Menu';
import { MenuSelectionGroupAppearanceContextValue } from './MenuSelectionGroup.types';
import { MenuSelectionGroupAppearanceContext } from './MenuSelectionGroup';

export function useMenuSelectionGroupAppearanceContext(): MenuSelectionGroupAppearanceContextValue {

    const { tickPosition: menuTickPosition, classNameWhenSelected: menuClassNameWhenSelected } = useMenuAppearanceContext();

    const {tickPosition, classNameWhenSelected} = useContext(MenuSelectionGroupAppearanceContext);

    return {tickPosition: tickPosition || menuTickPosition, classNameWhenSelected: classNameWhenSelected || menuClassNameWhenSelected};

}