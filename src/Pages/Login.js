import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import './../Styles/Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserDataConsumer>
      {({ state, actions }) => {
        // 정상 수행 여부를 판별
        const loginClick = async () => {
          try {
            switch (true) {
              case !email:
                throw new Error('이메일을 입력해주세요.');
              case !password:
                throw new Error('비밀번호를 입력해주세요.');
              default:
                const response = await axios.post(
                  'http://localhost:8008/login/commit',
                  {
                    email: email,
                    password: password,
                  }
                );
                if (response.status === 200) {
                  actions.setEmail(email);
                  actions.setNickname(response.data.nickname);
                  actions.setIsLoggedIn(true);
                } else {
                  throw new Error('로그인에 실패했습니다.');
                }
                break;
            }
          } catch (e) {
            alert('예상치 못한 오류가 발생했습니다.' + e);
            return;
          }
        };

        if (state.isLoggedIn) {
          return (
            <Navigate to="/myprojectslist/${state.email}" replace={true} />
          );
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
