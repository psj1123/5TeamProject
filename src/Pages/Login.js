import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';

const Login = () => {
  return (
    <UserDataConsumer>
      {({ state, actions }) => {
        // 로그인 이벤트
        const loginClick = () => {
          actions.setIsLoggedIn(true);
          actions.setEmail('example01@example.com');
          actions.setNickname('테스트');
        };

        // 로그인 여부를 판단, 로그인된 상태라면 프로젝트 리스트 페이지로 강제 이동
        if (state.isLoggedIn) {
          return <Navigate to="/myprojectslist" replace={true} />;
        } else {
          return (
            <><section>
              <div>
                <Header page={'Login'} />
              </div>
              {/*이곳에 로그인 폼 컴포넌트 작성해주세요!!
    테스트용*/}
              <button onClick={loginClick}>로그인</button>
            </section><Footer /></>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default Login;
