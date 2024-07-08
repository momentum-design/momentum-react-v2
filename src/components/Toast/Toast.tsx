import React, { Children, cloneElement, FC, ReactElement } from 'react';
import classnames from 'classnames';

import ToastContent, { ToastContentProps } from '../ToastContent';
import ToastDetails, { ToastDetailsProps } from '../ToastDetails';
import Text from '../Text';

import { STYLE } from './Toast.constants';
import { Props } from './Toast.types';
import './Toast.style.scss';

/**
 * The `<Toast />` component.
 */
const Toast: FC<Props> = (props: Props) => {
  const { ariaLive, children, className, content, controls, details, id, style, title, titleTagName } = props;

  const childrenArray = Children.toArray(children);

  const contentChild: ReactElement<ToastContentProps> = childrenArray.find(
    ({ type }: ReactElement<ToastContentProps | ToastDetailsProps>) => type === ToastContent
  ) as ReactElement<ToastContentProps>;

  const detailsChild: ReactElement<ToastDetailsProps> = childrenArray.find(
    ({ type }: ReactElement<ToastContentProps | ToastDetailsProps>) => type === ToastDetails
  ) as ReactElement<ToastDetailsProps>;

  const contentComponent = content || contentChild || null;
  const detailsComponent = details || detailsChild || null;

  const mutatedDetails =
    controls && detailsComponent && !title
      ? cloneElement(detailsComponent, { controls })
      : detailsComponent;

  const controlsComponent =
    controls && title ? <div className={STYLE.controls}>{controls}</div> : null;

  const titleComponent = title ? (
    <div className={STYLE.header}>
      <Text tagName={titleTagName || 'h2'} type="label-compact" className={STYLE.title}>
      {title}
      </Text>
      {controlsComponent}
    </div>
  ) : null;

  return (
    <div className={classnames(className, STYLE.wrapper)} aria-live={ariaLive} id={id} style={style}>
      {titleComponent}
      {mutatedDetails}
      {contentComponent}
    </div>
  );
};

export default Toast;
