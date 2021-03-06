import React, { useState } from 'react';
import { useIsMounted } from './useIsMounted';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('useIsMountedTests', () => {
  it('is mounted when mounted', async () => {
    let isMountedCallback = null;

    const ChildComponent = () => {
      const isMounted = useIsMounted();
      isMountedCallback = isMounted;

      return <div />;
    };

    let setShowCallback = null;

    const ParentComponent = () => {
      const [show, setShow] = useState(true);
      setShowCallback = setShow;

      return <div>{show && <ChildComponent />}</div>;
    };

    mount(<ParentComponent />);

    expect(isMountedCallback()).toBe(true);

    await act(async () => {
      setShowCallback(false);
    });

    expect(isMountedCallback()).toBe(false);
  });
});
