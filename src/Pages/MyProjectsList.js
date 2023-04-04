import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MyProjectsListSection from '../Components/MyProjectsListSection';

const MyProjectsList = () => {
  const loginEmail = window.sessionStorage.getItem('email');

  // 로그인 여부를 판단, 로그인되지 않은 상태라면 로그인 페이지로 강제 이동
  if (loginEmail === null) {
    return <Navigate to="/login" replace={true} />;
  } else {
    // 정상적인 경우에 아래의 리턴문이 컴포넌트 결과로 출력됩니다.
    return (
      <div>
        <Header page={'MyProjectList'} />
        <MyProjectsListSection />
        <Footer />
      </div>
    );
  }
};

export default MyProjectsList;
