import React, { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataConsumer } from '../Contexts/UserData';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import './../Styles/Login.css';
import axios from 'axios';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <UserDataConsumer>
      {({ state, actions }) => {
        // 정상 수행 여부를 판별
        const loginClick = async () => {
          try {
            switch (true) {
              case !emailRef.current.value:
                throw new Error('이메일을 입력해주세요.');
              case !passwordRef.current.value:
                throw new Error('비밀번호를 입력해주세요.');
              default:
                const res = await axios.post('/login/commit', {
                  email: emailRef.current.value,
                  password: passwordRef.current.value,
                });
                if (res.data === 0) {
                  emailRef.current.value = '';
                  passwordRef.current.value = '';
                  emailRef.current.focus();
                  throw new Error('이메일 혹은 비밀번호가 올바르지 않습니다.');
                } else {
                  actions.setEmail(res.data[0].email);
                  actions.setNickname(res.data[0].nickname);
                  actions.setIsLoggedIn(true);
                  alert('돌아오신 것을 환영합니다!');
                }
                break;
            }
          } catch (e) {
            alert(e);
            return;
          }
        };
        // 로그인한 상태라면 자신의 프로젝트 리스트 페이지로 이동
        if (state.isLoggedIn) {
          const myprojectslist = '/myprojectslist/';
          return <Navigate to={myprojectslist} replace={true} />;
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
                        type="email"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            passwordRef.current.focus();
                          }
                        }}
                        placeholder=" 이메일"
                        ref={emailRef}
                      />
                    </div>

                    <div className="login-form-input">
                      <input
                        type="password"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            loginClick();
                          }
                        }}
                        placeholder=" 비밀번호"
                        ref={passwordRef}
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
                        <Link to="/register">
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
