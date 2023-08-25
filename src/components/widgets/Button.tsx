import * as React from "react";
import { Link } from 'react-router-dom'

type ButtonProps = {
  preventDefault: boolean,
  handler?: (e: React.ChangeEvent<HTMLElement>) => void,
  label: string,
  iconNode: React.ReactNode,
  path?: string,
  className: string,
  title?: string,
}

export const Button = (props: ButtonProps) => {
  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    if (props.handler) {
      props.handler.call(null, e);
    }
  };

  const path = props.path ? props.path : '/';
  const className = props.className;
  const firstClassName = className.split(' ')[0];

  return <Link tabIndex={0} to={path} className={className} onClick={handleOnClick} title={props.title}>
            <span className={firstClassName + '__label'}>{props.label}</span>
            <span className={firstClassName + '__icon'}>
              {props.iconNode}
            </span>
          </Link>
};