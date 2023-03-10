import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import Listpage from '../Components/Listpage/Listpage';

const MyProjectsList = () => {
  return (
    <UserDataConsumer>
      {({ state }) => {
        // 로그인 여부를 판단, 로그인되지 않은 상태라면 로그인 페이지로 강제 이동
        if (!state.isLoggedIn) {
          return <Navigate to="/login" replace={true} />;
        } else {
          // 정상적인 경우에 아래의 리턴문이 컴포넌트 결과로 출력됩니다.
          return (
            <div>
              <Header page={'MyProjectList'} />
              {/* 프로젝트 리스트 페이지 */}
              {<Listpage />}
              {/* 프로젝트 리스트 페이지 */}
              <button>
                <Link to="/project">프로젝트</Link>
              </button>
              <Footer />
            </div>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default MyProjectsList;
