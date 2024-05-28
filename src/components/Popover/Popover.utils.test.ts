import { addTippyPlugins } from './Popover.utils';
import { hideOnEscPlugin } from './tippy-plugins/hideOnEscPlugin';
import { addBackdropPlugin } from './tippy-plugins/backdropPlugin';

describe('addTippyPlugins', () => {
  it.each([
    [true, true, [hideOnEscPlugin, addBackdropPlugin]],
    [true, false, [hideOnEscPlugin]],
    [false, true, [addBackdropPlugin]],
    [false, false, []],
  ])(
    'returns correct array of plugins when hideOnEsc is %s and addBackdrop is %s',
    (hideOnEsc, addBackdrop, expected) => {
      expect(addTippyPlugins(hideOnEsc, addBackdrop)).toEqual(expected);
    }
  );
});
