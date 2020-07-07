const colors = require("./colors");

const button = {
    primary: {
        lightUi: { value: colors.blue[60].name, dark: false },
        darkUi: { value: colors.blue[60].name, dark: true },
        hover: {
            lightUi: { value: colors.blue[70].name, dark: false },
            darkUi: { value: colors.blue[70].name, dark: true },
        },
        pressed: {
            lightUi: { value: colors.blue[80].name, dark: false },
            darkUi: { value: colors.blue[80].name, dark: true },  
        },
        outline: {
            lightUi: { value: colors.blue[70].name, dark: false },
            darkUi: { value: colors.blue[40].name, dark: true },
        },
    },
    secondary: {
        lightUi: { value: colors.gray[20].name, dark: false },
        darkUi: { value: colors.gray[60].name, dark: true },
        hover: {
            lightUi: { value: colors.gray[30].name, dark: false },
            darkUi: { value: colors.gray[70].name, dark: true },
        },
        pressed: {
            lightUi: { value: colors.gray[40].name, dark: false },
            darkUi: { value: colors.gray[80].name, dark: true },  
        },
        outline: {
            lightUi: { value: colors.gray[70].name, dark: false },
            darkUi: { value: colors.gray[40].name, dark: true },
        },
    },
};
  
  module.exports = button;
  