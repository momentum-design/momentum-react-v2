import border from '../core/border';
import { getColor } from '../core/colors';
import font from '../core/font';
import lineHeight from '../core/lineHeight';
import radius from '../core/radius';

const buttonHeights = {
  small: `28px`,
  medium: `36px`,
  large: `40px`,
  xLarge: `56px`,
  xxLarge: `64px`,
  xxxLarge: `80px`,
};

const pillSizes = {
  small: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `7px`,
      paddingRight: `14px`,
      paddingBottom: `7px`,
      paddingLeft: `14px`,
      paddingInner: `8px`,
    },
    font: {
      size: font.fontSize.small,
      weight: font.fontWeight.regular,
    },
    lineHeight: {
      lineHeight: lineHeight.reset,
    },
  },
  medium: {
    height: buttonHeights.medium,
    spacing: {
      paddingTop: `11px`,
      paddingRight: `18px`,
      paddingBottom: `11px`,
      paddingLeft: `18px`,
      paddingInner: `8px`,
    },
    font: {
      size: font.fontSize.small,
      weight: font.fontWeight.regular,
    },
    lineHeight: {
      lineHeight: lineHeight.reset,
    },
  },
  large: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `13px`,
      paddingRight: `20px`,
      paddingBottom: `13px`,
      paddingLeft: `20px`,
      paddingInner: `8px`,
    },
    font: {
      size: font.fontSize.small,
      weight: font.fontWeight.regular,
    },
    lineHeight: {
      lineHeight: lineHeight.reset,
    },
  },
  xLarge: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `16px`,
      paddingRight: `28px`,
      paddingBottom: `16px`,
      paddingLeft: `28px`,
      paddingInner: `8px`,
    },
    font: {
      size: font.fontSize.small,
      weight: font.fontWeight.regular,
    },
    lineHeight: {
      lineHeight: lineHeight.reset,
    },
  },
};

const circleSizes = {
  small: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `8px`,
      paddingRight: `8px`,
      paddingBottom: `8px`,
      paddingLeft: `8px`,
    },
  },
  medium: {
    height: buttonHeights.medium,
    spacing: {
      paddingTop: `11px`,
      paddingRight: `18px`,
      paddingBottom: `11px`,
      paddingLeft: `18px`,
    },
  },
  large: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `13px`,
      paddingRight: `20px`,
      paddingBottom: `13px`,
      paddingLeft: `20px`,
    },
  },
  xLarge: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `16px`,
      paddingRight: `28px`,
      paddingBottom: `16px`,
      paddingLeft: `28px`,
    },
  },
  xxLarge: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `7px`,
      paddingRight: `14px`,
      paddingBottom: `7px`,
      paddingLeft: `14px`,
    },
  },
  xxxLarge: {
    height: buttonHeights.small,
    spacing: {
      paddingTop: `7px`,
      paddingRight: `14px`,
      paddingBottom: `7px`,
      paddingLeft: `14px`,
    },
  },
};

const colors = {
  fonts: {
    light: {
      normal: getColor('white'),
      disabled: getColor('gray', '40'),
    },
    dark: {
      normal: getColor('gray', '100'),
      disabled: getColor('gray', '60'),
    },
  },
  states: {
    brand: {
      light: {
        normal: getColor('brand', '50'),
        hover: getColor('brand', '60'),
        press: getColor('brand', '70'),
      },
      dark: {
        normal: getColor('brand', '60'),
        hover: getColor('brand', '70'),
        press: getColor('brand', '80'),
      },
    },
    blue: {
      light: {
        normal: getColor('blue', '50'),
        hover: getColor('blue', '60'),
        press: getColor('blue', '70'),
      },
      dark: {
        normal: getColor('blue', '60'),
        hover: getColor('blue', '70'),
        press: getColor('blue', '80'),
      },
    },
    red: {
      light: {
        normal: getColor('red', '50'),
        hover: getColor('red', '60'),
        press: getColor('red', '70'),
      },
      dark: {
        normal: getColor('red', '60'),
        hover: getColor('red', '70'),
        press: getColor('red', '80'),
      },
    },
    green: {
      light: {
        normal: getColor('green', '50'),
        hover: getColor('green', '60'),
        press: getColor('green', '70'),
      },
      dark: {
        normal: getColor('green', '60'),
        hover: getColor('green', '70'),
        press: getColor('green', '80'),
      },
    },
    yellow: {
      light: {
        normal: getColor('yellow', '50'),
        hover: getColor('yellow', '60'),
        press: getColor('yellow', '70'),
      },
      dark: {
        normal: getColor('yellow', '60'),
        hover: getColor('yellow', '70'),
        press: getColor('yellow', '80'),
      },
    },
    lightGray: {
      light: {
        normal: getColor('gray', '20'),
        hover: getColor('gray', '40'),
        press: getColor('gray', '50'),
      },
      dark: {
        normal: getColor('gray', '30'),
        hover: getColor('gray', '40'),
        press: getColor('gray', '50'),
      },
    },
    darkGray: {
      light: {
        normal: getColor('gray', '80'),
        hover: getColor('gray', '90'),
        press: getColor('gray', '100'),
      },
      dark: {
        normal: getColor('gray', '70'),
        hover: getColor('gray', '80'),
        press: getColor('gray', '90'),
      },
    },
    white: {
      light: {
        normal: getColor('white'),
        hover: getColor('gray', '10'),
        press: getColor('gray', '20'),
      },
      dark: {
        normal: getColor('white'),
        hover: getColor('gray', '10'),
        press: getColor('gray', '20'),
      },
    },
    disabled: {
      light: getColor('gray', '20'),
      dark:  getColor('gray', '80'),
    }
  },
};

const disabled = {
  cursor: `not-allowed`,
  light: {
    fontColor: {
      normal: colors.fonts.light.disabled,
      hover: colors.fonts.light.disabled,
      press: colors.fonts.light.disabled,
    },
    iconColor: {
      normal: colors.fonts.light.disabled,
      hover: colors.fonts.light.disabled,
      press: colors.fonts.light.disabled,
    },
  },
  dark: {
    fontColor: {
      normal: colors.fonts.dark.disabled,
      hover: colors.fonts.dark.disabled,
      press: colors.fonts.dark.disabled,
    },
    iconColor: {
      normal: colors.fonts.dark.disabled,
      hover: colors.fonts.dark.disabled,
      press: colors.fonts.dark.disabled,
    },
  },
};

const filled = {
  sizing: {
    border: border.none,
  },
  brand: {
    color: {
      fontColor: colors.fonts.light.normal,
      iconColor: colors.fonts.light.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.brand.light.normal,
          hover: colors.states.brand.light.hover,
          press: colors.states.brand.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.brand.dark.normal,
          hover: colors.states.brand.dark.hover,
          press: colors.states.brand.dark.press,
        },
      },
    },
  },
  blue: {
    color: {
      fontColor: colors.fonts.light.normal,
      iconColor: colors.fonts.light.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.blue.light.normal,
          hover: colors.states.blue.light.hover,
          press: colors.states.blue.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.blue.dark.normal,
          hover: colors.states.blue.dark.hover,
          press: colors.states.blue.dark.press,
        },
      },
    },
  },
  red: {
    color: {
      fontColor: colors.fonts.light.normal,
      iconColor: colors.fonts.light.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.red.light.normal,
          hover: colors.states.red.light.hover,
          press: colors.states.red.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.red.dark.normal,
          hover: colors.states.red.dark.hover,
          press: colors.states.red.dark.press,
        },
      },
    },
  },
  green: {
    color: {
      fontColor: colors.fonts.light.normal,
      iconColor: colors.fonts.light.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.green.light.normal,
          hover: colors.states.green.light.hover,
          press: colors.states.green.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.green.dark.normal,
          hover: colors.states.green.dark.hover,
          press: colors.states.green.dark.press,
        },
      },
    },
  },
  yellow: {
    color: {
      fontColor: colors.fonts.light.normal,
      iconColor: colors.fonts.light.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.yellow.light.normal,
          hover: colors.states.yellow.light.hover,
          press: colors.states.yellow.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.yellow.dark.normal,
          hover: colors.states.yellow.dark.hover,
          press: colors.states.yellow.dark.press,
        },
      },
    },
  },
  lightGray: {
    color: {
      fontColor: colors.fonts.dark.normal,
      iconColor: colors.fonts.dark.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.lightGray.light.normal,
          hover: colors.states.lightGray.light.hover,
          press: colors.states.lightGray.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.lightGray.dark.normal,
          hover: colors.states.lightGray.dark.hover,
          press: colors.states.lightGray.dark.press,
        },
      },
    },
  },
  darkGray: {
    color: {
      fontColor: colors.fonts.light.normal,
      iconColor: colors.fonts.light.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.darkGray.light.normal,
          hover: colors.states.darkGray.light.hover,
          press: colors.states.darkGray.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.darkGray.dark.normal,
          hover: colors.states.darkGray.dark.hover,
          press: colors.states.darkGray.dark.press,
        },
      },
    },
  },
  white: {
    color: {
      fontColor: colors.fonts.dark.normal,
      iconColor: colors.fonts.dark.normal,
      borderColor: `transparent`,
      light: {
        backgroundColor: {
          normal: colors.states.white.light.normal,
          hover: colors.states.white.light.hover,
          press: colors.states.white.light.press,
        },
      },
      dark: {
        backgroundColor: {
          normal: colors.states.white.dark.normal,
          hover: colors.states.white.dark.hover,
          press: colors.states.white.dark.press,
        },
      },
    },
  },
  disabled: {
    ...disabled,
    light: {
      backgroundColor: {
        normal: colors.states.disabled.light,
        hover: colors.states.disabled.light,
        press: colors.states.disabled.light,
      },
      ...disabled.light,
    },
    dark: {
      backgroundColor: {
        normal: colors.states.disabled.dark,
        hover: colors.states.disabled.dark,
        press: colors.states.disabled.dark,
      },
      ...disabled.dark,
    },
  },
};

const outline = {
  sizing: {
    border: border.small,
  },
  brand: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.brand.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.brand.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.brand.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.brand.light.hover,
          press: colors.states.brand.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.brand.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.brand.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.brand.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.brand.dark.hover,
          press: colors.states.brand.dark.press,
        },
      },
    },
  },
  blue: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.blue.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.blue.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.blue.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.blue.light.hover,
          press: colors.states.blue.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.blue.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.blue.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.blue.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.blue.dark.hover,
          press: colors.states.blue.dark.press,
        },
      },
    },
  },
  red: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.red.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.red.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.red.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.red.light.hover,
          press: colors.states.red.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.red.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.red.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.red.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.red.dark.hover,
          press: colors.states.red.dark.press,
        },
      },
    },
  },
  green: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.green.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.green.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.green.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.green.light.hover,
          press: colors.states.green.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.green.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.green.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.green.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.green.dark.hover,
          press: colors.states.green.dark.press,
        },
      },
    },
  },
  yellow: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.yellow.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.yellow.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.yellow.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.yellow.light.hover,
          press: colors.states.yellow.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.yellow.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.yellow.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.yellow.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.yellow.dark.hover,
          press: colors.states.yellow.dark.press,
        },
      },
    },
  },
  lightGray: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.lightGray.light.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        iconColor: {
          normal: colors.states.lightGray.light.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        borderColor: {
          normal: colors.states.lightGray.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.lightGray.light.hover,
          press: colors.states.lightGray.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.lightGray.dark.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        iconColor: {
          normal: colors.states.lightGray.dark.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        borderColor: {
          normal: colors.states.lightGray.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.lightGray.dark.hover,
          press: colors.states.lightGray.dark.press,
        },
      },
    },
  },
  darkGray: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.darkGray.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.darkGray.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.darkGray.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.darkGray.light.hover,
          press: colors.states.darkGray.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.darkGray.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.darkGray.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        borderColor: {
          normal: colors.states.darkGray.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.darkGray.dark.hover,
          press: colors.states.darkGray.dark.press,
        },
      },
    },
  },
  white: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.white.light.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        iconColor: {
          normal: colors.states.white.light.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        borderColor: {
          normal: colors.states.white.light.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.white.light.hover,
          press: colors.states.white.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.white.dark.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        iconColor: {
          normal: colors.states.white.dark.normal,
          hover: colors.fonts.dark.normal,
          press: colors.fonts.dark.normal,
        },
        borderColor: {
          normal: colors.states.white.dark.normal,
          hover: `transparent`,
          press: `transparent`,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.white.dark.hover,
          press: colors.states.white.dark.press,
        },
      },
    },
  },
  disabled: {
    ...disabled,
    light: {
      backgroundColor: {
        normal: `transparent`,
        hover: `transparent`,
        press: `transparent`,
      },
      ...disabled.light,
    },
    dark: {
      backgroundColor: {
        normal: `transparent`,
        hover: `transparent`,
        press: `transparent`,
      },
      ...disabled.dark,
    },
  },
};

const ghost = {
  sizing: {
    border: border.none,
  },
  brand: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.brand.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.brand.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.brand.light.hover,
          press: colors.states.brand.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.brand.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.brand.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.brand.dark.hover,
          press: colors.states.brand.dark.press,
        },
      },
    },
  },
  blue: {
    color: {
      light: {
        fontColor: {
          normal: colors.states.blue.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.blue.light.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.blue.light.hover,
          press: colors.states.blue.light.press,
        },
      },
      dark: {
        fontColor: {
          normal: colors.states.blue.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        iconColor: {
          normal: colors.states.blue.dark.normal,
          hover: colors.fonts.light.normal,
          press: colors.fonts.light.normal,
        },
        backgroundColor: {
          normal: `transparent`,
          hover: colors.states.blue.dark.hover,
          press: colors.states.blue.dark.press,
        },
      },
    },
  },
};

const buttonTokens = {
  pill: {
    filled,
    outline,
    ghost,
    radius: {
      borderRadius: radius.pill,
    },
    small: pillSizes.small,
    medium: pillSizes.medium,
    large: pillSizes.large,
  },
  // circle: {
  //   filled,
  //   outline,
  //   ghost,
  //   radius: {
  //     borderRadius: radius.circle,
  //   },
  //   small: circleSizes.small,
  //   medium: circleSizes.medium,
  //   large: circleSizes.large,
  //   xLarge: circleSizes.large,
  //   xxLarge: circleSizes.large,
  //   xxxLarge: circleSizes.large,
  // },
};

export default buttonTokens;

