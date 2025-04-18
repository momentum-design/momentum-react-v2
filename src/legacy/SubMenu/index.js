/** @component sub-menu */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import mapContextToProps from '@restart/context/mapContextToProps';
import { UIDConsumer, UIDFork } from 'react-uid';
import { Icon, ListItem } from '@momentum-ui/react-collaboration';
import EventOverlay from '../EventOverlay';
import ListContext from '../ListContext';
import SelectableContext from '../SelectableContext';
import { prefix } from '../utils/prefixer';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class SubMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectContext: {
        parentKeyDown: this.handleKeyDown,
        parentOnSelect: this.handleClick,
      },
    };
  }

  handleClick = (e, opts) => {
    const { onClick, parentOnSelect } = this.props;
    const { eventKey, label, value } = opts;

    onClick && onClick(e, { value, label });
    parentOnSelect &&
      parentOnSelect(e, {
        eventKey,
        element: this,
      });
  };

  handleKeyDown = (e, opts) => {
    const { onClick, parentKeyDown, parentOnSelect } = this.props;
    const { eventKey } = opts;

    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      parentOnSelect &&
        parentOnSelect(e, {
          eventKey,
          element: this,
        });
      e.preventDefault();
    } else {
      parentKeyDown &&
        parentKeyDown(e, {
          eventKey,
          element: this,
        });
    }
  };

  render() {
    const {
      children,
      className,
      content,
      customNode,
      eventOverlayProps,
      isHeader,
      isOpen,
      label,
      selectedValue,
      ...props
    } = this.props;
    const { selectContext } = this.state;

    const otherProps = omit({ ...props }, [
      'customNode',
      'index',
      'keepMenuOpen',
      'onClick',
      'parentKeyDown',
      'parentOnSelect',
    ]);

    return (
      <UIDFork>
        <UIDConsumer name={(id) => `${prefix}-sub-menu-item-${id}`}>
          {(id) => (
            <ListContext.Consumer>
              {(listContext) => {
                const cxtActive =
                  isOpen ||
                  (listContext &&
                    listContext.active &&
                    this.anchorRef &&
                    ReactDOM.findDOMNode(this.anchorRef) &&
                    ReactDOM.findDOMNode(this.anchorRef).attributes[`data-${prefix}-event-key`] &&
                    ReactDOM.findDOMNode(this.anchorRef).attributes[`data-${prefix}-event-key`]
                      .value &&
                    listContext.active.includes(
                      ReactDOM.findDOMNode(this.anchorRef).attributes[`data-${prefix}-event-key`]
                        .value
                    ));

                return (
                  <div
                    className={`${prefix}-menu-item` + `${(className && ` ${className}`) || ''}`}
                    aria-expanded={cxtActive}
                    aria-haspopup={!!children}
                  >
                    <SelectableContext.Provider value={selectContext}>
                      <ListItem
                        active={cxtActive}
                        focusOnLoad
                        id={id}
                        isReadOnly={isHeader}
                        ref={(ref) => (this.anchorRef = ref)}
                        role="menuitem"
                        {...otherProps}
                      >
                        {customNode
                          ? customNode
                          : [
                              <div className={`${prefix}-menu-item__content`} key="content-0">
                                {content || label}
                              </div>,
                              <div
                                className={`${prefix}-menu-item__selected-value`}
                                title={selectedValue}
                                key="content-1"
                              >
                                {children && selectedValue}
                              </div>,
                              <div className={`${prefix}-menu-item__arrow`} key="content-2">
                                {children && <Icon name="arrow-right_16" />}
                              </div>,
                            ]}
                      </ListItem>
                    </SelectableContext.Provider>
                    {cxtActive && (
                      <EventOverlay
                        anchorNode={this.anchorRef}
                        isOpen={cxtActive}
                        direction="right-top"
                        closeOnClick={false}
                        isContained
                        {...eventOverlayProps}
                      >
                        <div
                          aria-label={label}
                          role="menu"
                          className={`${prefix}-menu-item-container`}
                        >
                          {children}
                        </div>
                      </EventOverlay>
                    )}
                  </div>
                );
              }}
            </ListContext.Consumer>
          )}
        </UIDConsumer>
      </UIDFork>
    );
  }
}

SubMenu.propTypes = {
  /** @prop Children nodes to render inside SubMenu | null */
  children: PropTypes.node,
  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,
  /** @prop SubMenu content element | null */
  content: PropTypes.element,
  /** @prop SubMenu custom Node | null */
  customNode: PropTypes.node,
  /** @prop Event Overlay props to be overwritten | null */
  eventOverlayProps: PropTypes.shape({}),
  /** @prop Index of SubMenu | [] */
  index: PropTypes.array,
  /** @prop Determines if the SubMenu is the header | false */
  isHeader: PropTypes.bool,
  /** @prop Determines if the SubMenu is Open | false */
  isOpen: PropTypes.bool,
  /** @prop Boolean whether to keep the SubMenu open | false */
  keepMenuOpen: PropTypes.bool,
  /** @prop SubMenu label string | '' */
  label: PropTypes.string,
  /** @prop Callback function invoked when user clicks the SubMenu | null */
  onClick: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,
  /** @prop Initial selected value within SubMenu | '' */
  selectedValue: PropTypes.string,
};

SubMenu.defaultProps = {
  children: null,
  className: '',
  content: null,
  customNode: null,
  eventOverlayProps: null,
  index: [],
  isHeader: false,
  isOpen: false,
  keepMenuOpen: false,
  label: '',
  onClick: null,
  parentKeyDown: null,
  parentOnSelect: null,
  selectedValue: '',
};

SubMenu.displayName = 'SubMenu';

export default mapContextToProps(SelectableContext, (context) => context, SubMenu);
