import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../../Contexts/UserData';

const HeaderRight = ({ page }) => {
  return (
    <UserDataConsumer>
      {({ state, actions }) => {
        // 로그아웃 버튼 클릭 이벤트
        const logoutClick = () => {
          actions.setIsLoggedIn(false);
          actions.setEmail('');
          actions.setNickname('');
          return <Navigate to="/login" />;
        };

        if (state.isLoggedIn) {
          // 로그인 한 상태에서, Home 페이지인 경우
          if (page === 'Home') {
            return (
              <div className="headerRight">
                <ul>
                  <li>
                    <Link to="/myprojectslist">
                      <div>나의 프로젝트 리스트</div>
                    </Link>
                  </li>
                  <li>
                    <div onClick={logoutClick}>로그아웃</div>
                  </li>
                </ul>
              </div>
            );
          }
          // 로그인 한 상태에서, 오류 페이지인 경우
          else if (page === 'NotFound') {
            return (
              <div className="headerRight">
                <ul>
                  <li>
                    <Link to="/myprojectslist" replace={true}>
                      <div>나의 프로젝트 리스트</div>
                    </Link>
                  </li>
                  <li>
                    <div onClick={logoutClick}>로그아웃</div>
                  </li>
                </ul>
              </div>
            );
          }
          // 로그인 한 상태에서, Home, 오류 페이지 모두 아닌 경우
          else {
            return (
              <div className="headerRight">
                <ul>
                  <li>
                    {/*여유가 된다면 개인정보 수정 페이지로 링크 걸기*/}
                    <div>
                      <span>{state.nickname}</span>
                      <span>{'(' + state.email + ')'}</span>
                    </div>
                  </li>
                  <li>
                    <div onClick={logoutClick}>로그아웃</div>
                  </li>
                </ul>
              </div>
            );
          }
        }
        // 로그인 하지 않은 상태인 경우
        else {
          return (
            <div className="headerRight">
              <ul>
                <li>
                  <Link to="/login">
                    <div>로그인</div>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <div>회원가입</div>
                  </Link>
                </li>
              </ul>
            </div>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default HeaderRight;
