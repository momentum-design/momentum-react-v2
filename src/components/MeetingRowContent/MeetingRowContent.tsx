import React, { Children, cloneElement, FC, ReactElement } from 'react';
import classnames from 'classnames';

import { STYLE } from './MeetingRowContent.constants';
import { DEFAULTS as MEETING_LIST_ITEM_DEFAULTS } from '../MeetingListItem/MeetingListItem.constants';
import { Props } from './MeetingRowContent.types';
import './MeetingRowContent.style.scss';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';
import ButtonPill from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';
import Avatar from '../Avatar';
import Icon from '../Icon';

/**
 * The MeetingRowContent component.
 */
const MeetingRowContent: FC<Props> = (props: Props) => {
  const {
    children,
    color = MEETING_LIST_ITEM_DEFAULTS.color,
    isDisabled,
    buttonGroup,
    image,
  } = props;

  const getRestrictedProps = (element: ReactElement) => {
    const sizeProps = {};
    if (verifyTypes(element, ButtonPill)) {
      sizeProps['size'] = 28;
      sizeProps['disabled'] = isDisabled;
    } else if (verifyTypes(element, ButtonCircle)) {
      sizeProps['size'] = 32;
      sizeProps['disabled'] = isDisabled;
    } else if (verifyTypes(element, Icon)) {
      // Because this constraints get applied recursively to the children,
      // I still want to be able to override some of the props (like scale).
      if (!element.props.scale) {
        sizeProps['scale'] = 12;
        sizeProps['strokeColor'] = 'none';
        sizeProps['weight'] = 'bold';
      }
    } else if (verifyTypes(element, Avatar)) {
      sizeProps['size'] = 32;
    }
    return sizeProps;
  };

  const getSizedElement = (element) => {
    if (element && React.isValidElement(element)) {
      const elementChildren = element.props['children'];
      let sizedChildren;
      if (elementChildren) {
        if (Array.isArray(elementChildren)) {
          sizedChildren = [];
          Children.map(elementChildren, (child) => {
            sizedChildren.push(getSizedElement(child));
          });
        } else {
          sizedChildren = getSizedElement(elementChildren);
        }
      }
      return cloneElement(element, getRestrictedProps(element), sizedChildren);
    }
    return element;
  };

  let buttonSection = buttonGroup;

  if (buttonGroup && React.isValidElement(buttonGroup)) {
    buttonSection = getSizedElement(buttonGroup);
  }

  const middleSectionColorClass = color ? ` md-meeting-row-content-middle-section-${color}` : '';

  return (
    <>
      <ListItemBaseSection
        className={classnames(STYLE.startSection, { [STYLE.startSectionNoImage]: !image })}
        position="start"
      >
        <div className={STYLE.border} data-color={color} />
        {React.isValidElement(image) ? getSizedElement(image) : image}
      </ListItemBaseSection>
      <ListItemBaseSection
        className={`${STYLE.middleSection}${middleSectionColorClass}`}
        position="middle"
      >
        {getSizedElement(children)}
      </ListItemBaseSection>
      {buttonSection && (
        <ListItemBaseSection className={STYLE.endSection} position="end">
          {buttonSection}
        </ListItemBaseSection>
      )}
    </>
  );
};

export default MeetingRowContent;
