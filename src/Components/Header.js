import React from 'react';
import '../Styles/Header.css';
import HeaderLeft from './Headers/HeaderLeft';
import HeaderRight from './Headers/HeaderRight';
import { UserDataConsumer } from '../Contexts/UserData';

const Header = ({ page }) => {
  return (
    <UserDataConsumer>
      {({ state, actions }) => {
        return (
          <header>
            <div className="headerContainer">
              <HeaderLeft page={page} state={state} />
              <HeaderRight page={page} state={state} actions={actions} />
            </div>
          </header>
        );
      }}
    </UserDataConsumer>
  );
};

Header.defaultProps = {
  page: 'Home',
};

export default Header;
