import React from 'react';
import HeaderLeft from './Headers/HeaderLeft';
import HeaderRight from './Headers/HeaderRight';
import '../Styles/Header.css';

const Header = ({ page }) => {
  return (
    <header>
      <div className="headerContainer">
        <HeaderLeft page={page} />
        <HeaderRight page={page} />
      </div>
    </header>
  );
};

Header.defaultProps = {
  page: 'Home',
};

export default Header;
