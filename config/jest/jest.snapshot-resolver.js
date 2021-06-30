module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) => testPath.replace('.test', snapshotExtension),
  resolveTestPath: (snapshotFilePath, snapshotExtension) => snapshotFilePath.replace(snapshotExtension, '.test'),
  testPathForConsistencyCheck: 'some/example.unit.test.tsx',
};
