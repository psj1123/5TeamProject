import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import './../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };

  return (
    <UserDataConsumer>
      {({ state, actions }) => {
        // 로그인 이벤트
        const loginClick = () => {
          if (!email) {
            alert('이메일을 입력해주세요.');
            return;
          }
          if (!validateEmail(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
          }
          if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
          }
          if (!validatePassword(password)) {
            alert(
              '비밀번호는 8자 이상이며, 대/소문자와 숫자가 포함되어야 합니다.'
            );
            return;
          }

          actions.setIsLoggedIn(true);
          actions.setEmail(email);
          actions.setNickname('테스트');
        };

        if (state.isLoggedIn) {
          return <Navigate to="/myprojectslist" replace={true} />;
        } else {
          return (
            <>
              <Header page={'Login'} />
              <section>
                <div className="login-container">
                  <div className="login-image">
                    <img src="img/LoginImage.png" alt="login" />
                  </div>
                  <div className="login-form">
                    <h2>Jellabo</h2>
                    <br />
                    <div className="login-form-input">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            loginClick();
                          }
                        }}
                        placeholder=" 이메일"
                      />
                    </div>
                    <div className="login-form-input">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            loginClick();
                          }
                        }}
                        placeholder=" 비밀번호"
                      />
                    </div>
                    <div className="login-form-button">
                      <button onClick={loginClick}>로그인</button>
                    </div>
                    <div className="signup">
                      <p>계정이 아직 없으신가요?</p>
                    </div>
                    <div className="signup-link">
                      <div>
                        <Link to="/register" replace={true}>
                          <p>회원가입</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Footer />
            </>
          );
        }
      }}
    </UserDataConsumer>
  );
};

export default Login;
