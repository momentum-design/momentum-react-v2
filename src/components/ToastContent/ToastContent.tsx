import classnames from 'classnames';
import React, { cloneElement, FC } from 'react';

import { STYLE } from './ToastContent.constants';
import { Props } from './ToastContent.types';
import './ToastContent.style.scss';

/**
 * The `<ToastContent />` component. This component is meant to be consumed by only the `<Toast />` component.
 */
const ToastContent: FC<Props> = (props: Props) => {
  const { action, actionColor, actions, actor, children, className, id, info, style } = props;

  const actorComponent = actor ? <span className={STYLE.actor}>{actor}</span> : null;

  const actionComponent = action ? (
    <span className={STYLE.action} data-color={actionColor}>
      {action}
    </span>
  ) : null;

  const scopeComponent =
    action || actor ? (
      <div className={STYLE.scope}>
        {actorComponent} {actionComponent}
      </div>
    ) : null;

  const infoComponent =
    info || children ? <div className={STYLE.info}>{info || children}</div> : null;

  const actionsComponent = actions
    ? cloneElement(actions, {
        className: classnames(STYLE.actions, actions.props.className),
      })
    : null;

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {scopeComponent}
      {infoComponent}
      {actionsComponent}
    </div>
  );
};

export default ToastContent;
