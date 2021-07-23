module.exports = function (plop) {
  plop.setActionType("renameMany", require("./plop-actions/renameMany"));
  plop.setHelper("replace", function (match, replacement, options) {
    let string = options.fn(this);
    return string.replace(match, replacement);
  });

  plop.setHelper("includes", function (array, string) {
    return array.includes(string);
  });

  // controller generator
  plop.setGenerator("component", {
    description: "Add new component",
    prompts: [
      {
        type: "input",
        name: "folderName",
        message: "folder name, all lowercase (e.g. textfield)",
        validate: (answer) => answer.length > 0,
      },
      {
        type: "input",
        name: "componentName",
        message:
          "component name, please use appropriate uppercase (e.g. TextField)",
        validate: (answer) => answer.length > 0,
      },
    ],
    actions: function (data) {
      let {
        folderName,
        componentName,
      } = data;
      let actions = [];

      actions.push({
        type: "addMany",
        templateFiles: "plop-templates/component/**",
        base: "plop-templates/component",
        destination: `src/components/${folderName}`,
        data: { folderName, componentName },
      });
      actions.push({
        type: "renameMany",
        templateFiles: `src/components/${folderName}/**`,
        renamer: (name) => `${name.replace("Component", componentName)}`,
      });

      return actions;
    },
  });
};
