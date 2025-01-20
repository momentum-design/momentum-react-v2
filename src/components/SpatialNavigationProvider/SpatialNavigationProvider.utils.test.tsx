import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import {
  getEdgeDistance,
  getElementRectWithMidPoint,
  getElementRelativeDistances,
  getExpandedRect,
  getNestedFocusableDirection,
  isRectOverlap,
  orderElementsByDistance,
  SpatialNavigationContext,
  useSpatialNavigationContext,
  useSpatialRadioGroupNavigation,
} from './SpatialNavigationProvider.utils';
import SpatialNavigationProvider from './SpatialNavigationProvider';

const getRect = (x: number, y: number, width: number, height: number) => {
  return {
    x,
    y,
    width,
    height,
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
  } as DOMRect;
};

const getElement = (x: number, y: number, width: number, height: number, id?: string) => {
  return {
    id,
    getBoundingClientRect(): DOMRect {
      return getRect(x, y, width, height);
    },
    dataset: {},
    classList: {
      contains() {
        return false;
      },
    } as any,
  } as HTMLElement;
};

describe('Spatial navigation utils', () => {
  describe('useSpatialNavigationContext', () => {
    it('should return undefined when the context is not available', () => {
      const { result } = renderHook(() => useSpatialNavigationContext());
      expect(result.current).toBeUndefined();
    });

    it('should return the context when it is available', () => {
      const contextValue = {} as any;
      const { result } = renderHook(() => useSpatialNavigationContext(), {
        wrapper: ({ children }) => (
          <SpatialNavigationContext.Provider value={contextValue}>
            {children}
          </SpatialNavigationContext.Provider>
        ),
      });

      expect(result.current).toBe(contextValue);
    });
  });

  describe('getElementRectWithMidPoint', () => {
    it('should calculate midpoint for html element', () => {
      expect(getElementRectWithMidPoint(getElement(0, 0, 100, 50))).toEqual({
        bottom: 50,
        height: 50,
        left: 0,
        right: 100,
        top: 0,
        width: 100,
        x: 0,
        xMid: 50,
        y: 0,
        yMid: 25,
      });
    });

    it('should work with zero size element', () => {
      expect(getElementRectWithMidPoint(getElement(10, 10, 0, 0))).toEqual({
        bottom: 10,
        height: 0,
        left: 10,
        right: 10,
        top: 10,
        width: 0,
        x: 10,
        xMid: 10,
        y: 10,
        yMid: 10,
      });
    });
  });

  describe('getNestedFocusableDirection', () => {
    it('should return with none be default', () => {
      const el = document.createElement('div');
      expect(getNestedFocusableDirection(el)).toEqual('none');
    });

    it.each`
      attrValue       | expectedValue
      ${`none`}       | ${'none'}
      ${`horizontal`} | ${'horizontal'}
      ${`vertical`}   | ${'vertical'}
      ${`both`}       | ${'both'}
      ${`random`}     | ${'none'}
    `('should check data attribute', ({ attrValue, expectedValue }) => {
      const el = document.createElement('div');
      el.setAttribute('data-spatial-nested-focusable-direction', attrValue);

      expect(getNestedFocusableDirection(el)).toEqual(expectedValue);
    });

    it('should check classnames', () => {
      const el = document.createElement('div');
      el.setAttribute('class', 'md-tree-node-base-wrapper');

      expect(getNestedFocusableDirection(el)).toEqual('horizontal');
    });
  });

  describe('getEdgeDistance', () => {
    it.each`
      direction  | farEdge         | expected
      ${'left'}  | ${'none'}       | ${-50}
      ${'left'}  | ${'horizontal'} | ${50}
      ${'left'}  | ${'vertical'}   | ${-50}
      ${'left'}  | ${'both'}       | ${50}
      ${'right'} | ${'none'}       | ${-100}
      ${'right'} | ${'horizontal'} | ${0}
      ${'right'} | ${'vertical'}   | ${-100}
      ${'right'} | ${'both'}       | ${0}
      ${'up'}    | ${'none'}       | ${-60}
      ${'up'}    | ${'horizontal'} | ${-60}
      ${'up'}    | ${'vertical'}   | ${-30}
      ${'up'}    | ${'both'}       | ${-30}
      ${'down'}  | ${'none'}       | ${10}
      ${'down'}  | ${'horizontal'} | ${10}
      ${'down'}  | ${'vertical'}   | ${40}
      ${'down'}  | ${'both'}       | ${40}
    `(
      'should return with $expected distance when direction is $direction and farEdge is $farEdge',
      ({ direction, farEdge, expected }) => {
        expect(
          getEdgeDistance(getRect(10, 20, 100, 30), getRect(10, 60, 50, 20), direction, farEdge)
        ).toBe(expected);
      }
    );
  });

  describe('getExpandedRect', () => {
    it('should return with 4 expanded bounding rect', () => {
      // prettier-ignore
      expect(getExpandedRect(getRect(100, 100, 100, 100), 100)).toEqual({
        down:  { x: 100, left: 100, y: 100, top: 100, width: 100, height: 200, right: 200, bottom: 300, },
        left:  { x: 0,   left: 0,   y: 100, top: 100, width: 200, height: 100, right: 200, bottom: 200, },
        right: { x: 100, left: 100, y: 100, top: 100, width: 200, height: 100, right: 300, bottom: 200, },
        up:    { x: 100, left: 100, y: 0,   top: 0,   width: 100, height: 200, right: 200, bottom: 200,
        },
      });
    });
  });

  describe('isRectOverlap', () => {
    it.each`
      rectA               | rectB               | expected | note
      ${[0, 0, 0, 0]}     | ${[0, 0, 0, 0]}     | ${false} | ${'zero size'}
      ${[10, 10, 10, 10]} | ${[0, 0, 0, 0]}     | ${false} | ${'zero size outside'}
      ${[10, 10, 10, 10]} | ${[15, 15, 0, 0]}   | ${false} | ${'rect B zero size and inside rect A'}
      ${[10, 10, 10, 10]} | ${[9, 9, 1, 1]}     | ${false} | ${'rect B is next to rectA'}
      ${[10, 10, 10, 10]} | ${[10, 10, 10, 10]} | ${true}  | ${'rect A and B are identical'}
      ${[10, 10, 10, 10]} | ${[10, 10, 1, 1]}   | ${true}  | ${'rect B is in the top left corner of rect A'}
      ${[10, 10, 10, 10]} | ${[11, 11, 3, 3]}   | ${true}  | ${'rect B is inside rect A'}
      ${[10, 10, 10, 10]} | ${[5, 5, 10, 10]}   | ${true}  | ${'rect B half overlap rect A'}
    `(
      `should return with $expected when rect A is $rectA and rect B is $rectB`,
      ({
        rectA,
        rectB,
        expected,
      }: {
        rectA: Parameters<typeof getRect>;
        rectB: Parameters<typeof getRect>;
        expected: boolean;
      }) => {
        expect(isRectOverlap(getRect(...rectA), getRect(...rectB))).toBe(expected);
      }
    );
  });

  describe('getElementRelativeDistances', () => {
    const activeElement = getElement(100, 100, 10, 10);
    const elements = {
      topLeft: getElement(50, 50, 10, 10),
      top: getElement(100, 50, 10, 10),
      topRight: getElement(150, 50, 10, 10),
      left: getElement(50, 100, 10, 10),
      right: getElement(150, 100, 10, 10),
      bottomLeft: getElement(50, 150, 10, 10),
      bottom: getElement(100, 150, 10, 10),
      bottomRight: getElement(150, 150, 10, 10),
      inside: getElement(102, 102, 6, 6),
    };

    it.each`
      direction  | expansionSize | farEdge         | elementName      | expectedDistance | expectedEdgeDistance
      ${'left'}  | ${100}        | ${'none'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'none'}       | ${'top'}         | ${Infinity}      | ${-12}
      ${'left'}  | ${100}        | ${'none'}       | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'left'}  | ${100}        | ${'none'}       | ${'left'}        | ${2500}          | ${2304}
      ${'left'}  | ${100}        | ${'none'}       | ${'right'}       | ${Infinity}      | ${-72}
      ${'left'}  | ${100}        | ${'none'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'none'}       | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'left'}  | ${100}        | ${'none'}       | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'left'}  | ${100}        | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'top'}         | ${2500}          | ${Infinity}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'left'}        | ${2500}          | ${3600}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'right'}       | ${Infinity}      | ${-60}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'left'}  | ${100}        | ${'horizontal'} | ${'inside'}      | ${0}             | ${4}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'top'}         | ${Infinity}      | ${-12}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'left'}        | ${2500}          | ${2304}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'right'}       | ${Infinity}      | ${-72}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'left'}  | ${100}        | ${'vertical'}   | ${'inside'}      | ${Infinity}      | ${-10}
      ${'left'}  | ${100}        | ${'both'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'both'}       | ${'top'}         | ${2500}          | ${Infinity}
      ${'left'}  | ${100}        | ${'both'}       | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'left'}  | ${100}        | ${'both'}       | ${'left'}        | ${2500}          | ${3600}
      ${'left'}  | ${100}        | ${'both'}       | ${'right'}       | ${Infinity}      | ${-60}
      ${'left'}  | ${100}        | ${'both'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${100}        | ${'both'}       | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'left'}  | ${100}        | ${'both'}       | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'left'}  | ${100}        | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'left'}  | ${10}         | ${'none'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'none'}       | ${'top'}         | ${Infinity}      | ${-12}
      ${'left'}  | ${10}         | ${'none'}       | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'left'}  | ${10}         | ${'none'}       | ${'left'}        | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'none'}       | ${'right'}       | ${Infinity}      | ${-72}
      ${'left'}  | ${10}         | ${'none'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'none'}       | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'left'}  | ${10}         | ${'none'}       | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'left'}  | ${10}         | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'top'}         | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'left'}        | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'right'}       | ${Infinity}      | ${-60}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'left'}  | ${10}         | ${'horizontal'} | ${'inside'}      | ${0}             | ${4}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'top'}         | ${Infinity}      | ${-12}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'left'}        | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'right'}       | ${Infinity}      | ${-72}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'left'}  | ${10}         | ${'vertical'}   | ${'inside'}      | ${Infinity}      | ${-10}
      ${'left'}  | ${10}         | ${'both'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'both'}       | ${'top'}         | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'both'}       | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'left'}  | ${10}         | ${'both'}       | ${'left'}        | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'both'}       | ${'right'}       | ${Infinity}      | ${-60}
      ${'left'}  | ${10}         | ${'both'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'left'}  | ${10}         | ${'both'}       | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'left'}  | ${10}         | ${'both'}       | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'left'}  | ${10}         | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'right'} | ${100}        | ${'none'}       | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'right'} | ${100}        | ${'none'}       | ${'top'}         | ${Infinity}      | ${-12}
      ${'right'} | ${100}        | ${'none'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'none'}       | ${'left'}        | ${Infinity}      | ${-72}
      ${'right'} | ${100}        | ${'none'}       | ${'right'}       | ${2500}          | ${2304}
      ${'right'} | ${100}        | ${'none'}       | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'right'} | ${100}        | ${'none'}       | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'right'} | ${100}        | ${'none'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'right'} | ${100}        | ${'horizontal'} | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'right'} | ${100}        | ${'horizontal'} | ${'top'}         | ${2500}          | ${Infinity}
      ${'right'} | ${100}        | ${'horizontal'} | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'horizontal'} | ${'left'}        | ${Infinity}      | ${-60}
      ${'right'} | ${100}        | ${'horizontal'} | ${'right'}       | ${2500}          | ${3600}
      ${'right'} | ${100}        | ${'horizontal'} | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'right'} | ${100}        | ${'horizontal'} | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'right'} | ${100}        | ${'horizontal'} | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'horizontal'} | ${'inside'}      | ${0}             | ${4}
      ${'right'} | ${100}        | ${'vertical'}   | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'right'} | ${100}        | ${'vertical'}   | ${'top'}         | ${Infinity}      | ${-12}
      ${'right'} | ${100}        | ${'vertical'}   | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'vertical'}   | ${'left'}        | ${Infinity}      | ${-72}
      ${'right'} | ${100}        | ${'vertical'}   | ${'right'}       | ${2500}          | ${2304}
      ${'right'} | ${100}        | ${'vertical'}   | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'right'} | ${100}        | ${'vertical'}   | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'right'} | ${100}        | ${'vertical'}   | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'vertical'}   | ${'inside'}      | ${Infinity}      | ${-10}
      ${'right'} | ${100}        | ${'both'}       | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'right'} | ${100}        | ${'both'}       | ${'top'}         | ${2500}          | ${Infinity}
      ${'right'} | ${100}        | ${'both'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'both'}       | ${'left'}        | ${Infinity}      | ${-60}
      ${'right'} | ${100}        | ${'both'}       | ${'right'}       | ${2500}          | ${3600}
      ${'right'} | ${100}        | ${'both'}       | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'right'} | ${100}        | ${'both'}       | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'right'} | ${100}        | ${'both'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${100}        | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'right'} | ${10}         | ${'none'}       | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'right'} | ${10}         | ${'none'}       | ${'top'}         | ${Infinity}      | ${-12}
      ${'right'} | ${10}         | ${'none'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'none'}       | ${'left'}        | ${Infinity}      | ${-72}
      ${'right'} | ${10}         | ${'none'}       | ${'right'}       | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'none'}       | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'right'} | ${10}         | ${'none'}       | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'right'} | ${10}         | ${'none'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'right'} | ${10}         | ${'horizontal'} | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'right'} | ${10}         | ${'horizontal'} | ${'top'}         | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'horizontal'} | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'horizontal'} | ${'left'}        | ${Infinity}      | ${-60}
      ${'right'} | ${10}         | ${'horizontal'} | ${'right'}       | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'horizontal'} | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'right'} | ${10}         | ${'horizontal'} | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'horizontal'} | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'horizontal'} | ${'inside'}      | ${0}             | ${4}
      ${'right'} | ${10}         | ${'vertical'}   | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'right'} | ${10}         | ${'vertical'}   | ${'top'}         | ${Infinity}      | ${-12}
      ${'right'} | ${10}         | ${'vertical'}   | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'vertical'}   | ${'left'}        | ${Infinity}      | ${-72}
      ${'right'} | ${10}         | ${'vertical'}   | ${'right'}       | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'vertical'}   | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'right'} | ${10}         | ${'vertical'}   | ${'bottom'}      | ${Infinity}      | ${-12}
      ${'right'} | ${10}         | ${'vertical'}   | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'vertical'}   | ${'inside'}      | ${Infinity}      | ${-10}
      ${'right'} | ${10}         | ${'both'}       | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'right'} | ${10}         | ${'both'}       | ${'top'}         | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'both'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'both'}       | ${'left'}        | ${Infinity}      | ${-60}
      ${'right'} | ${10}         | ${'both'}       | ${'right'}       | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'both'}       | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'right'} | ${10}         | ${'both'}       | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'right'} | ${10}         | ${'both'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'right'} | ${10}         | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'up'}    | ${100}        | ${'none'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'none'}       | ${'top'}         | ${2500}          | ${2304}
      ${'up'}    | ${100}        | ${'none'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'none'}       | ${'left'}        | ${Infinity}      | ${-12}
      ${'up'}    | ${100}        | ${'none'}       | ${'right'}       | ${Infinity}      | ${-12}
      ${'up'}    | ${100}        | ${'none'}       | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'up'}    | ${100}        | ${'none'}       | ${'bottom'}      | ${Infinity}      | ${-72}
      ${'up'}    | ${100}        | ${'none'}       | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'up'}    | ${100}        | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'top'}         | ${2500}          | ${2304}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'left'}        | ${Infinity}      | ${-12}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'right'}       | ${Infinity}      | ${-12}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'bottom'}      | ${Infinity}      | ${-72}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'up'}    | ${100}        | ${'horizontal'} | ${'inside'}      | ${Infinity}      | ${-10}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'top'}         | ${2500}          | ${3600}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'left'}        | ${2500}          | ${Infinity}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'right'}       | ${2500}          | ${Infinity}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'bottom'}      | ${Infinity}      | ${-60}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'up'}    | ${100}        | ${'vertical'}   | ${'inside'}      | ${0}             | ${4}
      ${'up'}    | ${100}        | ${'both'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'both'}       | ${'top'}         | ${2500}          | ${3600}
      ${'up'}    | ${100}        | ${'both'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${100}        | ${'both'}       | ${'left'}        | ${2500}          | ${Infinity}
      ${'up'}    | ${100}        | ${'both'}       | ${'right'}       | ${2500}          | ${Infinity}
      ${'up'}    | ${100}        | ${'both'}       | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'up'}    | ${100}        | ${'both'}       | ${'bottom'}      | ${Infinity}      | ${-60}
      ${'up'}    | ${100}        | ${'both'}       | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'up'}    | ${100}        | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'up'}    | ${10}         | ${'none'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'none'}       | ${'top'}         | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'none'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'none'}       | ${'left'}        | ${Infinity}      | ${-12}
      ${'up'}    | ${10}         | ${'none'}       | ${'right'}       | ${Infinity}      | ${-12}
      ${'up'}    | ${10}         | ${'none'}       | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'up'}    | ${10}         | ${'none'}       | ${'bottom'}      | ${Infinity}      | ${-72}
      ${'up'}    | ${10}         | ${'none'}       | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'up'}    | ${10}         | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'top'}         | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'left'}        | ${Infinity}      | ${-12}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'right'}       | ${Infinity}      | ${-12}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'bottomLeft'}  | ${Infinity}      | ${-72}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'bottom'}      | ${Infinity}      | ${-72}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'bottomRight'} | ${Infinity}      | ${-72}
      ${'up'}    | ${10}         | ${'horizontal'} | ${'inside'}      | ${Infinity}      | ${-10}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'top'}         | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'left'}        | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'right'}       | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'bottom'}      | ${Infinity}      | ${-60}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'up'}    | ${10}         | ${'vertical'}   | ${'inside'}      | ${0}             | ${4}
      ${'up'}    | ${10}         | ${'both'}       | ${'topLeft'}     | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'both'}       | ${'top'}         | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'both'}       | ${'topRight'}    | ${5000}          | ${Infinity}
      ${'up'}    | ${10}         | ${'both'}       | ${'left'}        | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'both'}       | ${'right'}       | ${2500}          | ${Infinity}
      ${'up'}    | ${10}         | ${'both'}       | ${'bottomLeft'}  | ${Infinity}      | ${-60}
      ${'up'}    | ${10}         | ${'both'}       | ${'bottom'}      | ${Infinity}      | ${-60}
      ${'up'}    | ${10}         | ${'both'}       | ${'bottomRight'} | ${Infinity}      | ${-60}
      ${'up'}    | ${10}         | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'down'}  | ${100}        | ${'none'}       | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'down'}  | ${100}        | ${'none'}       | ${'top'}         | ${Infinity}      | ${-72}
      ${'down'}  | ${100}        | ${'none'}       | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'down'}  | ${100}        | ${'none'}       | ${'left'}        | ${Infinity}      | ${-12}
      ${'down'}  | ${100}        | ${'none'}       | ${'right'}       | ${Infinity}      | ${-12}
      ${'down'}  | ${100}        | ${'none'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'none'}       | ${'bottom'}      | ${2500}          | ${2304}
      ${'down'}  | ${100}        | ${'none'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'top'}         | ${Infinity}      | ${-72}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'left'}        | ${Infinity}      | ${-12}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'right'}       | ${Infinity}      | ${-12}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'bottom'}      | ${2500}          | ${2304}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'horizontal'} | ${'inside'}      | ${Infinity}      | ${-10}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'top'}         | ${Infinity}      | ${-60}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'left'}        | ${2500}          | ${Infinity}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'right'}       | ${2500}          | ${Infinity}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'bottom'}      | ${2500}          | ${3600}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'vertical'}   | ${'inside'}      | ${0}             | ${4}
      ${'down'}  | ${100}        | ${'both'}       | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'down'}  | ${100}        | ${'both'}       | ${'top'}         | ${Infinity}      | ${-60}
      ${'down'}  | ${100}        | ${'both'}       | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'down'}  | ${100}        | ${'both'}       | ${'left'}        | ${2500}          | ${Infinity}
      ${'down'}  | ${100}        | ${'both'}       | ${'right'}       | ${2500}          | ${Infinity}
      ${'down'}  | ${100}        | ${'both'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'both'}       | ${'bottom'}      | ${2500}          | ${3600}
      ${'down'}  | ${100}        | ${'both'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${100}        | ${'both'}       | ${'inside'}      | ${0}             | ${4}
      ${'down'}  | ${10}         | ${'none'}       | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'down'}  | ${10}         | ${'none'}       | ${'top'}         | ${Infinity}      | ${-72}
      ${'down'}  | ${10}         | ${'none'}       | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'down'}  | ${10}         | ${'none'}       | ${'left'}        | ${Infinity}      | ${-12}
      ${'down'}  | ${10}         | ${'none'}       | ${'right'}       | ${Infinity}      | ${-12}
      ${'down'}  | ${10}         | ${'none'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'none'}       | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'none'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'none'}       | ${'inside'}      | ${Infinity}      | ${-10}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'topLeft'}     | ${Infinity}      | ${-72}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'top'}         | ${Infinity}      | ${-72}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'topRight'}    | ${Infinity}      | ${-72}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'left'}        | ${Infinity}      | ${-12}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'right'}       | ${Infinity}      | ${-12}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'horizontal'} | ${'inside'}      | ${Infinity}      | ${-10}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'top'}         | ${Infinity}      | ${-60}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'left'}        | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'right'}       | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'vertical'}   | ${'inside'}      | ${0}             | ${4}
      ${'down'}  | ${10}         | ${'both'}       | ${'topLeft'}     | ${Infinity}      | ${-60}
      ${'down'}  | ${10}         | ${'both'}       | ${'top'}         | ${Infinity}      | ${-60}
      ${'down'}  | ${10}         | ${'both'}       | ${'topRight'}    | ${Infinity}      | ${-60}
      ${'down'}  | ${10}         | ${'both'}       | ${'left'}        | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'both'}       | ${'right'}       | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'both'}       | ${'bottomLeft'}  | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'both'}       | ${'bottom'}      | ${2500}          | ${Infinity}
      ${'down'}  | ${10}         | ${'both'}       | ${'bottomRight'} | ${5000}          | ${Infinity}
      ${'down'}  | ${10}         | ${'both'}       | ${'inside'}      | ${0}             | ${4}
    `(
      'when direction is $direction, size is $expansionSize, far edge is $farEdge and element is $elementName from active, distance is $expectedDistance and edgeDistance is $expectedEdgeDistance',
      ({
        direction,
        expansionSize,
        farEdge,
        elementName,
        expectedDistance,
        expectedEdgeDistance,
      }) => {
        const element = elements[elementName];
        const activeElementMidPoint = getElementRectWithMidPoint(activeElement);
        const activeElementExpandedRects = getExpandedRect(activeElementMidPoint, expansionSize);

        expect(
          getElementRelativeDistances(
            element,
            direction,
            activeElementMidPoint,
            activeElementExpandedRects,
            farEdge
          )
        ).toEqual({ element, distance: expectedDistance, edgeDistance: expectedEdgeDistance });
      }
    );
  });

  describe('orderElementsByDistance', () => {
    const activeElement = getElement(100, 100, 10, 10);
    const elements = {
      topLeft: getElement(50, 50, 10, 10, 'topLeft'),
      top: getElement(100, 50, 10, 10, 'top'),
      topRight: getElement(150, 50, 10, 10, 'topRight'),
      left: getElement(50, 100, 10, 10, 'left'),
      right: getElement(150, 100, 10, 10, 'right'),
      bottomLeft: getElement(50, 150, 10, 10, 'bottomLeft'),
      bottom: getElement(100, 150, 10, 10, 'bottom'),
      bottomRight: getElement(150, 150, 10, 10, 'bottomRight'),
      inside: getElement(102, 102, 6, 6, 'inside'),
    };

    it.each`
      direction  | expectedElementNames
      ${'left'}  | ${[{ id: 'left', distance: 2500, edgeDistance: 2304 }, { id: 'topLeft', distance: 5000, edgeDistance: Infinity }, { id: 'bottomLeft', distance: 5000, edgeDistance: Infinity }]}
      ${'up'}    | ${[{ id: 'top', distance: 2500, edgeDistance: 2304 }, { id: 'topLeft', distance: 5000, edgeDistance: Infinity }, { id: 'topRight', distance: 5000, edgeDistance: Infinity }]}
      ${'right'} | ${[{ id: 'right', distance: 2500, edgeDistance: 2304 }, { id: 'topRight', distance: 5000, edgeDistance: Infinity }, { id: 'bottomRight', distance: 5000, edgeDistance: Infinity }]}
      ${'down'}  | ${[{ id: 'bottom', distance: 2500, edgeDistance: 2304 }, { id: 'bottomLeft', distance: 5000, edgeDistance: Infinity }, { id: 'bottomRight', distance: 5000, edgeDistance: Infinity }]}
    `(
      'when direction is $direction it should returns with $expectedElements ',
      ({ direction, expectedElementNames }) => {
        const expectedElements = expectedElementNames.map(({ id, distance, edgeDistance }) => ({
          distance,
          edgeDistance,
          element: elements[id],
        }));
        expect(orderElementsByDistance(activeElement, Object.values(elements), direction)).toEqual(
          expectedElements
        );
      }
    );
  });

  describe('useSpatialRadioGroupNavigation', () => {
    interface ISetup {
      numberOfRadioInputs: number;
      spatialNavAvailable: boolean;
      selectedInputIndex: number;
      keyPressed: string;
    }

    const setup = ({
      numberOfRadioInputs,
      spatialNavAvailable,
      selectedInputIndex,
      keyPressed,
    }: ISetup) => {
      const onKeyHandler = jest.fn();
      const container = document.createElement('div');
      container.innerHTML = Array.from(
        { length: numberOfRadioInputs ?? 3 },
        (idx) => `<input id="${idx}" type="radio" name="radio-group"/>`
      ).join('');
      const radioInputs = container.querySelectorAll('input[type="radio"]');

      const { result } = renderHook(() => useSpatialRadioGroupNavigation(onKeyHandler), {
        wrapper: spatialNavAvailable
          ? ({ children }) => <SpatialNavigationProvider>{children}</SpatialNavigationProvider>
          : undefined,
      });

      const event = {
        key: keyPressed,
        preventDefault: jest.fn(),
        nativeEvent: { stopImmediatePropagation: jest.fn() },
        currentTarget: container,
        target: radioInputs[selectedInputIndex],
      };

      act(() => {
        result.current(event as any);
      });

      return { result, radioInputs, onKeyHandler, event };
    };

    describe('without spatial nav', () => {
      it('calls onKeyHandler without manipulate event propagation', () => {
        const { event, onKeyHandler } = setup({
          keyPressed: 'ArrowLeft',
          selectedInputIndex: 0,
          numberOfRadioInputs: 3,
          spatialNavAvailable: false,
        });

        expect(onKeyHandler).toBeCalledWith(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.nativeEvent.stopImmediatePropagation).not.toHaveBeenCalled();
      });
    });
    describe('with spatial nav', () => {
      it('calls onKeyHandler and stop propagation for non edge inputs', () => {
        const { event, onKeyHandler } = setup({
          keyPressed: 'ArrowLeft',
          selectedInputIndex: 1,
          numberOfRadioInputs: 3,
          spatialNavAvailable: true,
        });

        expect(onKeyHandler).toBeCalledWith(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalled();
      });
    });

    it.each`
      key             | selected   | eventPropagation
      ${'ArrowLeft'}  | ${'first'} | ${'stop'}
      ${'ArrowUp'}    | ${'first'} | ${'stop'}
      ${'ArrowDown'}  | ${'first'} | ${'continue'}
      ${'ArrowRight'} | ${'first'} | ${'continue'}
      ${'ArrowLeft'}  | ${'last'}  | ${'continue'}
      ${'ArrowUp'}    | ${'last'}  | ${'continue'}
      ${'ArrowDown'}  | ${'last'}  | ${'stop'}
      ${'ArrowRight'} | ${'last'}  | ${'stop'}
    `(
      'should $eventPropagation event propagation when user presses $key on the $selected input ',
      ({ key, selected, eventPropagation }) => {
        const { event, onKeyHandler } = setup({
          keyPressed: key,
          selectedInputIndex: selected === 'first' ? 0 : 2,
          numberOfRadioInputs: 3,
          spatialNavAvailable: true,
        });

        if (eventPropagation === 'continue') {
          expect(onKeyHandler).toBeCalledWith(event);
          expect(event.preventDefault).not.toHaveBeenCalled();
          expect(event.nativeEvent.stopImmediatePropagation).toHaveBeenCalled();
        } else {
          expect(onKeyHandler).not.toHaveBeenCalled();
          expect(event.preventDefault).toHaveBeenCalled();
          expect(event.nativeEvent.stopImmediatePropagation).not.toHaveBeenCalled();
        }
      }
    );
  });
});
