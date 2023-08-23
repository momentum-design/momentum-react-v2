import { IconScale } from '../../Icon/Icon.types';
import { FontStyle } from '../../Text/Text.types';

export const getTextTypeFromButtonPillSize = (buttonPillSize: number): FontStyle => {
  let textType;

  switch (buttonPillSize) {
    case 20:
    case 24:
      textType = 'body-compact';
      break;
    case 28:
      textType = 'subheader-secondary';
      break;
    case 32:
    case 40:
    default:
      textType = 'subheader-primary';
      break;
  }

  return textType;
};

export const getIconScaleFromButtonPillSize = (buttonPillSize: number): IconScale => {
  let iconScale;

  switch (buttonPillSize) {
    case 20:
    case 24:
    case 28:
    case 32:
      iconScale = 16;
      break;
    case 40:
    default:
      iconScale = 20;
      break;
  }

  return iconScale;
};
