const colors = require("./colors");

const button = {
    primary: {
        lightUi: { value: colors.blue[60].name },
        darkUi: { value: colors.blue[60].name },
        hover: {
            lightUi: { value: colors.blue[70].name },
            darkUi: { value: colors.blue[70].name },
        },
        pressed: {
            lightUi: { value: colors.blue[80].name },
            darkUi: { value: colors.blue[80].name },
        },
        outline: {
            lightUi: { value: colors.blue[70].name },
            darkUi: { value: colors.blue[40].name },
        },
    },
    secondary: {
        lightUi: { value: colors.gray[20].name },
        darkUi: { value: colors.gray[60].name },
        hover: {
            lightUi: { value: colors.gray[30].name },
            darkUi: { value: colors.gray[70].name },
        },
        pressed: {
            lightUi: { value: colors.gray[40].name },
            darkUi: { value: colors.gray[80].name },
        },
        outline: {
            lightUi: { value: colors.gray[70].name },
            darkUi: { value: colors.gray[40].name },
        },
    },
    green: {
        lightUi: { value: colors.green[60].name },
        darkUi: { value: colors.green[60].name },
        hover: {
            lightUi: { value: colors.green[70].name },
            darkUi: { value: colors.green[70].name },
        },
        pressed: {
            lightUi: { value: colors.green[80].name },
            darkUi: { value: colors.green[80].name },
        },
        outline: {
            lightUi: { value: colors.green[70].name },
            darkUi: { value: colors.green[40].name },
        },
    },
    white: {
        lightUi: { value: colors.white.name },
        hover: {
            lightUi: { value: colors.gray['05'].name },
        },
        pressed: {
            lightUi: { value: colors.gray[10].name },
        },
    },
    darkGray: {
        darkUi: { value: colors.gray[80].name },
        hover: {
            darkUi: { value: colors.gray[90].name },
        },
        pressed: {
            darkUi: { value: colors.gray[95].name },
        },
    },
    red: {
        lightUi: { value: colors.red[60].name },
        darkUi: { value: colors.red[60].name },
        hover: {
            lightUi: { value: colors.red[70].name },
            darkUi: { value: colors.red[70].name },
        },
        pressed: {
            lightUi: { value: colors.red[80].name },
            darkUi: { value: colors.red[80].name },
        },
        outline: {
            lightUi: { value: colors.red[70].name },
            darkUi: { value: colors.red[40].name },
        },
    },
    disabled: {
        lightUi: { value: colors.gray[20].name },
        darkUi: { value: colors.gray[90].name },
    },
    focusRing: {
        lightUi: { value: colors.blue[60].name },
        darkUi: { value: colors.blue[40].name },
    },
    text: {
        primary: {
            lightUi: { value: colors.gray['05'].name },
            darkUi: { value: colors.gray['05'].name },
            outline: {
                lightUi: { value: colors.blue[70].name },
                darkUi: { value: colors.blue[40].name },
            },
        },
        secondary: {
            lightUi: { value: colors.gray[100].name },
            darkUi: { value: colors.gray['05'].name },
            outline: {
                lightUi: { value: colors.blue[70].name },
                darkUi: { value: colors.blue[40].name },
            },
        },
        green: {
            lightUi: { value: colors.gray['05'].name },
            darkUi: { value: colors.gray['05'].name },
            outline: {
                lightUi: { value: colors.green[70].name },
                darkUi: { value: colors.green[40].name },
            },
        },
        red: {
            lightUi: { value: colors.gray['05'].name },
            darkUi: { value: colors.gray['05'].name },
            outline: {
                lightUi: { value: colors.red[70].name },
                darkUi: { value: colors.red[40].name },
            },
        },
        disabled: {
            lightUi: { value: colors.gray[40].name },
            darkUi: { value: colors.gray[70].name },
        },
    },
};
  
  module.exports = button;
  