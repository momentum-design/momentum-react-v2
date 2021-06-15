const path = require('path');
const copyExamples = require('./coreCopyExamples');

const libraryDirectory = path.resolve(__dirname, '../src/lib');
const examplesDirectory = path.resolve(__dirname, '../examples');

copyExamples(libraryDirectory, examplesDirectory);
