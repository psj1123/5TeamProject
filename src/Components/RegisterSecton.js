/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import '../Styles/Register.css';

const RegisterSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    dateOfBirth: '',
  });

  //데이터 처리
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //여기에도 사용자가 양식을 제출할 때 등록 완료됨을 알림 수 있음
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 여기서 회원가입 정보를 데이터베이스에 저장
  };

  const handleButtonClick = () => {
    const { email, password, confirmPassword, name, nickname, dateOfBirth } =
      formData;

    // Check if all the required fields are filled
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !nickname ||
      !dateOfBirth
    ) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    alert('회원가입이 완료되었습니다.');

    const confirmation = confirm('로그인하시겠습니까?');
    if (confirmation) {
      window.location.assign('/login');
    }
  };

  return (
    <UserDataConsumer>
      {({ state }) => {
        // 로그인 여부를 판단, 로그인된 상태라면 프로젝트 리스트 페이지로 강제 이동
        if (state.isLoggedIn) {
          return <Navigate to="/myprojectslist" replace={true} />;
        } else {
          return (
            <>
              <section>
                <form className="register_form" onSubmit={handleFormSubmit}>
                  <br />
                  <h1>회원가입</h1>

                  <div className="inputContainer">
                    <div className="inputName">
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                  </div>
                  <br />

                  <div className="inputContainer">
                    <div className="inputName">
                      <label htmlFor="password">비밀번호</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        placeholder="비밀번호"
                      />
                    </div>
                  </div>
                  <br />

                  <div className="inputContainer">
                    <div className="inputName">
                      <label htmlFor="confirmPassword">비밀번호 확인</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                        placeholder="비밀번호 확인"
                      />
                    </div>
                  </div>
                  <br />

                  <div className="inputContainer">
                    <div className="inputName">
                      <label htmlFor="name">이름</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="이름"
                      />
                    </div>
                  </div>
                  <br />

                  <div className="inputContainer">
                    <div className="inputName">
                      <label htmlFor="nickname">닉네임</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="text"
                        name="nickname"
                        id="nickname"
                        value={formData.nickname}
                        onChange={handleFormChange}
                        placeholder="활동할 닉네임"
                      />
                    </div>
                  </div>
                  <br />

                  <div className="inputContainer">
                    <div className="inputName">
                      <label htmlFor="dateOfBirth">생년월일</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <br />

                  <div className="inputContainer">
                    <button type="submit" onClick={handleButtonClick}>
                      회원가입
                    </button>
                  </div>
                  <br />
                  <p>
                    위의 "회원가입" 버튼을 클릭하면 Jellabo의 이용약관 및
                    개인정보보호정책을 읽고
                    <br />
                    이해했으며 그에 동의하는 것으로 간주합니다.
                  </p>
                </form>
              </section>
            </>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default RegisterSection;
