import React, { Children, cloneElement, FC, ReactElement } from 'react';
import classnames from 'classnames';

import { STYLE } from './MeetingListItem.constants';
import { Props } from './MeetingListItem.types';
import './MeetingListItem.style.scss';
import ListItemBase from '../ListItemBase';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';
import ButtonPill from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';
import Avatar from '../Avatar';
import Icon from '../Icon';

const MeetingListItem: FC<Props> = (props: Props) => {
  const { children, className, color, isDisabled, buttonGroup, image, large, ...rest } = props;

  const getSizeProps = (element: ReactElement) => {
    const sizeProps = {};
    if (verifyTypes(element, ButtonPill)) {
      sizeProps['size'] = 28;
    } else if (verifyTypes(element, ButtonCircle)) {
      sizeProps['size'] = 32;
    } else if (verifyTypes(element, Icon)) {
      sizeProps['autoScale'] = true;
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
      return cloneElement(element, getSizeProps(element), sizedChildren);
    }
    return element;
  };

  let buttonSection = buttonGroup;

  if (buttonGroup && React.isValidElement(buttonGroup)) {
    buttonSection = getSizedElement(buttonGroup);
  }

  const middleSectionColorClass = color ? ` md-meeting-list-item-middle-section-${color}` : '';

  return (
    <ListItemBase
      className={`${classnames(className, STYLE.wrapper)}`}
      data-color={color}
      isDisabled={isDisabled}
      size={large ? 70 : 50}
      {...rest}
    >
      <ListItemBaseSection className="md-meeting-list-item-start-section" position="start">
        <div className="md-meeting-list-item-border" data-color={color} />
        {React.isValidElement(image) ? getSizedElement(image) : image}
      </ListItemBaseSection>

      <ListItemBaseSection
        className={`md-meeting-list-item-middle-section${middleSectionColorClass}`}
        position="middle"
      >
        {getSizedElement(children)}
      </ListItemBaseSection>

      {buttonSection && (
        <ListItemBaseSection className="md-meeting-list-item-end-section" position="end">
          {buttonSection}
        </ListItemBaseSection>
      )}
    </ListItemBase>
  );
};

export default MeetingListItem;
