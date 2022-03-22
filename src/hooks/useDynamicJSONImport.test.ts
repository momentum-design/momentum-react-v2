import { renderHook } from '@testing-library/react-hooks';

import { useDynamicJSONImport } from './useDynamicJSONImport';

describe('SVG', () => {
  beforeEach(() => jest.resetModules());

  it('should successfully return json animation data if name exists', async () => {
    const name = 'test_json-regular';
    const onCompleteMock = jest.fn();
    const onErrorMock = jest.fn();
    const mockSVG = 'JSON_CONTENT';
    jest.mock(
      '@momentum-ui/animations/lottie/reactions/test_json-regular.json?lottie',
      () => {
        return mockSVG;
      },
      { virtual: true }
    );

    const hook = renderHook(() =>
      useDynamicJSONImport(name, {
        onCompleted: onCompleteMock,
        onError: onErrorMock,
      })
    );
    expect(hook.result.current.loading).toBe(true);

    await hook.waitForNextUpdate();

    expect(onCompleteMock).toBeCalledTimes(1);
    expect(onCompleteMock).toBeCalledWith(name, mockSVG);
    expect(onErrorMock).not.toBeCalled();
    expect(hook.result.current.animationData).toEqual(mockSVG);
    expect(hook.result.current.error).toBeUndefined();
    expect(hook.result.current.loading).toBe(false);
  });

  it('should return error component does not exist', async () => {
    const name = 'bad_icon';
    const onCompleteMock = jest.fn();
    const onErrorMock = jest.fn();
    const expectedError = new Error('error');

    jest.mock(
      '@momentum-ui/animations/lottie/reactions/bad_icon.json?lottie',
      () => {
        throw expectedError;
      },
      { virtual: true }
    );

    const hook = renderHook(() =>
      useDynamicJSONImport(name, {
        onCompleted: onCompleteMock,
        onError: onErrorMock,
      })
    );

    await hook.waitForNextUpdate();

    expect(onCompleteMock).not.toBeCalled();

    expect(onErrorMock).toBeCalled();
    expect(onErrorMock).toBeCalledWith(expectedError);
    expect(hook.result.current.animationData).toEqual(undefined);
    expect(hook.result.current.error).toBeTruthy();
    expect(hook.result.current.loading).toBe(false);
  });
});
