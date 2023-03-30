import React from 'react';
import '../Styles/Header.css';
import HeaderLeft from './Headers/HeaderLeft';
import HeaderRight from './Headers/HeaderRight';

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
