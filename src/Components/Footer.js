import React from 'react';
import FooterLeft from './Footers/FooterLeft';
import FooterCenter from './Footers/FooterCenter';
import FooterRight from './Footers/FooterRight';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerContainer_1">
          <FooterLeft />
        </div>
        <div className="footerContainer_2">
          <FooterCenter />
        </div>
        <div className="footerContainer_3">
          <FooterRight />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
