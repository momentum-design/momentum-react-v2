import React from 'react';
import {
  ButtonCircle,
  ButtonColor,
  ButtonDefault,
  ButtonDisabled,
  ButtonExpanded,
  ButtonLoading,
  ButtonSize,
  ButtonTags,
  ButtonFileWhiteboard,
} from './index';

export default class ButtonKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ButtonCircle />
        <ButtonColor />
        <ButtonDefault />
        <ButtonDisabled />
        <ButtonExpanded />
        <ButtonLoading />
        <ButtonSize />
        <ButtonTags />
        <ButtonFileWhiteboard />
      </React.Fragment>
    );
  }
}
