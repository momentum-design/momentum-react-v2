import { IconLibrary } from 'src/components/Icon/Icon.types';
import { useDynamicSVGImport } from './useDynamicSVGImport';
import { renderHook } from '@testing-library/react-hooks';

describe('Icon', () => {
  beforeEach(() => jest.resetModules());

  it.each(['icons', 'brand-visuals'] as IconLibrary[])(
    'should successfully return %s library svg component if icon exists',
    async (library) => {
      const name = '3d-object-regular';
      const onCompleteMock = jest.fn();
      const onErrorMock = jest.fn();
      const mockSVG = 'SVG_CONTENT';
      jest.mock(
        `@momentum-design/${library}/dist/svg/3d-object-regular.svg?svgr`,
        () => {
          return { ReactComponent: mockSVG };
        },
        { virtual: true }
      );

      const hook = renderHook(() =>
        useDynamicSVGImport(
          name,
          {
            onCompleted: onCompleteMock,
            onError: onErrorMock,
          },
          library
        )
      );
      expect(hook.result.current.loading).toBe(true);

      await hook.waitForNextUpdate();

      expect(onCompleteMock).toBeCalledTimes(1);
      expect(onCompleteMock).toBeCalledWith(name, mockSVG);
      expect(onErrorMock).not.toBeCalled();
      expect(hook.result.current.SvgIcon).toEqual(mockSVG);
      expect(hook.result.current.error).toBeUndefined();
      expect(hook.result.current.loading).toBe(false);
    }
  );

  it('should return error component does not exist', async () => {
    const name = 'bad_icon';
    const onCompleteMock = jest.fn();
    const onErrorMock = jest.fn();
    const expectedError = new Error('error');

    jest.mock(
      '@momentum-design/icons/dist/svg/bad_icon.svg?svgr',
      () => {
        throw expectedError;
      },
      { virtual: true }
    );

    const hook = renderHook(() =>
      useDynamicSVGImport(
        name,
        {
          onCompleted: onCompleteMock,
          onError: onErrorMock,
        },
        'icons'
      )
    );
    expect(hook.result.current.loading).toBe(true);

    await hook.waitForNextUpdate();

    expect(onCompleteMock).not.toBeCalled();

    expect(onErrorMock).toBeCalled();
    expect(onErrorMock).toBeCalledWith(expectedError);
    expect(hook.result.current.SvgIcon).toEqual(undefined);
    expect(hook.result.current.error).toEqual(expectedError);
    expect(hook.result.current.loading).toBe(false);
  });
});
