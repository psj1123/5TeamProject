import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import RegisterSection from '../Components/RegisterSecton';

const Register = () => {
  return (
    <UserDataConsumer>
      {({ state }) => {
        // 로그인 여부를 판단, 로그인된 상태라면 프로젝트 리스트 페이지로 강제 이동
        if (state.isLoggedIn) {
          const myprojectslist = '/myprojectslist/' + state.email;
          return <Navigate to={myprojectslist} replace={true} />;
        } else {
          return (
            <>
              <Header page={'Register'} />
              <session>
                <RegisterSection />
              </session>
              <Footer />
            </>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default Register;
