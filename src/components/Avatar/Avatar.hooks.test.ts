import { useAvatarImage } from './Avatar.hooks';
import { renderHook, act } from '@testing-library/react-hooks';

const render = (src?: string) => {
  return renderHook(({ src }) => useAvatarImage(src), {
    initialProps: { src },
  });
};

describe('useAvatarImage', () => {
  it('should return imageLoaded correctly', () => {
    const { result } = render();
    expect(result.current.imageLoaded).toBe(false);

    /* fire handleOnLoad: */
    act(() => {
      result.current.handleOnLoad();
    });
    expect(result.current.imageLoaded).toBe(true);

    /* fire handleOnError: */
    act(() => {
      result.current.handleOnError();
    });
    expect(result.current.imageLoaded).toBe(false);
  });

  it('should return imageLoaded as false, if src changes to become undefined', () => {
    const { result, rerender } = render('some src');

    /* fire handleOnLoad (to fake that the src has loaded): */
    act(() => {
      result.current.handleOnLoad();
    });
    expect(result.current.imageLoaded).toBe(true);

    /* rerender with undefined src */
    rerender({ src: undefined });
    expect(result.current.imageLoaded).toBe(false);
  });
});
