/** @component select-option */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon, ListItem, ListItemSection } from '@momentum-ui/react-collaboration';
import Checkbox from '../Checkbox';
import SelectContext from '../SelectContext';
import ListContext from '../ListContext';
import { UIDConsumer } from 'react-uid';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class SelectOption extends React.Component {
  render() {
    const { className, active, children, label, title, ...props } = this.props;

    const separateChildren = (isMulti, cxtActive, uniqueId) => {
      return isMulti ? (
        <Checkbox
          htmlId={`${uniqueId}__checkbox`}
          label={label}
          checked={cxtActive || false}
          onChange={() => {}}
        />
      ) : (
        [
          <ListItemSection key="child-0" position="center">
            {label || children}
          </ListItemSection>,
          <ListItemSection key="child-1" position="right">
            {cxtActive && <Icon color="blue-50" name="check_20" />}
          </ListItemSection>,
        ]
      );
    };

    const keySource = (isMulti) => `data-md-${isMulti ? 'keyboard' : 'event'}-key`;

    return (
      <UIDConsumer name={(id) => `md-select-option-${id}`}>
        {(id) => (
          <SelectContext.Consumer>
            {(isMulti) => (
              <ListContext.Consumer>
                {(listContext) => {
                  const cxtActive =
                    active ||
                    (listContext &&
                      listContext.active &&
                      ReactDOM.findDOMNode(this) &&
                      ReactDOM.findDOMNode(this).attributes[keySource(isMulti)] &&
                      ReactDOM.findDOMNode(this).attributes[keySource(isMulti)].value &&
                      listContext.active.includes(
                        ReactDOM.findDOMNode(this).attributes[keySource(isMulti)].value
                      ));

                  const uniqueId = this.props.id || id;

                  return (
                    <ListItem
                      className={`${(className && ` ${className}`) || ''}`}
                      id={uniqueId}
                      label={label}
                      title={title || label}
                      {...props}
                    >
                      {separateChildren(isMulti, cxtActive, uniqueId)}
                    </ListItem>
                  );
                }}
              </ListContext.Consumer>
            )}
          </SelectContext.Consumer>
        )}
      </UIDConsumer>
    );
  }
}

SelectOption.propTypes = {
  /** @prop SelectOption Boolean that describes active state | false */
  active: PropTypes.bool,
  /** @prop Children nodes to render inside SelectOption | null */
  children: PropTypes.node,
  /** @prop Optional HTML Class Name for ListItem | '' */
  className: PropTypes.string,
  /** @prop SelectOption ID | '' */
  id: PropTypes.string,
  /** @prop SelectOption label text | '' */
  label: PropTypes.string,
  /** @prop ListItem Title | '' */
  title: PropTypes.string,
  /** @prop SelectOption value | '' */
  value: PropTypes.string,
};

SelectOption.defaultProps = {
  active: false,
  children: null,
  className: '',
  id: '',
  label: '',
  title: '',
  value: '',
};

SelectOption.displayName = 'SelectOption';

export default SelectOption;
