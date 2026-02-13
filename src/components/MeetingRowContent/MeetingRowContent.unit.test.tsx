/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { mount } from 'enzyme';

import MeetingRowContent from './';
import ButtonPill from '../ButtonPill';
import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';
import { MeetingMarker } from '../MeetingListItem';
import ButtonCircle from '../ButtonCircle';
import Avatar from '../Avatar';
import { renderWithWebComponent } from '../../../test/utils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('<MeetingRowContent />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<MeetingRowContent />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = <ButtonPill>Example children</ButtonPill>;

      const container = mount(<MeetingRowContent>{children}</MeetingRowContent>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with buttonGroup', () => {
      expect.assertions(1);

      const buttonGroup = (
        <ButtonGroup spaced>
          <div key="participants-list" style={{ paddingRight: 0 }}>
            17
          </div>
          <Icon key="participants-icon" name="participant-list" scale={16} />
          <ButtonPill key="join-button" color="join">
            Join
          </ButtonPill>
        </ButtonGroup>
      );

      const container = mount(<MeetingRowContent buttonGroup={buttonGroup} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = MeetingMarker.TentativeActive;

      const container = mount(<MeetingRowContent color={color} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have border color classname', () => {
      expect.assertions(1);

      const element = mount(<MeetingRowContent color={MeetingMarker.TentativeActive} />);

      const borderDiv = element.find('.md-meeting-row-content-middle-section').at(1).getDOMNode();

      expect(
        borderDiv.classList.contains('md-meeting-row-content-middle-section-TentativeActive')
      ).toBe(true);
    });

    it('should render children as expected', () => {
      expect.assertions(1);

      const container = mount(<MeetingRowContent>Test Children</MeetingRowContent>);

      const middleSection = container
        .find('.md-meeting-row-content-middle-section')
        .first()
        .getDOMNode();

      expect(middleSection.textContent).toBe('Test Children');
    });

    it('should have disable buttons inside if isDisabled is provided', async () => {
      expect.assertions(2);

      const isDisabled = true;

      await renderWithWebComponent(
        <MeetingRowContent
          isDisabled={isDisabled}
          buttonGroup={
            <ButtonGroup>
              <ButtonCircle key="1">Test 1</ButtonCircle>
              <ButtonPill key="2">Test 2</ButtonPill>
            </ButtonGroup>
          }
        >
          Test Children
        </MeetingRowContent>
      );

      const buttonCircle = screen.getByRole('button', { name: 'Test 1' });
      const buttonPill = screen.getByRole('button', { name: 'Test 2' });

      expect(buttonCircle).toBeDisabled();
      expect(buttonPill).toBeDisabled();
    });

    it('should have appropriate sizes for button group', async () => {
      expect.assertions(3);

      const { container } = await renderWithWebComponent(
        <MeetingRowContent
          buttonGroup={
            <ButtonGroup>
              <ButtonPill key="1">Test 1</ButtonPill>
              <ButtonCircle key="2">Test 2</ButtonCircle>
              <Avatar key="4" />
            </ButtonGroup>
          }
        />
      );

      const buttonPill = screen.getByRole('button', { name: 'Test 1' });
      const buttonCircle = screen.getByRole('button', { name: 'Test 2' });
      const avatar = container.querySelector('.md-avatar-wrapper');

      expect(buttonPill.getAttribute('size')).toBe('28');
      expect(buttonCircle.getAttribute('size')).toBe('32');
      expect(avatar.getAttribute('data-size')).toBe('32');
    });
  });
});
