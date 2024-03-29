import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLeft = ({ page }) => {
  const loginEmail = window.sessionStorage.getItem('email');

  const myprojectslist = '/myprojectslist?email=' + loginEmail;
  // props로 입력받은 page가 Project일 때만 헤더 레프트에 [참여 프로젝트 리스트] 링크 표시
  if (page === 'Project') {
    return (
      <div className="headerLeft">
        <div className="headerLeft_icon">
          <Link to={myprojectslist}>
            <img src="/favicon.ico" alt="Jellabo favicon" />
          </Link>
        </div>
        <div className="headerLeft_icon">
          <Link to={myprojectslist}>
            <p>Jellabo</p>
          </Link>
        </div>
      </div>
    );
  }
  // page가 NotFound일 때는 링크에 히스토리를 남기지 않는 기능 추가
  else if (page === 'NotFound') {
    return (
      <div className="headerLeft">
        <div className="headerLeft_icon">
          <Link to="/" replace={true}>
            <img src="/favicon.ico" alt="Jellabo favicon" />
          </Link>
        </div>
        <div className="headerLeft_icon">
          <Link to="/" replace={true}>
            <p>Jellabo</p>
          </Link>
        </div>
      </div>
    );
  }
  // 그 외의 경우엔 일반적인 기능 수행
  else {
    return (
      <div className="headerLeft">
        <div className="headerLeft_icon">
          <Link to="/">
            <img src="/favicon.ico" alt="Jellabo favicon" />
          </Link>
        </div>
        <div className="headerLeft_icon">
          <Link to="/">
            <p>Jellabo</p>
          </Link>
        </div>
      </div>
    );
  }
};

export default HeaderLeft;
