import React from 'react';
import ListItemBase from '../components/ListItemBase';
import ButtonPill from '../components/ButtonPill';
import { verifyTypes, verifyType, isMRv2Button } from './verifyTypes';

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

describe('isMRv2Button', () => {
  it('returns true if type is correct', () => {
    expect(isMRv2Button(<ButtonPill key="1">test</ButtonPill>)).toBe(true);
  });
  it('returns false if type is incorrect', () => {
    expect(isMRv2Button(<ListItemBase key="1">test</ListItemBase>)).toBe(false);
  });
});

describe('verifyType', () => {
  it('returns true if type is correct', () => {
    expect(verifyType(<ButtonPill key="1">test</ButtonPill>, ButtonPill)).toBe(true);
  });
  it('returns false if type is incorrect', () => {
    expect(verifyType(<ListItemBase key="1">test</ListItemBase>, ButtonPill)).toBe(false);
  });
});
