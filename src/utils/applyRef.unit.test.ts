import { applyRef } from './applyRef';

describe('applyRef', () => {
  const node = document.createElement('div');

  it('does nothing when ref is provided as null', () => {
    expect(applyRef(null, node)).toBeUndefined();
  });

  it('calls the callback when ref is provided as a callback', () => {
    const callback = jest.fn();

    expect(applyRef(callback, node)).toBeUndefined();
    expect(callback).toBeCalledWith(node);
  });

  it('sets the current property when ref is provided as a mutable', () => {
    const mutable = { current: null };

    expect(applyRef(mutable, node)).toBeUndefined();
    expect(mutable).toStrictEqual({ current: node });
  });
});
