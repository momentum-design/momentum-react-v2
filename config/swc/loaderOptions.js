const swcLoaderOptions = (lang, mode, isHMROn = false) => {
  const isTest = mode === 'test';
  const parser =
    lang === 'typescript'
      ? {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        }
      : {
          syntax: 'ecmascript',
          jsx: true,
          decorators: true,
          dynamicImport: true,
        };

  const plugins = [];
  let env;

  if (isTest) {
    plugins.push(['swc_mut_cjs_exports', {}]);

    env = {
      target: `node ${process.version}`,
    };
  } else {
    env = {
      target: 'defaults',
      mode: 'entry',
      coreJs: '3',
      dynamicImport: true,
      shippedProposals: true,
      debug: false,
    };
  }

  return {
    module: {
      type: 'commonjs',
      ignoreDynamic: !isTest,
    },
    isModule: true,
    env,
    jsc: {
      parser,
      experimental: {
        plugins,
      },
      transform: {
        legacyDecorator: true,
        react: {
          development: mode === 'development',
          refresh: isHMROn,
          runtime: 'classic',
        },
      },
    },
  };
};

module.exports = {
    swcLoaderOptions
};