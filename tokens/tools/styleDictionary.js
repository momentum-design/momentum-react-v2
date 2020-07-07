  
const StyleDictionary = require('style-dictionary');

// Required dependency
// const tokensConfig = StyleDictionary.extend('./tools/config.json');
  
const colorTokensConfig = StyleDictionary.extend({
    "source": ["./dist/colors/colors.json"],
    "platforms": {
      "ColorVariables": {
        "transformGroup": "scss",
        "prefix": "md",
        "comment": "File type: SCSS; variable type: Sass",
        "buildPath": "./build/scss/color/",
        "files": [
          {
            "destination": "baseColorVariables.scss",
            "format": "scss/variables"
          }
        ]
      }
    }
});

const themeColorTokensConfig = StyleDictionary.extend({
    "source": ["./dist/colors/components/*.json"],
    "platforms": {
      "ColorVariables": {
        "transformGroup": "scss",
        "prefix": "md",
        "comment": "File type: SCSS; variable type: Sass",
        "buildPath": "./build/scss/color/",
        "files": [
          {
            "destination": "colorVariables.scss",
            "format": "scss/variables"
          }
        ]
      }
    }
});

const scssConfig = StyleDictionary.extend({
    "source": ["./dist/*.json"],
    "platforms": {
        "scssVariables": {
        "transformGroup": "scss",
        "prefix": "md-button",
        "comment": "File type: SCSS; variable type: Sass",
        "buildPath": "./build/scss/",
        "files": [
            {
            "destination": "scssVariables.scss",
            "format": "scss/variables"
            }
        ]
        }
    }
});

const scssVarsConfig = StyleDictionary.extend({
    "source": ["./dist/*.json"],
    "platforms": {
        "scssVariables": {
        "transformGroup": "scss",
        "prefix": "md-button",
        "comment": "File type: SCSS; variable type: Sass",
        "buildPath": "./build/vars/",
        "files": [
            {
            "destination": "scssVars.scss",
            "format": "css/variables"
            }
        ]
        }
    }
});


const colorVarsConfig = StyleDictionary.extend({
    "source": ["./dist/colors/colors.json"],
    "platforms": {
        "cssVariables": {
            "transformGroup": "scss",
            "dependency": "../build/scss/color/baseColorVariables.scss",
            "prefix": "md",
            "comment": "File type: CSS; variable type: css",
            "buildPath": "./build/vars/",
            "files": [
                {
                "destination": "baseColorVars.scss",
                "format": "css/variables"
                }
            ]
        }
    }
});

const themeColorVarsConfig = StyleDictionary.extend({
    "source": ["./dist/colors/components/*.json"],
    "platforms": {
        "cssVariables": {
            "transformGroup": "scss",
            "dependency": "../build/SCSSVariables.scss",
            "prefix": "md",
            "comment": "File type: CSS; variable type: css",
            "buildPath": "./build/vars/",
            "files": [
                {
                "destination": "componentColorVars.scss",
                "format": "css/variables"
                }
            ]
        }
    }
});

// Style Dictionary build function
colorTokensConfig.buildAllPlatforms();
themeColorTokensConfig.buildAllPlatforms();
scssConfig.buildAllPlatforms();
scssVarsConfig.buildAllPlatforms();
colorVarsConfig.buildAllPlatforms();
themeColorVarsConfig.buildAllPlatforms();

