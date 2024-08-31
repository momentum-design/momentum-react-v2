import { addTippyPlugins } from './Popover.utils';
import { hideOnEscPlugin } from './tippy-plugins/hideOnEscPlugin';
import { addBackdropPlugin } from './tippy-plugins/backdropPlugin';
import { hideOnPopperBlurPlugin } from './tippy-plugins/hideOnPopperBlurPlugin';

describe('addTippyPlugins', () => {
  it.each([
    { hideOnEsc: false, hideOnBlur: false, addBackdrop: false, expected: [] },
    { hideOnEsc: true, hideOnBlur: false, addBackdrop: false, expected: [hideOnEscPlugin] },
    { hideOnEsc: false, hideOnBlur: true, addBackdrop: false, expected: [hideOnPopperBlurPlugin] },
    { hideOnEsc: false, hideOnBlur: false, addBackdrop: true, expected: [addBackdropPlugin] },
    {
      hideOnEsc: true,
      hideOnBlur: true,
      addBackdrop: false,
      expected: [hideOnEscPlugin, hideOnPopperBlurPlugin],
    },
    {
      hideOnEsc: true,
      hideOnBlur: false,
      addBackdrop: true,
      expected: [hideOnEscPlugin, addBackdropPlugin],
    },
    {
      hideOnEsc: false,
      hideOnBlur: true,
      addBackdrop: true,
      expected: [addBackdropPlugin, hideOnPopperBlurPlugin],
    },
    {
      hideOnEsc: true,
      hideOnBlur: true,
      addBackdrop: true,
      expected: [hideOnEscPlugin, addBackdropPlugin, hideOnPopperBlurPlugin],
    },
  ])(
    'should return $expected when hideOnEsc is $hideOnEsc, hideOnBlur is $hideOnBlur, and addBackdrop is $addBackdrop',
    ({ hideOnEsc, hideOnBlur, addBackdrop, expected }) => {
      const result = addTippyPlugins(hideOnEsc, hideOnBlur, addBackdrop);
      expect(result).toEqual(expected);
    }
  );
});
