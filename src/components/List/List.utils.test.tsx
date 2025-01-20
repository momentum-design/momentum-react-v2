import React from 'react';
import { ListContext, setNextFocus, useListContext } from './List.utils';
import { renderHook } from '@testing-library/react-hooks';
import range from 'lodash/range';

describe('List utils', () => {
  describe('useListContext', () => {
    it('should return undefined when the context is not available', () => {
      const { result } = renderHook(() => useListContext());
      expect(result.current).toBeNull();
    });

    it('should return the context when it is available', () => {
      const contextValue = {};
      const { result } = renderHook(() => useListContext(), {
        wrapper: ({ children }) => (
          <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
        ),
      });

      expect(result.current).toBe(contextValue);
    });
  });

  describe('setNextFocus', () => {
    describe('in no loop mode', () => {
      it('should return with the next item when moving forward', () => {
        expect(setNextFocus(5, 10, false, true, range(0, 10))).toBe(6);
      });

      it('should return undefined when reached the end of the list', () => {
        expect(setNextFocus(9, 10, false, true, range(0, 10))).toBe(undefined);
      });

      it('should return with the previous item when moving backward', () => {
        expect(setNextFocus(5, 10, true, true, range(0, 10))).toBe(4);
      });

      it('should return undefined when reached the beginning of the list', () => {
        expect(setNextFocus(0, 10, true, true, range(0, 10))).toBe(undefined);
      });

      it('should handle out of range problem when moving forward', () => {
        expect(setNextFocus(5, 10, false, true, range(0, 3))).toBe(0);
      });
      it('should handle out of range problem when moving backward', () => {
        expect(setNextFocus(5, 10, true, true, range(0, 3))).toBe(undefined);
      });
    });
    describe('in loop mode', () => {
      it('should return with the next item when moving forward', () => {
        expect(setNextFocus(5, 10, false, false, range(0, 10))).toBe(6);
      });

      it('should return the first index when reached the end of the list', () => {
        expect(setNextFocus(9, 10, false, false, range(0, 10))).toBe(0);
      });

      it('should return with the previous item when moving backward', () => {
        expect(setNextFocus(5, 10, true, false, range(0, 10))).toBe(4);
      });

      it('should return the last index when reached the beginning of the list', () => {
        expect(setNextFocus(0, 10, true, false, range(0, 10))).toBe(9);
      });

      it('should handle out of range problem when moving forward', () => {
        expect(setNextFocus(5, 10, false, false, range(0, 3))).toBe(0);
      });
      it('should handle out of range problem when moving backward', () => {
        expect(setNextFocus(5, 10, true, false, range(0, 3))).toBe(undefined);
      });
    });
  });
});
