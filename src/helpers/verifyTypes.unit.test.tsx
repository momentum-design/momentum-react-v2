import React from 'react';
import ListItemBase from '../components/ListItemBase';
import { verifyTypes, verifyType, isMRv2Button } from './verifyTypes';
import { ButtonCircle, ButtonSimple, ButtonHyperlink, ButtonPill } from '../components';
import { Button } from '@momentum-ui/react-collaboration';

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
  it.each([
    { input: <ButtonPill key="1">test</ButtonPill>, expected: true },
    { input: <ButtonCircle key="1">test</ButtonCircle>, expected: true },
    { input: <ButtonSimple key="1">test</ButtonSimple>, expected: true },
    { input: <Button key="1">test</Button>, expected: false },
  ])('isMRv2Button(%s)', ({ input, expected }) => {
    expect(isMRv2Button(input)).toBe(expected);
  });
});

describe('verifyType', () => {
  it('returns true if type is correct', () => {
    expect(verifyType(<ButtonPill key="1">test</ButtonPill>, ButtonPill)).toBe(true);
  });
  it('returns false if type is incorrect', () => {
    expect(verifyType(<ListItemBase key="1">test</ListItemBase>, ButtonPill)).toBe(false);
  });
  it('returns false if not a valid react element', () => {
    expect(verifyType('1', ButtonPill)).toBe(false);
  });
});
