import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLeft = ({ page }) => {
  // props로 입력받은 page가 Project일 때만 헤더 레프트에 [참여 프로젝트 리스트] 링크 표시
  if (page === 'Project') {
    return (
      <div className="headerLeft">
        <Link to="/myprojectslist">
          <div>
            <img src="/favicon.ico" alt="Jellabo favicon" />
            Jellabo
          </div>
        </Link>
      </div>
    );
  }
  // page가 NotFound일 때는 링크에 히스토리를 남기지 않는 기능 추가
  else if (page === 'NotFound') {
    return (
      <div className="headerLeft">
        <Link to="/" replace={true}>
          <div>
            <img src="/favicon.ico" alt="Jellabo favicon" />
            Jellabo
          </div>
        </Link>
      </div>
    );
  }
  // 그 외의 경우엔 일반적인 기능 수행
  else {
    return (
      <div className="headerLeft">
        <Link to="/">
          <div>
            <img src="/favicon.ico" alt="Jellabo favicon" />
            Jellabo
          </div>
        </Link>
      </div>
    );
  }
};

export default HeaderLeft;