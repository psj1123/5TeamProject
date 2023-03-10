import React from 'react';
import { Link } from 'react-router-dom';

const HeaderCenter = ({ page }) => {
  // props로 입력받은 page가 Project일 때만 헤더 센터에 프로젝트 제목(생성자) 표기
  if (page === 'Project') {
    return (
      <div className="headerCenter">
        <Link to="/project/:projectcode">
          <span>프로젝트 제목</span>
          <span>(생성자)</span>
        </Link>
      </div>
    );
  } else {
    return;
  }
};

export default HeaderCenter;
