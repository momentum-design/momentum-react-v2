import React from 'react';
import ListItemBase from '../components/ListItemBase';
import { verifyTypes } from './verifyTypes';

describe('verifyTypes', () => {
  it('returns true if types are correct', () => {
    const children = [
      <ListItemBase key="1">str</ListItemBase>,
      <ListItemBase key="2">str</ListItemBase>,
    ];
    expect(verifyTypes(children, ListItemBase)).toBe(true);
  });

  it('returns false if types are incorrect', () => {
    const children = [<p key="1">str</p>, <p key="2">str</p>];
    expect(verifyTypes(children, ListItemBase)).toBe(false);
  });

  it('returns false if at least one type is incorrect', () => {
    const children = [
      <p key="1">str</p>,
      <p key="2">str</p>,
      <ListItemBase key="3">str</ListItemBase>,
    ];
    expect(verifyTypes(children, ListItemBase)).toBe(false);
  });

  it('returns false if children is empty', () => {
    const children = [];
    expect(verifyTypes(children, ListItemBase)).toBe(false);
  });
});
