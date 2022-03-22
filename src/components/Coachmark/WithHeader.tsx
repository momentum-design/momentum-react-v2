import React, { FC } from 'react';

import ButtonControl, { BUTTON_CONTROL_CONSTANTS } from 'components/ButtonControl';
import ButtonGroup from 'components/ButtonGroup';
import Icon, { ICON_CONSTANTS } from 'components/Icon';
import Text, { TEXT_CONSTANTS } from 'components/Text';

import { STYLE } from './Coachmark.constants';
import { CoachmarkWithHeaderProps } from './Coachmark.types';
import './Coachmark.style.scss';

/**
 * The Coachmark content component when displayed with a header.
 */
const CoachmarkWithHeader: FC<CoachmarkWithHeaderProps> = (props: CoachmarkWithHeaderProps) => {
  const { actions, children, icon, image, onDismiss, title } = props;

  return (
    <div className={STYLE.container} data-header="true">
      <div className={STYLE.header}>
        {icon && (
          <Icon data-testid={icon} name={icon} scale={18} weight={ICON_CONSTANTS.WEIGHTS.BOLD} />
        )}
        <Text className={STYLE.title} type={TEXT_CONSTANTS.TYPES.HEADER_PRIMARY}>
          {title}
        </Text>
        <ButtonGroup round>
          <ButtonControl
            aria-label="dismiss"
            control={BUTTON_CONTROL_CONSTANTS.CONTROLS.CLOSE}
            onPress={onDismiss}
          />
        </ButtonGroup>
      </div>
      {image && <div className={STYLE.image}>{image}</div>}
      {children && <div className={STYLE.content}>{children}</div>}
      {actions && (
        <ButtonGroup round spaced>
          {actions}
        </ButtonGroup>
      )}
    </div>
  );
};

export default CoachmarkWithHeader;
