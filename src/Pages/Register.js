import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import ReturnTop from '../Components/ReturnTop';

const Register = () => {
  return (
    <UserDataConsumer>
      {({ state }) => {
        // 로그인 여부를 판단, 로그인된 상태라면 프로젝트 리스트 페이지로 강제 이동
        if (state.isLoggedIn) {
          return <Navigate to="/myprojectslist" replace={true} />;
        }

        // 로그인되지 않은 상태라면 아래 리턴문을 출력
        else {
          return (
            <div>
              <Header page={'Register'} />
              {/* 이곳에 회원가입 섹션 컴포넌트를 작성해주세요!! */}
              <ReturnTop />
              <Footer />
            </div>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default Register;
