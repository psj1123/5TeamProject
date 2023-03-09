import React from 'react';
import { Link } from 'react-router-dom';

const FooterLeft = () => {
  return (
    <div>
      <ul>
        <span>
          <Link to="/">
            <div className="footerLeft_head">
              <img src="/favicon.ico" alt="Jellabo favicon" />
              <h3>Jellabo</h3>
            </div>
          </Link>
        </span>
        <li>
          <span>대표번호: 000) XXX-0000</span>
        </li>
        <li>
          <span>FAX: 000-XXX-0000</span>
        </li>
      </ul>
    </div>
  );
};

export default FooterLeft;
