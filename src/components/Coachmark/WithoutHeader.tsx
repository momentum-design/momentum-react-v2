import React, { FC } from 'react';

import ButtonControl, { BUTTON_CONTROL_CONSTANTS } from 'components/ButtonControl';
import ButtonGroup from 'components/ButtonGroup';

import { STYLE } from './Coachmark.constants';
import { CoachmarkWithoutHeaderProps } from './Coachmark.types';
import './Coachmark.style.scss';

/**
 * The Coachmark container component when displayed without a header.
 */
const CoarchmarkWithoutHeader: FC<CoachmarkWithoutHeaderProps> = (
  props: CoachmarkWithoutHeaderProps
) => {
  const { actions, children, onDismiss } = props;

  return (
    <>
      <div className={STYLE.container} data-header="false">
        <div>
          {children && <div className={STYLE.content}>{children}</div>}
          {actions && (
            <ButtonGroup round spaced>
              {actions}
            </ButtonGroup>
          )}
        </div>
        <ButtonGroup className={STYLE.controls} round>
          <ButtonControl
            aria-label="dismiss"
            control={BUTTON_CONTROL_CONSTANTS.CONTROLS.CLOSE}
            onPress={onDismiss}
          />
        </ButtonGroup>
      </div>
    </>
  );
};

export default CoarchmarkWithoutHeader;
