module.exports = function (plop) {
  plop.setActionType('renameMany', require('./plop-actions/renameMany'));
  plop.setHelper('replace', function (match, replacement, options) {
    let string = options.fn(this);
    return string.replace(match, replacement);
  });

  plop.setHelper('includes', function (array, string) {
    return array.includes(string);
  });

  plop.setHelper('snakeCase', (str) => {
    return str.replace(/[A-Z]/g, (letter, index) => {
      return index == 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
    });
  });

  plop.setHelper('snakeCaseCapital', (str) => {
    return str
      .replace(/[A-Z]/g, (letter, index) => {
        return index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
      })
      .toUpperCase();
  });

  // controller generator
  plop.setGenerator('component', {
    description: 'Add new component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'component name, please use appropriate uppercase (e.g. TextField)',
        validate: (answer) => answer.length > 0,
      },
    ],
    actions: function (data) {
      let { componentName } = data;
      let actions = [];

      actions.push({
        type: 'addMany',
        templateFiles: 'plop-templates/component/**',
        base: 'plop-templates/component',
        destination: `src/components/${componentName}`,
        data: { componentName },
      });
      actions.push({
        type: 'renameMany',
        templateFiles: `src/components/${componentName}/**`,
        renamer: (name) => `${name.replace('Component', componentName)}`,
      });

      return actions;
    },
  });
};
