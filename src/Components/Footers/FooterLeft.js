import React from 'react';
import { Link } from 'react-router-dom';

const FooterLeft = () => {
  return (
    <div className="LeftContainer">
      <ul>
        <span>
          <Link to="/">
            <div className="footerLeft_head">
              <img src="/favicon.ico" alt="Jellabo favicon" />
              <h3>Jellabo</h3>
            </div>
          </Link>
        </span>
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
