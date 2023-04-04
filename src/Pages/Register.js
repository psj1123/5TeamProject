import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RegisterSection from '../Components/RegisterSection';

const Register = () => {
  const loginEmail = window.sessionStorage.getItem('email');

  // 로그인 여부를 판단, 로그인된 상태라면 프로젝트 리스트 페이지로 강제 이동
  if (loginEmail !== null) {
    const myprojectslist = '/myprojectslist?email=' + loginEmail;
    return <Navigate to={myprojectslist} replace={true} />;
  } else {
    return (
      <>
        <Header page={'Register'} />
        <RegisterSection />
        <Footer />
      </>
    );
  }
};

export default Register;
