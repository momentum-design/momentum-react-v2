import { addTippyPlugins } from './Popover.utils';
import { hideOnEscPlugin } from './tippy-plugins/hideOnEscPlugin';
import { addBackdropPlugin } from './tippy-plugins/backdropPlugin';
import { hideOnBlurPlugin } from './tippy-plugins/hideOnBlurPlugin';
import { getSingleOpenPlugin } from './tippy-plugins/singleOpenPlugin';

describe('addTippyPlugins', () => {
  it.each([
    {
      hideOnEsc: false,
      hideOnBlur: false,
      addBackdrop: false,
      singleOpenGroupId: undefined,
      expected: [],
    },
    {
      hideOnEsc: true,
      hideOnBlur: false,
      addBackdrop: false,
      singleOpenGroupId: undefined,
      expected: [hideOnEscPlugin],
    },
    {
      hideOnEsc: false,
      hideOnBlur: true,
      addBackdrop: false,
      singleOpenGroupId: undefined,
      expected: [hideOnBlurPlugin],
    },
    {
      hideOnEsc: false,
      hideOnBlur: false,
      addBackdrop: true,
      singleOpenGroupId: undefined,
      expected: [addBackdropPlugin],
    },
    {
      hideOnEsc: true,
      hideOnBlur: true,
      addBackdrop: false,
      singleOpenGroupId: undefined,
      expected: [hideOnEscPlugin, hideOnBlurPlugin],
    },
    {
      hideOnEsc: true,
      hideOnBlur: false,
      addBackdrop: true,
      singleOpenGroupId: undefined,
      expected: [hideOnEscPlugin, addBackdropPlugin],
    },
    {
      hideOnEsc: false,
      hideOnBlur: true,
      addBackdrop: true,
      singleOpenGroupId: undefined,
      expected: [addBackdropPlugin, hideOnBlurPlugin],
    },
    {
      hideOnEsc: true,
      hideOnBlur: true,
      addBackdrop: true,
      singleOpenGroupId: undefined,
      expected: [hideOnEscPlugin, addBackdropPlugin, hideOnBlurPlugin],
    },
    {
      hideOnEsc: false,
      hideOnBlur: false,
      addBackdrop: false,
      singleOpenGroupId: 'group1',
      expected: [getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: true,
      hideOnBlur: false,
      addBackdrop: false,
      singleOpenGroupId: 'group1',
      expected: [hideOnEscPlugin, getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: false,
      hideOnBlur: true,
      addBackdrop: false,
      singleOpenGroupId: 'group1',
      expected: [hideOnBlurPlugin, getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: false,
      hideOnBlur: false,
      addBackdrop: true,
      singleOpenGroupId: 'group1',
      expected: [addBackdropPlugin, getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: true,
      hideOnBlur: true,
      addBackdrop: false,
      singleOpenGroupId: 'group1',
      expected: [hideOnEscPlugin, hideOnBlurPlugin, getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: true,
      hideOnBlur: false,
      addBackdrop: true,
      singleOpenGroupId: 'group1',
      expected: [hideOnEscPlugin, addBackdropPlugin, getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: false,
      hideOnBlur: true,
      addBackdrop: true,
      singleOpenGroupId: 'group1',
      expected: [addBackdropPlugin, hideOnBlurPlugin, getSingleOpenPlugin('group1')],
    },
    {
      hideOnEsc: true,
      hideOnBlur: true,
      addBackdrop: true,
      singleOpenGroupId: 'group1',
      expected: [
        hideOnEscPlugin,
        addBackdropPlugin,
        hideOnBlurPlugin,
        getSingleOpenPlugin('group1'),
      ],
    },
  ])(
    'should return $expected when hideOnEsc is $hideOnEsc, hideOnBlur is $hideOnBlur, addBackdrop is $addBackdrop, and singleOpenGroupId is $singleOpenGroupId',
    ({ hideOnEsc, hideOnBlur, addBackdrop, singleOpenGroupId, expected }) => {
      const result = addTippyPlugins(hideOnEsc, hideOnBlur, addBackdrop, singleOpenGroupId);
      expect(result).toEqual(expected);
    }
  );
});
