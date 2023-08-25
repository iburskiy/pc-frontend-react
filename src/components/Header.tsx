import * as React from "react";
import { Button } from './widgets/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from '../types';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: ReduxStore) => state.isLoggedIn);

  const makeLogin = () => {
    dispatch({type: 'LOGIN'});
  };

  const makeLogout = () => {
    dispatch({type: 'LOGOUT'});
  };

  let loginButton;
  if (isLoggedIn) {
    loginButton = <Button preventDefault={true} handler={makeLogout} className="button" label="Log Out" iconNode={<FontAwesomeIcon icon={"sign-out-alt"} />} />;
  } else {
    loginButton = <Button preventDefault={true} handler={makeLogin} className="button" label="Log In" iconNode={<FontAwesomeIcon icon={"sign-in-alt"} />} />;
  }

  return <div className="header">
            <div className="header__left">
              <Link to="/">
                <img src={`${process.env.PUBLIC_URL}static/images/logo.png`} className="header__logo" alt=""/>
              </Link>
            </div>
            <div className="header__right">
              { isLoggedIn && <span className="header__welcome-message">Welcome, admin!</span>}
              {loginButton}
            </div>
          </div>
};