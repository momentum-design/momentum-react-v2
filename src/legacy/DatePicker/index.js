/** @component date-picker */

import React from 'react';
import PropTypes from 'prop-types';
import { EventOverlay } from '@momentum-ui/react-collaboration';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerContext from '../DatePickerContext';
import {
  addDays,
  addWeeks,
  isDayDisabled,
  isSameDay,
  subtractDays,
  subtractWeeks,
} from '../utils/dateUtils';
import moment from 'moment';
import omit from 'lodash/omit';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorNode: null,
      focus: null,
      isOpen: false,
      selected: null,
      monthNavFocus: '',
    };
  }

  componentDidMount() {
    const selectedDate = moment(this.props.selectedDate);
    const isValid = selectedDate.isValid() && !isDayDisabled(selectedDate, this.props);

    isValid && this.setPreSelection(selectedDate);
    isValid && this.setSelected(selectedDate);
  }

  componentDidUpdate(prevProps) {
    const selectedDate = moment(this.props.selectedDate);
    const prevSelectedDate = moment(prevProps.selectedDate);
    const isValid = selectedDate.isValid() && !isDayDisabled(selectedDate, this.props);
    if (isValid && !isSameDay(prevSelectedDate, selectedDate)) {
      this.setSelected(selectedDate);
      this.setPreSelection(selectedDate);
    }
  }

  setOpen = (open) => {
    this.setState({
      isOpen: open,
    });
  };

  handleSelect = (event, date) => {
    const { shouldCloseOnSelect } = this.props;
    this.setPreSelection(date, event);
    this.setSelected(date, event);
    shouldCloseOnSelect && this.setOpen(false);
  };

  setSelected = (date, event) => {
    const { onSelect } = this.props;

    !isDayDisabled(date, this.props) &&
      this.setState(
        {
          selected: date,
        },
        () => onSelect && onSelect(event, date.toDate())
      );
  };

  setPreSelection = (date, event) => {
    const { onChange } = this.props;

    !isDayDisabled(date, this.props) &&
      this.setState(
        {
          focus: date,
        },
        () => onChange && onChange(event, date.toDate())
      );
  };

  setMonthNavFocus = () => {
    const { monthNavFocus } = this.state;

    if (monthNavFocus === 'prev') {
      this.setState({ monthNavFocus: 'next' });
    } else {
      this.setState({ monthNavFocus: 'prev' });
    }
  };

  handleInputClick = () => {
    this.setOpen(true);
  };

  handleInputKeyDown = (event) => {
    const { focus, isOpen } = this.state;

    let flag = false;
    const copy = moment(focus);
    const datePickerDayHasFocus = document.activeElement.className.includes(
      'md-datepicker__day--focus'
    );
    const tabOverride = (event) => {
      this.setMonthNavFocus();
      event.preventDefault();
    };

    switch (!event.shiftKey && event.which) {
      case 9: // Tab
        isOpen && tabOverride(event);
        break;
      case 32:
      case 13:
        if (!isOpen) {
          this.handleInputClick();
        } else if ((moment.isMoment(focus) || moment.isDate(focus)) && datePickerDayHasFocus) {
          this.handleSelect(event, copy);
        }
        flag = true;
        break;

      case 27: // escape
        this.setOpen(false);
        break;
      case 38: // up
        this.setPreSelection(subtractWeeks(copy, 1));
        flag = true;
        break;
      case 37: // left
        this.setPreSelection(subtractDays(copy, 1));
        flag = true;
        break;

      case 39: // right
        this.setPreSelection(addDays(copy, 1));
        flag = true;
        break;

      case 40: // bottom
        this.setPreSelection(addWeeks(copy, 1));
        flag = true;
        break;

      default:
        break;
    }

    switch (event.shiftKey && event.which) {
      case 9: // Tab
        isOpen && tabOverride(event);
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  render() {
    const { children, className, direction, isDynamic, onMonthChange, showArrow, ...props } =
      this.props;

    const { selected, focus, anchorNode, isOpen, monthNavFocus } = this.state;

    const dpContext = {
      handleDayClick: (event, date) => this.handleSelect(event, date),
      handleMonthChange: (event, date) => onMonthChange && onMonthChange(event, date.toDate()),
      focus,
      selected,
    };

    const trigger = React.cloneElement(children, {
      ref: (ref) => !this.state.anchorNode && this.setState({ anchorNode: ref }),
      onClick: this.handleInputClick,
      onKeyDown: this.handleInputKeyDown,
    });

    const otherProps = omit({ ...props }, [
      'onSelect',
      'onChange',
      'onMonthChange',
      'shouldCloseOnSelect',
    ]);

    const calendar = (
      <DatePickerContext.Provider value={dpContext}>
        <DatePickerCalendar monthNavFocus={monthNavFocus} {...otherProps} />
      </DatePickerContext.Provider>
    );

    const content = (
      <EventOverlay
        allowClickAway
        isOpen={isOpen}
        anchorNode={anchorNode}
        close={() => this.setOpen(false)}
        direction={direction}
        showArrow={showArrow}
        isDynamic={isDynamic}
        onKeyDown={this.handleInputKeyDown}
      >
        {calendar}
      </EventOverlay>
    );

    return (
      <div className={'md-datepicker-container' + `${(className && ` ${className}`) || ''}`}>
        {trigger}
        {isOpen && content}
      </div>
    );
  }
}

DatePicker.propTypes = {
  /** @prop Children nodes to render inside DatePicker | null */
  children: PropTypes.element,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Set the direction in which the DatePicker opens | 'bottom-center' */
  direction: PropTypes.string,
  /** @prop Function to filter Dates | null */
  filterDate: PropTypes.func,
  /** @prop Sets the DatePicker EventOverlay to be dynamic | true */
  isDynamic: PropTypes.bool,
  /** @prop Sets the language of the DatePicker | 'en' */
  locale: PropTypes.string,
  /** @prop Sets the last date in which the DatePicker does not disable | null */
  maxDate: PropTypes.instanceOf(Date),
  /** @prop Sets the first date in which the DatePicker does not disable | null */
  minDate: PropTypes.instanceOf(Date),
  /** @prop Sets the format of the month | 'MMMM YYYY' */
  monthFormat: PropTypes.string,
  /** @prop Text to display for blindness accessibility features | 'next' */
  nextArialLabel: PropTypes.string,
  /** @prop Handler invoked when user makes a chnage within the DatePicker | null */
  onChange: PropTypes.func,
  /** @prop Handler invoked when user makes a change to the selected month within DatePicker | null */
  onMonthChange: PropTypes.func,
  /** @prop Handler invoked when user selects a date within DatePicker | null */
  onSelect: PropTypes.func,
  /** @prop Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: PropTypes.string,
  /** @prop Initial Selected Date for DatePicker | moment().toDate()  */
  selectedDate: PropTypes.instanceOf(Date),
  /** @prop Determines if the DatePicker should close when a date is selected | true */
  shouldCloseOnSelect: PropTypes.bool,
  /** @prop Determines if the DatePicker should show the open/close arrow | false */
  showArrow: PropTypes.bool,
};

DatePicker.defaultProps = {
  children: null,
  className: '',
  direction: 'bottom-center',
  filterDate: null,
  isDynamic: true,
  locale: 'en',
  maxDate: null,
  minDate: null,
  monthFormat: 'MMMM YYYY',
  nextArialLabel: '',
  onChange: null,
  onMonthChange: null,
  onSelect: null,
  previousArialLabel: '',
  selectedDate: moment().toDate(),
  shouldCloseOnSelect: true,
  showArrow: false,
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
