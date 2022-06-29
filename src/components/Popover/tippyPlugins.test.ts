import { hideOnEscPlugin } from './tippyPlugins';

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
});
