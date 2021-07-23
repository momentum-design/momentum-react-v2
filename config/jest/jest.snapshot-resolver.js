module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) => `${testPath}${snapshotExtension}`,
  // resolveSnapshotPath: (testPath, snapshotExtension) => `${testPath.replace('.test', snapshotExtension)}${snapshotExtension}`, //testPath.replace(/\.(test|spec)$\.([tj]sx?)/, `.test.$1${snapshotExtension}`),
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, ''),
  // resolveTestPath: (snapshotFilePath, snapshotExtension) => snapshotFilePath.replace(snapshotExtension, ''),
  testPathForConsistencyCheck: 'some/example.unit.test.tsx',
};
