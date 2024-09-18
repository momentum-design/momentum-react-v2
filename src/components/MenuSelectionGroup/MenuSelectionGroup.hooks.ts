import { useMenuAppearanceContext } from '../Menu/Menu';
import { MenuSelectionGroupSelectedStyle, MenuSelectionItemSelectedStyle} from './MenuSelectionGroup.types';

export const useMenuSelectionGroupSelectedStyle = ({selectionTickPosition, selectionClassNameWhenSelected}: MenuSelectionGroupSelectedStyle): MenuSelectionItemSelectedStyle=> {
    const { tickPosition: menuTickPosition, classNameWhenSelected: menuClassNameWhenSelected } = useMenuAppearanceContext();

    return {tickPosition: selectionTickPosition || menuTickPosition, classNameWhenSelected: selectionClassNameWhenSelected || menuClassNameWhenSelected};
};