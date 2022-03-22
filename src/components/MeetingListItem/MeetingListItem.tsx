import classnames from 'classnames';
import React, {
  Children,
  cloneElement,
  FC,
  ReactElement,
  forwardRef,
  useRef,
  RefObject,
} from 'react';

import './MeetingListItem.style.scss';
import Avatar from 'components/Avatar';
import ButtonCircle from 'components/ButtonCircle';
import ButtonPill from 'components/ButtonPill';
import Icon from 'components/Icon';
import ListItemBase from 'components/ListItemBase';
import ListItemBaseSection from 'components/ListItemBaseSection';

import { verifyTypes } from '../../helpers/verifyTypes';

import { STYLE, DEFAULTS } from './MeetingListItem.constants';
import { Props } from './MeetingListItem.types';

const MeetingListItem: FC<Props> = forwardRef(
  (props: Props, providedRef: RefObject<HTMLLIElement>) => {
    const {
      children,
      className,
      color = DEFAULTS.color,
      isDisabled,
      buttonGroup,
      image,
      large,
      itemIndex,
      ...rest
    } = props;

    const internalRef = useRef();
    const ref = providedRef || internalRef;

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

    const middleSectionColorClass = color ? ` md-meeting-list-item-middle-section-${color}` : '';

    return (
      <ListItemBase
        isPadded
        ref={ref}
        className={`${classnames(className, STYLE.wrapper)}`}
        data-color={color}
        isDisabled={isDisabled}
        itemIndex={itemIndex}
        size={large ? 70 : 50}
        {...rest}
      >
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
      </ListItemBase>
    );
  }
);

MeetingListItem.displayName = 'MeetingListItem';

export default MeetingListItem;
