import React from 'react';
import { TimePicker } from '@momentum-ui/react-collaboration';
export default class TimePickerDefault extends React.PureComponent {
  render() {
    return (
      <div className="timePicker-container">
        <TimePicker
          selectedTime={new Date('Tue Oct 01 2019 18:19:00 GMT-0500 (Central Daylight Time)')}
          inputId="default"
        />
      </div>
    );
  }
}
