import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { TIME_UNIT } from "@/constants";
import { now } from "@/utils/dateUtils";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { DateTime } from "luxon";
import { DatePicker } from "../datepicker/DatePicker";
import { TimePicker } from "../timepicker/TimePicker";
import styles from "./scss/module.scss";

export namespace DateTimePicker {}
export const weekStartDays = ["Sunday", "Monday"];
@customElement("md-date-time-picker")
export class DateTimePicker extends LitElement {
  @property({ type: String }) maxDate: string | undefined = undefined;
  @property({ type: String }) minDate: string | undefined = undefined;
  @property({ type: String }) weekStart: typeof weekStartDays[number] = "Sunday";
  // @property({ type: String, attribute: "date-value" }) dateValue: string | undefined = undefined;

  @property({ type: Boolean, attribute: "two-digit-auto-tab" }) twoDigitAutoTab = false;
  @property({ type: Boolean, attribute: "twenty-four-hour-format" }) twentyFourHourFormat = false;
  @property({ type: String }) timeSpecificity: TimePicker.TimeSpecificity = TIME_UNIT.SECOND;
  // @property({ type: String, attribute: "time-value" }) timeValue = "00:00:00-08:00"; // ISO FORMAT

  @property({ type: String, reflect: true }) value: string | undefined = undefined;
  @property({ type: String }) locale = "en-US";
  @property({ type: Boolean }) disabled = false;

  @internalProperty() fullDateTime: DateTime | undefined = undefined;
  @internalProperty() selectedTimeObject: DateTime | undefined = undefined;
  @internalProperty() selectedDateObject: DateTime = now();

  @query("md-datepicker") datePicker!: DatePicker;
  @query("md-timepicker") timePicker!: TimePicker;

  dateValue: string | undefined = undefined;
  timeValue = "00:00:00-08:00"; // ISO FORMAT

  handleDateChange = (event: any) => {
    this.selectedDateObject = event?.detail?.data as DateTime;
    this.dateValue = this.selectedDateObject?.toISODate();
    console.log('[log] HANDLE handleDateChange (dateValue)', this.dateValue);
    this.combineDateAndTimeValues();
  };

  handleTimeChange = (event: any) => {
    this.selectedTimeObject = event?.detail?.data as DateTime;
    this.timeValue = this.selectedTimeObject?.toISOTime({ suppressMilliseconds: true });
    console.log('[log] HANDLE handleTimeChange (timeValue)', this.timeValue);
    this.combineDateAndTimeValues();
  };

  protected async firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    // OG CODE FIRST UPDATED
    if (this.value && changedProperties.has("value")) {
      this.dateValue = this.value.split("T")[0];
      this.timeValue = this.value.split("T")[1];
      this.combineDateAndTimeValues();
    } else if (!this.dateValue) {
      this.dateValue = this.selectedDateObject?.toISODate();
      this.selectedTimeObject = DateTime.fromISO(this.timeValue);
      this.timeValue = this.selectedTimeObject.toISOTime({ suppressMilliseconds: true });
      this.combineDateAndTimeValues();
    }

    await new Promise(resolve => setTimeout(resolve, 0));

    if (this.datePicker) {
      this.datePicker.addEventListener("date-selection-change", this.handleDateChange);
      this.datePicker.addEventListener("date-input-change", this.handleDateTimeInputChange as EventListener);
    }
    if (this.timePicker) {
      this.timePicker.addEventListener("time-selection-change", this.handleTimeChange);
    }
  }

  handleDateTimeInputChange = (event: CustomEvent) => {
    if (event?.detail?.value) {
      this.value = event?.detail?.value;
      console.log('[log] (handleDateTimeInputChange) this.value = ', this.value);

      // console.log('[log] HANDLE handleDateTimeInputChange (value)', this.value);
    }
  };

  updateDateTimeObject = () => {
    if (this.value) {
      this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });
      console.log('[log] CUSTOM EVENT date-time-change');
      this.dispatchEvent(
        new CustomEvent(`date-time-change`, {
          bubbles: true,
          composed: true,
          detail: {
            dateTimeString: this.value,
            dateTime: this.fullDateTime,
            locale: this.locale,
            twentyFourHourFormat: this.twentyFourHourFormat
          }
        })
      );
    }
  };

  combineDateAndTimeValues = () => {
    if (this.dateValue) {
      if (this.timeValue) {
        this.value = `${this.dateValue}T${this.timeValue}`;
      } else {
        this.value = this.dateValue;
      }
      console.log('[log] (combine) this.value = ', this.value);

      // this.updateDateTimeObject();
    }
  };

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.has("value")) {
    //  || changedProperties.has('dateValue') || changedProperties.has("timeValue")) {
      // console.log("[log] a value changed", this.value, this.dateValue, this.timeValue);
      if (this.value) {
        console.log('[log] updated value defined', this.value);
        this.dateValue = this.value.split("T")[0];
        this.timeValue = this.value.split("T")[1];
      }
      // } else if (this.dateValue) {
      //   console.log('[log] updated dateValue defined', this.dateValue);
      //   this.combineDateAndTimeValues();
      // } else if (this.timeValue) {
      //   console.log('[log] updated timeValue defined', this.timeValue);
      //   this.combineDateAndTimeValues();
      // }
      // this.updateDateTimeObject(); 
      this.combineDateAndTimeValues();
    }

    // if (this.value && changedProperties.has("value")) {
    //   this.dateValue = this.value.split("T")[0];
    //   this.timeValue = this.value.split("T")[1];
    //   // this.updateDateTimeObject();
    //   console.log('[log] updated (value) -> dateValue & timeValue', this.value, this.dateValue, this.timeValue);
    //   // this.combineDateAndTimeValues();
    // }

    // if (
    //   this.dateValue &&
    //   this.timeValue &&
    //   (changedProperties.has("timeValue") || changedProperties.has("dateValue"))
    // ) {
    //   console.log('[log] updated (dateValue || timeValue)', this.dateValue, this.timeValue);
    //   this.combineDateAndTimeValues();
    // }

    // OG CODE UPDATED
    // if (
    //   this.dateValue &&
    //   this.timeValue &&
    //   (changedProperties.has("timeValue") || changedProperties.has("dateValue"))
    // ) {
    //   this.combineDateAndTimeValues();
    // }

    // if (this.value && changedProperties.has("value")) {
    //   this.dateValue = this.value.split("T")[0];
    //   this.timeValue = this.value.split("T")[1];
    //   this.updateDateTimeObject();
    // }

    if (this.value && changedProperties.has("locale")) {
      this.fullDateTime = DateTime.fromISO(this.value, { locale: this.locale });
    }
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
        <md-datepicker
          includes-time
          ?disabled=${this.disabled}
          minDate=${ifDefined(this.minDate)}
          maxDate=${ifDefined(this.maxDate)}
          value=${ifDefined(this.value)}
          weekStart=${this.weekStart}
          placeholder="YYYY-MM-DDTHH:MM:SS-HH:MM"
          locale=${ifDefined(this.locale)}>
          <div slot="time-picker" class="included-timepicker-wrapper">
            <md-timepicker
              ?two-digit-auto-tab=${this.twoDigitAutoTab}
              ?twenty-four-hour-format=${this.twentyFourHourFormat}
              timeSpecificity=${this.timeSpecificity}
              locale=${this.locale}
              value=${this.timeValue}>
            </md-timepicker>
          </div>
        </md-datepicker>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-date-time-picker": DateTimePicker;
  }
}
