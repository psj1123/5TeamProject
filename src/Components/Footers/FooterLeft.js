import React from 'react';
import { Link } from 'react-router-dom';

const FooterLeft = () => {
  return (
    <div className="LeftContainer">
      <span>
        <div className="footerLeft_head">
          <div className="footerLeft_icon">
            <Link to="/">
              <img src="/favicon.ico" alt="Jellabo favicon" />
            </Link>
          </div>
          <div className="footerLeft_icon">
            <Link to="/">
              <p>Jellabo</p>
            </Link>
          </div>
        </div>
      </span>
      <ul>
        <div className="Left_icon_Contatiner">
          <div className="Left_icon">
            <a
              href="https://github.com/psj1123/5TeamProject"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Jellabo Github Icon" src="./../img/github.png" />
            </a>
          </div>
          <div className="Left_icon">
            <a
              href="mailto:projectJellabo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Jellabo Mail Icon" src="./../img/mail.png" />
            </a>
          </div>
          <div className="Left_icon">
            <a
              href="https://ko-kr.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Jellabo facebook Icon" src="./../img/facebook.png" />
            </a>
          </div>
          <div className="Left_icon">
            <a
              href="https://kr.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Jellabo LinkedIn Icon" src="./../img/linkedin.png" />
            </a>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default FooterLeft;
