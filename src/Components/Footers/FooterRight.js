import React from 'react';

const FooterRight = () => {
  return (
    <div>
      <ul>
        <span>
          <div className="footerRight_head">
            <p>정책사항</p>
          </div>
        </span>
        <li>
          <span className="RightContent">
            개인정보 판매 또는 공유에 반대합니다.
          </span>
        </li>
        <li>
          <span>© 2023 JellyFive, Inc.</span>
        </li>
        <li>
          <span>Powered by React.</span>
        </li>
      </ul>
    </div>
  );
};

export default FooterRight;