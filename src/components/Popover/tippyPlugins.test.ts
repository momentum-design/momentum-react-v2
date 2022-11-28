import { hideOnEscPlugin, addBackdrop } from './tippyPlugins';

describe('tippyPlugins', () => {
  describe('hideOnEscPlugin', () => {
    it('should return plugin correctly', () => {
      expect(hideOnEscPlugin).toStrictEqual({
        name: 'hideOnEsc',
        defaultValue: true,
        fn: expect.any(Function),
      });
    });
  });

  describe('addBackdrop', () => {
    it('should return plugin correctly', () => {
      expect(addBackdrop).toStrictEqual({
        name: 'addBackdrop',
        fn: expect.any(Function),
      });
    });
  });
});
